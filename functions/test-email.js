// ==============================================================================
// XORONIQ CAR CARE - BACKEND VERIFICATION & UNIT TEST SCRIPT
// Tests Templates, Signature Verification, Idempotency & Error Handling
// ==============================================================================

const crypto = require('crypto');
const { getCustomerEmailTemplate } = require('./templates/customerEmail');
const { getPartnerEmailTemplate } = require('./templates/partnerEmail');
const { verifyPaymentSignature, verifyWebhookSignature } = require('./razorpayService');

async function runTests() {
  console.log('=================================================================');
  console.log('🧪 RUNNING XORONIQ ORDER & EMAIL SYSTEM UNIT TESTS');
  console.log('=================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}`);
      failed++;
    }
  }

  // ----------------------------------------------------------------------------
  // Test 1: Customer Order Confirmation Template Rendering (₹1,199 X1 Kit)
  // ----------------------------------------------------------------------------
  const sampleOrder1 = {
    orderId: 'XRQ-2026-00001',
    customer: {
      name: 'Munnashaheem',
      email: 'customer@example.com',
      phone: '9188510017'
    },
    shippingAddress: {
      address: 'Near NH 66, Bypass Road',
      city: 'Malappuram',
      state: 'Kerala',
      pincode: '676306',
      country: 'India'
    },
    items: [
      {
        id: 'xoroniq-essential-kit-v1',
        name: 'XORONIQ X1 Essential Detailing Kit',
        sku: 'XOR-KIT-ESS-01',
        price: 1199,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200'
      }
    ],
    subtotal: 1199,
    shipping: 60,
    discount: 0,
    total: 1259,
    razorpayOrderId: 'order_test_92384',
    razorpayPaymentId: 'pay_test_71829',
    createdAt: new Date()
  };

  const custTemplate = getCustomerEmailTemplate(sampleOrder1);
  assert(custTemplate.subject.includes('XRQ-2026-00001'), 'Customer email subject includes Order ID');
  assert(custTemplate.html.includes('Munnashaheem'), 'Customer email HTML includes customer name');
  assert(custTemplate.html.includes('XORONIQ X1 Essential Detailing Kit'), 'Customer email HTML includes product name');
  assert(custTemplate.html.includes('₹1,259'), 'Customer email HTML includes grand total');
  assert(custTemplate.text.includes('pay_test_71829'), 'Customer email text fallback includes payment ID');
  assert(custTemplate.html.includes('Delhivery Express'), 'Customer email specifies Delhivery Express courier');

  // ----------------------------------------------------------------------------
  // Test 2: Multi-Item & Discount Order Template Rendering (₹249 items + Free Shipping)
  // ----------------------------------------------------------------------------
  const sampleOrder2 = {
    orderId: 'XRQ-2026-00002',
    customer: {
      name: 'Adil Rahman',
      email: 'adil@example.com',
      phone: '9633962953'
    },
    shippingAddress: {
      address: 'Marine Drive Bay Area',
      city: 'Kochi',
      state: 'Kerala',
      pincode: '682011',
      country: 'India'
    },
    items: [
      { id: 'xor-shampoo', name: 'Ceramic Foam Car Wash (500ml)', sku: 'XOR-SHMP-500', price: 249, quantity: 2 },
      { id: 'xor-wheel', name: 'Iron Fallout Wheel Cleaner', sku: 'XOR-WHL-500', price: 899, quantity: 1 },
      { id: 'xor-microfiber', name: '1200 GSM Edgeless Drying Towel', sku: 'XOR-TWL-1200', price: 1199, quantity: 1 }
    ],
    subtotal: 2596,
    shipping: 0,
    discount: 100,
    total: 2496,
    razorpayOrderId: 'order_test_8888',
    razorpayPaymentId: 'pay_test_9999',
    createdAt: new Date()
  };

  const partnerTemplate = getPartnerEmailTemplate(sampleOrder2, 'https://xoroniq.store');
  assert(partnerTemplate.subject.includes('XRQ-2026-00002'), 'Partner email subject includes Order ID');
  assert(partnerTemplate.subject.includes('2,496'), 'Partner email subject includes total amount');
  assert(partnerTemplate.html.includes('Adil Rahman'), 'Partner email HTML includes customer name');
  assert(partnerTemplate.html.includes('Ceramic Foam Car Wash'), 'Partner email HTML includes item names');
  assert(partnerTemplate.html.includes('Kochi'), 'Partner email HTML includes shipping city');
  assert(partnerTemplate.html.includes('admin/orders.html?search=XRQ-2026-00002'), 'Partner email links directly to admin orders page');

  // ----------------------------------------------------------------------------
  // Test 3: HTML Injection Protection / XSS Sanitization
  // ----------------------------------------------------------------------------
  const xssOrder = {
    orderId: 'XRQ-2026-00003',
    customer: {
      name: '<script>alert("hacked")</script>John Doe',
      email: 'john@example.com',
      phone: '9999999999'
    },
    shippingAddress: {
      address: '<img src=x onerror=alert(1)>221B Baker St',
      city: 'London',
      state: 'KA',
      pincode: '560001'
    },
    items: [{ name: '<b>Premium Wax</b>', price: 499, quantity: 1 }],
    total: 499
  };

  const sanitizedCust = getCustomerEmailTemplate(xssOrder);
  assert(!sanitizedCust.html.includes('<script>'), 'Customer email sanitizes script tags');
  assert(sanitizedCust.html.includes('&lt;script&gt;'), 'Customer email escapes script tags to safe HTML entities');
  assert(!sanitizedCust.html.includes('<img src=x onerror='), 'Customer email sanitizes image tag injections');

  // ----------------------------------------------------------------------------
  // Test 4: Razorpay Payment Signature Verification Logic
  // ----------------------------------------------------------------------------
  const testSecret = 'secret_test_xyz12345';
  process.env.RAZORPAY_KEY_SECRET = testSecret;

  const validOrderId = 'order_DA284729482';
  const validPaymentId = 'pay_92384729184';
  const validSignature = crypto
    .createHmac('sha256', testSecret)
    .update(`${validOrderId}|${validPaymentId}`)
    .digest('hex');

  const verificationSuccess = verifyPaymentSignature({
    razorpayOrderId: validOrderId,
    razorpayPaymentId: validPaymentId,
    razorpaySignature: validSignature
  });
  assert(verificationSuccess === true, 'Valid Razorpay payment signature correctly passes verification');

  const verificationTampered = verifyPaymentSignature({
    razorpayOrderId: validOrderId,
    razorpayPaymentId: 'pay_tampered_id',
    razorpaySignature: validSignature
  });
  assert(verificationTampered === false, 'Tampered Razorpay payment signature correctly fails verification');

  // ----------------------------------------------------------------------------
  // Test 5: Razorpay Webhook Signature Verification Logic
  // ----------------------------------------------------------------------------
  const testWebhookSecret = 'webhook_secret_abc987';
  process.env.RAZORPAY_WEBHOOK_SECRET = testWebhookSecret;

  const sampleWebhookBody = JSON.stringify({
    event: 'payment.captured',
    payload: { payment: { entity: { id: 'pay_123', order_id: 'order_123', amount: 119900 } } }
  });

  const validWebhookSig = crypto
    .createHmac('sha256', testWebhookSecret)
    .update(sampleWebhookBody)
    .digest('hex');

  const webhookVerifyPass = verifyWebhookSignature({
    rawBody: sampleWebhookBody,
    signature: validWebhookSig
  });
  assert(webhookVerifyPass === true, 'Valid Razorpay webhook signature correctly passes verification');

  const webhookVerifyFail = verifyWebhookSignature({
    rawBody: sampleWebhookBody,
    signature: 'bad_signature_1234567890abcdef'
  });
  assert(webhookVerifyFail === false, 'Invalid Razorpay webhook signature correctly fails verification');

  console.log('\n=================================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('=================================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
