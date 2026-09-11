// ==========================================================================
// XORONIQ CAR CARE - CHECKOUT ENGINE
// Customer Validation, Order Calculation, Razorpay Processing & Firestore Order Storage
// ==========================================================================

import { getCart, getCartTotals, clearCart } from './cart.js';
import { createOrder } from './firebase.js';
import { openRazorpayCheckout } from './razorpay.js';
import { formatCurrency, generateOrderId, showToast, setStorage } from './utils.js';

export function initCheckoutPage() {
  const cart = getCart();
  const pincodeInput = document.getElementById('cust-pincode');
  let currentPincode = pincodeInput ? pincodeInput.value.trim() : '';
  let totals = getCartTotals(currentPincode);

  const orderItemsContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const totalEl = document.getElementById('checkout-total');
  const checkoutForm = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const pincodeNoticeEl = document.getElementById('checkout-pincode-notice');

  function updateOrderTotalsDisplay() {
    currentPincode = pincodeInput ? pincodeInput.value.trim() : '';
    totals = getCartTotals(currentPincode);

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    
    if (shippingEl) {
      if (totals.shipping === 0) {
        shippingEl.innerHTML = '<span class="text-success fw-bold">FREE (Orders > ₹2,000)</span>';
      } else if (totals.isLocalDelivery) {
        shippingEl.innerHTML = '<span class="text-accent fw-bold">₹40 <small class="text-muted-custom fw-normal">(Local 676xxx)</small></span>';
      } else {
        shippingEl.innerHTML = '<span class="text-dark fw-bold">₹80 <small class="text-muted-custom fw-normal">(Standard)</small></span>';
      }
    }

    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    if (pincodeNoticeEl) {
      if (totals.shipping === 0) {
        pincodeNoticeEl.innerHTML = '<span class="text-success small fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> Order above ₹2,000 — Free Shipping Applied!</span>';
        pincodeNoticeEl.style.display = 'block';
      } else if (totals.isLocalDelivery) {
        pincodeNoticeEl.innerHTML = '<span class="text-accent small fw-semibold"><i class="bi bi-geo-alt-fill me-1"></i> Local Area PIN (Near 676306) — Reduced Delivery Fee: ₹40</span>';
        pincodeNoticeEl.style.display = 'block';
      } else if (currentPincode.length === 6) {
        pincodeNoticeEl.innerHTML = '<span class="text-muted-custom small"><i class="bi bi-truck me-1"></i> Standard Express Shipping: ₹80 (Free above ₹2,000)</span>';
        pincodeNoticeEl.style.display = 'block';
      } else {
        pincodeNoticeEl.style.display = 'none';
      }
    }
  }

  if (pincodeInput) {
    pincodeInput.addEventListener('input', updateOrderTotalsDisplay);
  }

  if (cart.length === 0) {
    if (orderItemsContainer) {
      orderItemsContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-cart-x display-4 text-muted-custom mb-3"></i>
          <h4 class="font-heading text-black fw-bold">NO ITEMS IN CART</h4>
          <p class="text-muted-custom small mb-4">Please add products before proceeding to checkout.</p>
          <a href="shop.html" class="btn btn-x-primary btn-sm">EXPLORE THE COLLECTION</a>
        </div>
      `;
    }
    if (placeOrderBtn) placeOrderBtn.disabled = true;
    return;
  }

  // Render Order Items Breakdown
  if (orderItemsContainer) {
    orderItemsContainer.innerHTML = cart.map(item => `
      <div class="d-flex align-items-center justify-content-between py-3 border-bottom border-secondary border-opacity-25">
        <div class="d-flex align-items-center gap-3">
          <div class="position-relative">
            <img src="${item.image}" alt="${item.name}" class="rounded p-1 bg-surface-custom border border-secondary border-opacity-25" style="width: 55px; height: 55px; object-fit: contain;">
            <span class="badge-status status-active position-absolute top-0 start-100 translate-middle" style="font-size: 0.65rem; padding: 0.15rem 0.4rem;">
              ${item.quantity}
            </span>
          </div>
          <div>
            <div class="font-heading fw-bold text-black small">${item.name}</div>
            <div class="text-muted-custom" style="font-size: 0.75rem;">SKU: ${item.sku || 'N/A'}</div>
          </div>
        </div>
        <div class="font-mono text-black fw-bold small">
          ${formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    `).join('');
  }

  updateOrderTotalsDisplay();

  // Form Submit Handler
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('cust-name').value.trim();
      const email = document.getElementById('cust-email').value.trim();
      const phone = document.getElementById('cust-phone').value.trim();
      const address = document.getElementById('cust-address').value.trim();
      const city = document.getElementById('cust-city').value.trim();
      const state = document.getElementById('cust-state').value.trim();
      const pincode = document.getElementById('cust-pincode').value.trim();

      if (!name || !email || !phone || !address || !city || !state || !pincode) {
        showToast('Please fill in all shipping details.', 'warning');
        return;
      }

      // Basic Phone validation (10 digits)
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'warning');
        return;
      }

      // Recalculate totals with entered pincode
      totals = getCartTotals(pincode);

      // Lock button & show processing
      const originalBtnHtml = placeOrderBtn.innerHTML;
      placeOrderBtn.disabled = true;
      placeOrderBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        INITIALIZING SECURE CHECKOUT...
      `;

      const orderId = generateOrderId();

      try {
        await openRazorpayCheckout({
          amount: totals.total,
          orderId: orderId,
          customer: { name, email, phone: cleanPhone },
          onSuccess: async (paymentResponse) => {
            placeOrderBtn.innerHTML = `
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              SECURING ORDER IN DATABASE...
            `;

            const orderData = {
              orderId: orderId,
              customer: { name, email, phone: cleanPhone },
              shippingAddress: { address, city, state, pincode, country: 'India' },
              items: cart,
              subtotal: totals.subtotal,
              shipping: totals.shipping,
              total: totals.total,
              payment: {
                method: 'RAZORPAY',
                razorpayPaymentId: paymentResponse.razorpay_payment_id || `pay_${Date.now()}`,
                razorpayOrderId: paymentResponse.razorpay_order_id || '',
                status: 'PAID'
              }
            };

            try {
              await createOrder(orderData);
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}`;
            } catch (err) {
              console.error('Failed to store order in Firestore:', err);
              // Store locally in case of network issue
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}`;
            }
          },
          onFailure: (error) => {
            console.warn('Payment failed or cancelled:', error);
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = originalBtnHtml;
            showToast('Payment was not completed. Please try again.', 'error');
          }
        });
      } catch (err) {
        console.error('Error in checkout flow:', err);
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = originalBtnHtml;
        showToast('Unable to start payment checkout.', 'error');
      }
    });
  }
}
