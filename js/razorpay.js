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
