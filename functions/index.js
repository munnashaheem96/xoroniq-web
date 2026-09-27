// ==============================================================================
// XORONIQ CAR CARE - CLOUD FUNCTIONS & SERVERLESS BACKEND
// Razorpay Order Creation, Webhook Signature Verification & Automated Email Dispatch
// ==============================================================================

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

const { createRazorpayOrder, verifyPaymentSignature, verifyWebhookSignature } = require('./razorpayService');
const { createPendingOrder, processSuccessfulOrderPayment, resendOrderEmails, getNextOrderId, calculateServerShipping } = require('./orderService');

// ------------------------------------------------------------------------------
// EXPRESS APP CONFIGURATION
// ------------------------------------------------------------------------------
const app = express();

// Enable CORS for xoroniq.store, localhost, and GitHub Pages
app.use(cors({
  origin: [
    'https://xoroniq.store',
    'http://localhost:5173',
    'http://localhost:4173',
    'http://localhost:3000',
    'http://localhost:5001'
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature', 'x-admin-secret'],
  credentials: true
}));

// Capture raw body for Razorpay Webhook signature verification
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// ------------------------------------------------------------------------------
// 1. HEALTH CHECK ENDPOINT
// ------------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    brand: 'XORONIQ Car Care',
    serverTime: new Date().toISOString(),
    razorpayConfigured: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
    webhookConfigured: Boolean(process.env.RAZORPAY_WEBHOOK_SECRET),
    emailConfigured: Boolean(process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD),
    partnerEmailsCount: [process.env.PARTNER_EMAIL_1, process.env.PARTNER_EMAIL_2, process.env.PARTNER_EMAIL_3].filter(Boolean).length
  });
});

// ------------------------------------------------------------------------------
// 2. CREATE RAZORPAY ORDER & PENDING FIRESTORE RECORD
// Endpoint: POST /api/create-order
// ------------------------------------------------------------------------------
app.post('/api/create-order', async (req, res) => {
  try {
    const { customer, shippingAddress, items, discount, attribution } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Order items are required.' });
    }
    if (!customer?.name || !customer?.email || !customer?.phone) {
      return res.status(400).json({ error: 'Customer name, email, and phone are required.' });
    }
    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.pincode) {
      return res.status(400).json({ error: 'Complete shipping address is required.' });
    }

    // 1. Generate unique server-side XORONIQ Order ID (XRQ-YYYY-XXXXX)
    const orderId = await getNextOrderId(db);

    // 2. Pre-calculate total for Razorpay order (itemized separate delivery cash)
    let subtotal = 0;
    items.forEach(i => {
      subtotal += (Number(i.price) || 0) * (Number(i.quantity) || 1);
    });
    const shipping = calculateServerShipping(subtotal, shippingAddress, items);
    const total = Math.max(0, subtotal + shipping - (Number(discount) || 0));

    // 3. Create Order in Razorpay
    let razorpayOrder;
    try {
      razorpayOrder = await createRazorpayOrder({
        amount: total,
        receipt: orderId,
        notes: {
          orderId,
          customerName: customer.name,
          customerPhone: customer.phone,
          customerEmail: customer.email
        }
      });
    } catch (rzpErr) {
      console.error('[Razorpay Order Creation Error]:', rzpErr);
      return res.status(500).json({ error: 'Failed to initialize secure checkout with Razorpay.', details: rzpErr.message });
    }

    // 4. Save pending order in Firestore
    const pendingOrder = await createPendingOrder(db, {
      orderId,
      customer,
      shippingAddress,
      items,
      discount,
      attribution,
      razorpayOrder
    });

    console.log(`[Order Created] Order #${orderId} created successfully. Razorpay Order: ${razorpayOrder.id}`);

    return res.status(200).json({
      success: true,
      orderId: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount, // in paise
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_Tgwv2bPRil40BG'
    });
  } catch (err) {
    console.error('[Create Order Route Error]:', err);
    return res.status(500).json({ error: err.message || 'Server error creating order.' });
  }
});

// ------------------------------------------------------------------------------
// 3. VERIFY RAZORPAY PAYMENT (CLIENT CALLBACK VERIFICATION)
// Endpoint: POST /api/verify-payment
// ------------------------------------------------------------------------------
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing payment signature verification parameters.' });
    }

    // 1. Cryptographically verify signature
    const isValid = verifyPaymentSignature({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature
    });

    if (!isValid) {
      console.warn(`[Security Alert] Invalid payment signature for orderId: ${orderId}, paymentId: ${razorpay_payment_id}`);
      return res.status(400).json({ error: 'Invalid payment signature. Verification failed.' });
    }

    console.log(`[Payment Verified] Signature verified successfully for Order #${orderId || razorpay_order_id}`);

    // 2. Atomically confirm order as PAID and trigger emails (Idempotent)
    const result = await processSuccessfulOrderPayment({
      db,
      orderId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      source: 'client_verification'
    });

    return res.status(200).json({
      success: true,
      orderId: result.order?.orderId || orderId,
      paymentStatus: 'PAID',
      emailStatus: result.order?.emailStatus || 'SENT'
    });
  } catch (err) {
    console.error('[Verify Payment Route Error]:', err);
    return res.status(500).json({ error: err.message || 'Error verifying payment.' });
  }
});

