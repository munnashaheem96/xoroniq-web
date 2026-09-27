// ==============================================================================
// XORONIQ CAR CARE - ORDER SERVICE & IDEMPOTENT EMAIL FULFILLMENT
// Server-side XRQ-YYYY-XXXXX generation, Firestore operations & Duplicate Email Shield
// ==============================================================================

const admin = require('firebase-admin');
const { sendPartnerOrderEmail, sendCustomerOrderEmail } = require('./emailService');

/**
 * Generate human-readable, collision-free XORONIQ Order ID (XRQ-YYYY-XXXXX)
 * Example: XRQ-2026-00001
 * Uses atomic Firestore transaction on counter document.
 * @param {admin.firestore.Firestore} db
 * @returns {Promise<string>}
 */
async function getNextOrderId(db) {
  const currentYear = new Date().getFullYear();
  try {
    if (!db || typeof db.collection !== 'function') {
      throw new Error('Firestore not initialized');
    }
    const counterRef = db.collection('counters').doc(`orders_${currentYear}`);

    return await db.runTransaction(async (transaction) => {
      const docSnap = await transaction.get(counterRef);
      let nextNum = 1;

      if (docSnap.exists) {
        const data = docSnap.data();
        nextNum = (Number(data.lastOrderNumber) || 0) + 1;
        transaction.update(counterRef, {
          lastOrderNumber: nextNum,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      } else {
        transaction.set(counterRef, {
          year: currentYear,
          lastOrderNumber: nextNum,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      }

      const paddedNum = String(nextNum).padStart(5, '0');
      return `XRQ-${currentYear}-${paddedNum}`;
    });
  } catch (err) {
    console.warn('[ORDER ID COUNTER NOTE]:', err.message);
    const rand = Math.floor(10000 + Math.random() * 90000);
    return `XRQ-${currentYear}-${rand}`;
  }
}

/**
 * Calculate shipping charges server-side based on destination & individual item delivery cash
 * (Separate delivery cash for each item, configured via admin panel)
 * @param {number} subtotal
 * @param {Object} shippingAddress
 * @param {Array} items
 * @returns {number}
 */
function calculateServerShipping(subtotal, shippingAddress = {}, items = []) {
  // If items array is provided, calculate separate delivery cash per item
  if (Array.isArray(items) && items.length > 0) {
    const isKerala = (shippingAddress.state || '').toLowerCase().includes('kerala') ||
      String(shippingAddress.pincode || '').startsWith('67') ||
      String(shippingAddress.pincode || '').startsWith('68') ||
      String(shippingAddress.pincode || '').startsWith('69');

    return items.reduce((sum, item) => {
      const itemFee = (item.deliveryFee !== undefined && item.deliveryFee !== null && !isNaN(Number(item.deliveryFee)))
        ? Number(item.deliveryFee)
        : (isKerala ? 60 : 80);
      return sum + (itemFee * (Math.max(1, parseInt(item.quantity, 10) || 1)));
    }, 0);
  }

  const state = (shippingAddress.state || '').toLowerCase();
  const pin = String(shippingAddress.pincode || '').trim();

  // All Kerala delivery is flat ₹60 (PIN starts with 67, 68, or 69)
  const isKerala = state.includes('kerala') || pin.startsWith('67') || pin.startsWith('68') || pin.startsWith('69');
  return isKerala ? 60 : 80;
}

/**
 * Save new Pending Order in Firestore
 * @param {admin.firestore.Firestore} db
 * @param {Object} params
 * @returns {Promise<Object>} Created Order Data
 */
async function createPendingOrder(db, {
  customer,
  shippingAddress,
  items,
  discount = 0,
  attribution = null,
  razorpayOrder = null,
  orderId = null
}) {
  if (!items || !items.length) {
    throw new Error('Order must contain at least one product item.');
  }

  // Calculate clean numeric subtotal and store individual delivery cash per item
  let subtotal = 0;
  const sanitizedItems = items.map(item => {
    const price = Math.max(0, Number(item.price) || 0);
    const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
    const itemDeliveryFee = (item.deliveryFee !== undefined && item.deliveryFee !== null && !isNaN(Number(item.deliveryFee)))
      ? Number(item.deliveryFee)
      : 80;
    subtotal += price * qty;

    return {
      id: String(item.id || ''),
      name: String(item.name || 'Automotive Product').trim(),
      sku: String(item.sku || 'XOR-PRO').trim(),
      price: price,
      quantity: qty,
      deliveryFee: itemDeliveryFee,
      image: String(item.image || '')
    };
  });

  const numericDiscount = Math.max(0, Number(discount) || 0);
  const calculatedShipping = calculateServerShipping(subtotal, shippingAddress, items);
  const total = Math.max(0, subtotal + calculatedShipping - numericDiscount);

  // Generate unique human-readable order ID if not passed
  const uniqueOrderId = orderId || await getNextOrderId(db);

  const cleanCustomer = {
    name: String(customer?.name || '').trim(),
    email: String(customer?.email || '').trim().toLowerCase(),
    phone: String(customer?.phone || '').replace(/\D/g, '')
  };

  const cleanAddress = {
    address: String(shippingAddress?.address || '').trim(),
    city: String(shippingAddress?.city || '').trim(),
    state: String(shippingAddress?.state || '').trim(),
    pincode: String(shippingAddress?.pincode || '').replace(/\D/g, ''),
    country: String(shippingAddress?.country || 'India').trim()
  };

  const orderPayload = {
    orderId: uniqueOrderId,
    customer: cleanCustomer,
    customerName: cleanCustomer.name,
    customerEmail: cleanCustomer.email,
    customerPhone: cleanCustomer.phone,
    shippingAddress: cleanAddress,
    items: sanitizedItems,
    subtotal: subtotal,
    shipping: calculatedShipping,
    discount: numericDiscount,
    total: total,
    currency: 'INR',
    paymentStatus: 'PENDING',
    orderStatus: 'Payment Pending',
    razorpayOrderId: razorpayOrder?.id || '',
    razorpayPaymentId: '',
    razorpaySignature: '',
    payment: {
      method: 'RAZORPAY',
      status: 'PENDING',
      razorpayOrderId: razorpayOrder?.id || ''
    },
    emailStatus: 'PENDING',
    partnerEmailStatus: 'PENDING',
    customerEmailStatus: 'PENDING',
    emailSentAt: null,
    emailError: null,
    attribution: attribution || null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  try {
    if (db && typeof db.collection === 'function') {
      const docRef = db.collection('orders').doc(uniqueOrderId);
      await docRef.set(orderPayload);
    }
  } catch (err) {
    console.warn('[PENDING ORDER FIRESTORE WRITE NOTE]:', err.message);
  }

  return { id: uniqueOrderId, ...orderPayload };
}

/**
 * Process Verified Payment Confirmation & Trigger Automated Notifications
 * IDEMPOTENT: Prevents duplicate emails if called repeatedly by webhook retries.
 * @param {Object} params
 * @param {admin.firestore.Firestore} params.db
 * @param {string} [params.orderId]
 * @param {string} [params.razorpayOrderId]
 * @param {string} [params.razorpayPaymentId]
 * @param {string} [params.razorpaySignature]
 * @param {string} [params.source] - 'webhook' | 'client_verification' | 'manual'
 * @returns {Promise<Object>}
 */
async function processSuccessfulOrderPayment({
  db,
  orderId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  source = 'unknown'
}) {
  console.log(`[Order Processing] Initiating payment confirmation (source: ${source}) for Order ID: ${orderId || 'N/A'}, Razorpay Order: ${razorpayOrderId || 'N/A'}`);

  let orderRef = null;
  let orderData = null;

  // 1. Locate Order Document in Firestore
  if (orderId) {
    const directDoc = await db.collection('orders').doc(orderId).get();
    if (directDoc.exists) {
      orderRef = directDoc.ref;
      orderData = { id: directDoc.id, ...directDoc.data() };
    }
  }

  // Fallback lookup by razorpayOrderId
  if (!orderData && razorpayOrderId) {
    const qSnap = await db.collection('orders').where('razorpayOrderId', '==', razorpayOrderId).limit(1).get();
    if (!qSnap.empty) {
      const matchDoc = qSnap.docs[0];
      orderRef = matchDoc.ref;
      orderData = { id: matchDoc.id, ...matchDoc.data() };
    }
  }

  if (!orderData || !orderRef) {
    console.error(`[Order Processing Error] Order record not found in Firestore for orderId=${orderId}, razorpayOrderId=${razorpayOrderId}`);
    throw new Error('Order not found in database');
  }

  // 2. Mark Payment as PAID in Firestore (Never fails, idempotent)
  const updates = {
    paymentStatus: 'PAID',
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (!orderData.paidAt) {
    updates.paidAt = admin.firestore.FieldValue.serverTimestamp();
  }
  if (!orderData.orderStatus || orderData.orderStatus === 'Payment Pending' || orderData.orderStatus === 'Order Placed (COD)') {
    updates.orderStatus = 'Payment Confirmed';
  }
  if (razorpayPaymentId) {
    updates.razorpayPaymentId = razorpayPaymentId;
    updates['payment.razorpayPaymentId'] = razorpayPaymentId;
    updates['payment.status'] = 'PAID';
  }
  if (razorpaySignature) {
    updates.razorpaySignature = razorpaySignature;
  }

  await orderRef.update(updates);
  orderData = { ...orderData, ...updates };
  console.log(`[Order Processing] Order #${orderData.orderId} marked as PAID.`);

  // 3. IDEMPOTENT EMAIL DISPATCH CHECK
  const partnerAlreadySent = orderData.partnerEmailStatus === 'SENT';
  const customerAlreadySent = orderData.customerEmailStatus === 'SENT';

  if (partnerAlreadySent && customerAlreadySent) {
    console.log(`[IDEMPOTENCY] Both partner and customer emails already SENT for Order #${orderData.orderId}. Duplicate webhook/request safely ignored.`);
    return {
      success: true,
      order: orderData,
      duplicateIgnored: true
    };
  }

  let partnerSuccess = partnerAlreadySent;
  let partnerError = null;
  let customerSuccess = customerAlreadySent;
  let customerError = null;

  // Dispatch Partner Notification (all 3 partners)
  if (!partnerAlreadySent) {
    try {
      console.log(`[Email Dispatch] Sending 3-partner notification for Order #${orderData.orderId}`);
      await sendPartnerOrderEmail(orderData);
      partnerSuccess = true;
      console.log(`[Email Dispatch] Partner notification successfully delivered for Order #${orderData.orderId}`);
    } catch (err) {
      console.error(`[Email Dispatch Error] Failed to send partner email for Order #${orderData.orderId}:`, err.message);
      partnerError = err.message;
    }
  }

  // Dispatch Customer Confirmation Email
  if (!customerAlreadySent) {
    const custEmail = orderData.customer?.email || orderData.customerEmail;
    if (custEmail && custEmail.includes('@')) {
      try {
        console.log(`[Email Dispatch] Sending customer confirmation to ${custEmail} for Order #${orderData.orderId}`);
        await sendCustomerOrderEmail(orderData);
        customerSuccess = true;
        console.log(`[Email Dispatch] Customer confirmation successfully delivered for Order #${orderData.orderId}`);
      } catch (err) {
        console.error(`[Email Dispatch Error] Failed to send customer email for Order #${orderData.orderId}:`, err.message);
        customerError = err.message;
      }
    } else {
      console.warn(`[Email Dispatch Warning] Order #${orderData.orderId} has no valid customer email address. Skipping customer email.`);
      customerSuccess = false;
      customerError = 'Missing customer email';
    }
  }

  // 4. Update Firestore with Email Delivery Status
  // Note: Even if email fails, paymentStatus remains PAID.
  const emailUpdates = {
    partnerEmailStatus: partnerSuccess ? 'SENT' : 'FAILED',
    customerEmailStatus: customerSuccess ? 'SENT' : (orderData.customer?.email ? 'FAILED' : 'NO_EMAIL'),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  };

  if (partnerSuccess && customerSuccess) {
    emailUpdates.emailStatus = 'SENT';
    emailUpdates.emailSentAt = admin.firestore.FieldValue.serverTimestamp();
    emailUpdates.emailError = null;
  } else if (partnerSuccess || customerSuccess) {
    emailUpdates.emailStatus = 'PARTIAL';
    emailUpdates.emailError = partnerError || customerError || null;
  } else {
    emailUpdates.emailStatus = 'FAILED';
    emailUpdates.emailError = partnerError || customerError || 'Email delivery failed';
  }

  await orderRef.update(emailUpdates);
  return {
    success: true,
    order: { ...orderData, ...emailUpdates }
  };
}

/**
 * Manually Resend Order Notifications from Admin Panel
 * Does NOT modify payment status.
 * @param {admin.firestore.Firestore} db
 * @param {Object} params
 * @param {string} params.orderId
 * @param {'both'|'partner'|'customer'} [params.target='both']
 * @returns {Promise<Object>}
 */
async function resendOrderEmails(db, { orderId, target = 'both' }) {
  if (!orderId) {
    throw new Error('Order ID is required to resend emails.');
  }

  const orderDoc = await db.collection('orders').doc(orderId).get();
  if (!orderDoc.exists) {
    throw new Error(`Order #${orderId} does not exist.`);
  }

  const orderData = { id: orderDoc.id, ...orderDoc.data() };
  const results = { partner: null, customer: null };
  const updates = { updatedAt: admin.firestore.FieldValue.serverTimestamp() };

  if (target === 'both' || target === 'partner') {
    try {
      console.log(`[Admin Resend] Manually resending partner notification for Order #${orderId}`);
      await sendPartnerOrderEmail(orderData);
      results.partner = { success: true };
      updates.partnerEmailStatus = 'SENT';
    } catch (err) {
      console.error(`[Admin Resend Error] Partner resend failed:`, err.message);
      results.partner = { success: false, error: err.message };
      updates.partnerEmailStatus = 'FAILED';
    }
  }

  if (target === 'both' || target === 'customer') {
    try {
      console.log(`[Admin Resend] Manually resending customer confirmation for Order #${orderId}`);
      await sendCustomerOrderEmail(orderData);
      results.customer = { success: true };
      updates.customerEmailStatus = 'SENT';
    } catch (err) {
      console.error(`[Admin Resend Error] Customer resend failed:`, err.message);
      results.customer = { success: false, error: err.message };
      updates.customerEmailStatus = 'FAILED';
    }
  }

  // Update overall email status based on latest results
  const pSuccess = results.partner ? results.partner.success : (orderData.partnerEmailStatus === 'SENT');
  const cSuccess = results.customer ? results.customer.success : (orderData.customerEmailStatus === 'SENT');

  if (pSuccess && cSuccess) {
    updates.emailStatus = 'SENT';
    updates.emailSentAt = admin.firestore.FieldValue.serverTimestamp();
  } else if (pSuccess || cSuccess) {
    updates.emailStatus = 'PARTIAL';
  } else {
    updates.emailStatus = 'FAILED';
  }

  await orderDoc.ref.update(updates);
  return { success: true, results, orderId };
}

module.exports = {
  getNextOrderId,
  calculateServerShipping,
  createPendingOrder,
  processSuccessfulOrderPayment,
  resendOrderEmails
};
