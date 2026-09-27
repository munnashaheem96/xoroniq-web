// ==============================================================================
// XORONIQ CAR CARE - RAZORPAY SERVER SERVICE & SIGNATURE VERIFICATION
// ==============================================================================

const crypto = require('crypto');
const Razorpay = require('razorpay');

let razorpayInstance = null;

function getRazorpayInstance() {
  if (razorpayInstance) return razorpayInstance;

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    console.warn('[RAZORPAY WARNING] RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not configured.');
  }

  razorpayInstance = new Razorpay({
    key_id: key_id || 'dummy_key_id',
    key_secret: key_secret || 'dummy_key_secret'
  });

  return razorpayInstance;
}

/**
 * Create a new Order in Razorpay
 * @param {Object} params
 * @param {number} params.amount - In rupees (will convert to paise)
 * @param {string} params.receipt - Human-readable XORONIQ order ID
 * @param {Object} [params.notes]
 * @returns {Promise<Object>} Razorpay Order Object
 */
async function createRazorpayOrder({ amount, receipt, notes = {} }) {
  const rzp = getRazorpayInstance();
  const amountInPaise = Math.round(Number(amount) * 100);

  if (isNaN(amountInPaise) || amountInPaise <= 0) {
    throw new Error(`Invalid order amount: ${amount}`);
  }

  const options = {
    amount: amountInPaise,
    currency: 'INR',
    receipt: receipt || `XRQ_${Date.now()}`,
    notes: {
      brand: 'XORONIQ Car Care',
      ...notes
    }
  };

  const order = await rzp.orders.create(options);
  return order;
}

/**
 * Verify Razorpay payment signature from client checkout callback
 * Formula: HMAC_SHA256(razorpay_order_id + "|" + razorpay_payment_id, secret)
 * @param {Object} params
 * @returns {boolean}
 */
function verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error('[Security Error] RAZORPAY_KEY_SECRET missing during signature verification.');
    return false;
  }
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return false;
  }

  const data = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac('sha256', keySecret)
    .update(data)
    .digest('hex');

  const expectedBuf = Buffer.from(expectedSignature, 'utf-8');
  const actualBuf = Buffer.from(razorpaySignature, 'utf-8');

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

/**
 * Verify Razorpay Webhook signature against raw request body
 * @param {Object} params
 * @param {string|Buffer} params.rawBody
 * @param {string} params.signature - From header "x-razorpay-signature"
 * @returns {boolean}
 */
function verifyWebhookSignature({ rawBody, signature }) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[Security Error] RAZORPAY_WEBHOOK_SECRET missing during webhook verification.');
    return false;
  }
  if (!rawBody || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(rawBody)
    .digest('hex');

  const expectedBuf = Buffer.from(expectedSignature, 'utf-8');
  const actualBuf = Buffer.from(signature, 'utf-8');

  if (expectedBuf.length !== actualBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuf, actualBuf);
}

module.exports = {
  getRazorpayInstance,
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature
};