// ------------------------------------------------------------------------------
// 4. RAZORPAY WEBHOOK ENDPOINT
// Endpoint: POST /api/webhook
// ------------------------------------------------------------------------------
app.post('/api/webhook', async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const rawBody = req.rawBody;

    if (!signature) {
      console.warn('[Webhook Warning] Missing x-razorpay-signature header.');
      return res.status(400).send('Missing signature');
    }

    // Verify webhook signature
    const isWebhookValid = verifyWebhookSignature({ rawBody, signature });
    if (!isWebhookValid) {
      console.warn('[Security Alert] Invalid webhook signature detected.');
      return res.status(400).send('Invalid webhook signature');
    }

    const event = req.body;
    console.log(`[Webhook Received] Event: ${event.event} | Account: ${event.account_id}`);

    // Handle payment.captured or order.paid
    if (event.event === 'payment.captured' || event.event === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity || {};
      const orderEntity = event.payload?.order?.entity || {};

      const razorpayOrderId = paymentEntity.order_id || orderEntity.id;
      const razorpayPaymentId = paymentEntity.id;
      const notesOrderId = paymentEntity.notes?.orderId || orderEntity.notes?.orderId;

      if (!razorpayOrderId && !notesOrderId) {
        console.warn('[Webhook Warning] Webhook payload missing order references.');
        return res.status(200).json({ status: 'ignored_no_order_ref' });
      }

      await processSuccessfulOrderPayment({
        db,
        orderId: notesOrderId,
        razorpayOrderId,
        razorpayPaymentId,
        source: `webhook_${event.event}`
      });

      return res.status(200).json({ status: 'processed' });
    }

    // For other webhook events (e.g. payment.failed), return 200 OK
    return res.status(200).json({ status: 'ignored_event' });
  } catch (err) {
    console.error('[Webhook Processing Error]:', err);
    // Return 200 to prevent Razorpay excessive retry storms on internal logic notes
    return res.status(200).json({ status: 'error_logged', error: err.message });
  }
});

// ------------------------------------------------------------------------------
// 5. ADMIN MANUAL RESEND EMAIL ENDPOINT
// Endpoint: POST /api/resend-emails
// ------------------------------------------------------------------------------
app.post('/api/resend-emails', async (req, res) => {
  try {
    const adminSecret = req.headers['x-admin-secret'];
    const expectedSecret = process.env.ADMIN_API_SECRET;

    // Optional admin authorization check if ADMIN_API_SECRET is configured
    if (expectedSecret && adminSecret !== expectedSecret) {
      return res.status(401).json({ error: 'Unauthorized: Invalid admin secret key.' });
    }

    const { orderId, target = 'both' } = req.body;
    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required.' });
    }

    const result = await resendOrderEmails(db, { orderId, target });
    return res.status(200).json(result);
  } catch (err) {
    console.error('[Admin Resend Route Error]:', err);
    return res.status(500).json({ error: err.message || 'Failed to resend order email.' });
  }
});

// ------------------------------------------------------------------------------
// 6. SECURE PUBLIC ORDER TRACKING ENDPOINT
// Endpoint: GET /api/track-order
// ------------------------------------------------------------------------------
app.get('/api/track-order', async (req, res) => {
  try {
    const term = (req.query.orderId || req.query.term || '').trim();
    const phone = (req.query.phone || '').replace(/\D/g, '');

    if (!term && !phone) {
      return res.status(400).json({ error: 'Order ID or phone number is required.' });
    }

    let orderDoc = null;

    if (term) {
      const q = await db.collection('orders').where('orderId', '==', term).limit(1).get();
      if (!q.empty) {
        orderDoc = q.docs[0];
      }
    }

    if (!orderDoc && phone && phone.length >= 10) {
      try {
        const q = await db.collection('orders').where('customer.phone', '==', phone).limit(1).get();
        if (!q.empty) {
          orderDoc = q.docs[0];
        }
      } catch (phoneErr) {
        console.warn('Phone search note:', phoneErr);
      }
    }

    if (!orderDoc) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const data = orderDoc.data();

    // Sanitize order details for public tracking: shield PII and payment secrets
    const sanitizedOrder = {
      orderId: data.orderId,
      orderStatus: data.orderStatus || 'Payment Confirmed',
      trackingId: data.trackingId || null,
      courier: data.courier || 'Delhivery',
      trackingUrl: data.trackingUrl || (data.trackingId ? `https://www.delhivery.com/track/package/${data.trackingId}` : null),
      createdAt: data.createdAt,
      items: (data.items || []).map(i => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
        image: i.image
      })),
      total: data.total,
      shippingAddress: {
        city: data.shippingAddress?.city || '',
        state: data.shippingAddress?.state || '',
        pincode: data.shippingAddress?.pincode ? String(data.shippingAddress.pincode).slice(0, 3) + '***' : ''
      },
      customer: {
        name: data.customer?.name || 'Customer'
      }
    };

    return res.status(200).json({ success: true, order: sanitizedOrder });
  } catch (err) {
    console.error('[Track Order Route Error]:', err);
    return res.status(500).json({ error: 'Server error retrieving order status.' });
  }
});

// ------------------------------------------------------------------------------
// EXPORTS FOR CLOUD FUNCTIONS
// ------------------------------------------------------------------------------
// 1. Unified Express API Cloud Function
exports.api = functions.https.onRequest(app);

// 2. Direct Webhook Cloud Function alias
exports.razorpayWebhook = functions.https.onRequest(app);

// 3. Export express app for local dev-server runner
module.exports = { app, db };
