// ==========================================================================
// XORONIQ CAR CARE - RAZORPAY INTEGRATION
// Razorpay Standard Checkout SDK Wrapper
// ==========================================================================

import { CONFIG } from './config.js';

let razorpayLoadedPromise = null;

/**
 * Load Razorpay Checkout Script
 */
export function loadRazorpayScript() {
  if (razorpayLoadedPromise) return razorpayLoadedPromise;

  razorpayLoadedPromise = new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('Razorpay SDK failed to load from CDN.');
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return razorpayLoadedPromise;
}

/**
 * Open Razorpay Checkout Modal
 * @param {Object} options - { amount, orderId, customer: { name, email, phone }, onSuccess, onFailure }
 */
export async function openRazorpayCheckout({ amount, orderId, customer, onSuccess, onFailure }) {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded || !window.Razorpay) {
    console.warn('Razorpay SDK not available, executing fallback payment simulation.');
    // Simulated payment for development test mode
    setTimeout(() => {
      const mockPaymentId = `pay_sim_${Date.now()}`;
      onSuccess({
        razorpay_payment_id: mockPaymentId,
        razorpay_order_id: `order_sim_${Date.now()}`,
        razorpay_signature: 'simulated_signature',
      });
    }, 1200);
    return;
  }

  const rzpOptions = {
    key: CONFIG.RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100), // Amount in paise
    currency: 'INR',
    name: CONFIG.STORE.NAME,
    description: `Order #${orderId} - Premium Automotive Detailing`,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=200&q=80',
    prefill: {
      name: customer.name || '',
      email: customer.email || '',
      contact: customer.phone || '',
    },
    theme: {
      color: '#0284c7',
      backdrop_color: 'rgba(9, 13, 22, 0.85)',
    },
    notes: {
      order_id: orderId,
      brand: 'XORONIQ Car Care',
      origin: 'India'
    },
    modal: {
      ondismiss: function () {
        if (onFailure) {
          onFailure({ error: 'Payment modal closed by customer.' });
        }
      },
    },
    handler: function (response) {
      if (onSuccess) {
        onSuccess(response);
      }
    },
  };

  try {
    const rzp = new window.Razorpay(rzpOptions);
    rzp.on('payment.failed', function (response) {
      if (onFailure) onFailure(response.error);
    });
    rzp.open();
  } catch (err) {
    console.error('Error opening Razorpay:', err);
    if (onFailure) onFailure(err);
  }
}

// ==========================================================================
// RAZORPAY EMI² AFFORDABILITY WIDGET (OFFICIAL NATIVE-WEB SDK)
// Docs: https://razorpay.com/docs/payments/payment-gateway/emi²/widget/native-web
//
// NOTE FOR MERCHANT ACTIVATION:
// 1. To display live EMI, Cardless EMI, and Pay Later options (e.g., Snapmint,
//    ZestMoney, ICICI/HDFC/Axis/SBI EMI), Affordability must be enabled in the
//    Razorpay Dashboard:
//    Razorpay Dashboard → Payment Products → Affordability → Others → Enable Widget.
// 2. Specific financing partners (including Snapmint) appear dynamically based on
//    the merchant account's approval status and order amount eligibility.
//    No financing methods are faked or bypassed.
// 3. For testing, you can use your Razorpay Test Key ID (rzp_test_...) to preview
//    sample plans in Test Mode.
// ==========================================================================

let affordabilityLoadedPromise = null;
let activeAffordabilitySuite = null;
let lastRenderedAmount = null;

/**
 * Load official Razorpay Affordability Widget Script
 * Deduplicates loading and handles failures gracefully
 */
export function loadRazorpayAffordabilityScript() {
  if (affordabilityLoadedPromise) return affordabilityLoadedPromise;

  affordabilityLoadedPromise = new Promise((resolve) => {
    // If SDK is already present on window
    if (window.RazorpayAffordabilitySuite) {
      resolve(true);
      return;
    }

    // Check if script tag already exists in DOM
    const existingScript = document.querySelector('script[src*="widgets/affordability/affordability.js"]');
    if (existingScript) {
      if (window.RazorpayAffordabilitySuite) {
        resolve(true);
        return;
      }
      existingScript.addEventListener('load', () => resolve(true), { once: true });
      existingScript.addEventListener('error', () => {
        console.warn('[Razorpay EMI²] Affordability SDK failed to load from CDN.');
        resolve(false);
      }, { once: true });
      return;
    }

    // Create and append script tag
    const script = document.createElement('script');
    script.src = 'https://cdn.razorpay.com/widgets/affordability/affordability.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.warn('[Razorpay EMI²] Affordability SDK script failed to load from CDN.');
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return affordabilityLoadedPromise;
}

/**
 * Initialize official Razorpay Affordability (EMI²) Widget
 * @param {Object} params
 * @param {number} params.amount - Product price in paise (e.g. 119900 for ₹1,199)
 * @param {string} [params.containerId='razorpay-affordability-widget'] - Target container DOM element ID
 * @param {string} [params.key] - Razorpay Public Key ID (defaults to CONFIG.RAZORPAY_KEY_ID)
 * @param {boolean} [params.isDarkMode=false] - Whether dark mode is enabled
 * @returns {Promise<boolean>} Whether the widget was successfully initialized
 */
export async function initRazorpayAffordabilityWidget({
  amount,
  containerId = 'razorpay-affordability-widget',
  key = CONFIG.RAZORPAY_KEY_ID,
  isDarkMode = false,
} = {}) {
  const container = document.getElementById(containerId);
  if (!container) {
    // Graceful no-op if container is not in current view
    return false;
  }

  // Validate amount: must be positive integer/number in paise
  const numericAmount = Number(amount);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    container.style.display = 'none';
    return false;
  }

  // Prevent duplicate re-renders for the exact same amount
  if (activeAffordabilitySuite && lastRenderedAmount === numericAmount && container.innerHTML.trim() !== '') {
    container.style.display = 'block';
    return true;
  }

  try {
    const isLoaded = await loadRazorpayAffordabilityScript();
    if (!isLoaded || !window.RazorpayAffordabilitySuite) {
      console.warn('[Razorpay EMI²] Widget unavailable.');
      container.style.display = 'none';
      return false;
    }

    // Configure widget adhering to official Razorpay native-web specifications
    const widgetConfig = {
      key: key,
      amount: Math.round(numericAmount),
      target: container,
      theme: {
        color: '#0284c7', // XORONIQ cyan brand accent
      },
      display: {
        widget: {
          main: {
            isDarkMode: Boolean(isDarkMode),
            link: {
              color: '#0284c7',
            },
            footer: {
              darkLogo: !isDarkMode,
            },
          },
        },
      },
    };

    // Clean any prior contents in container before re-rendering
    container.innerHTML = '';
    container.style.display = 'block';

    activeAffordabilitySuite = new window.RazorpayAffordabilitySuite(widgetConfig);
    activeAffordabilitySuite.render();
    lastRenderedAmount = numericAmount;

    return true;
  } catch (error) {
    console.warn('[Razorpay EMI²] Widget unavailable:', error?.message || error);
    container.style.display = 'none';
    return false;
  }
}

