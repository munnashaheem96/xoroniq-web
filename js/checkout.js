// ==========================================================================
// XORONIQ CAR CARE - CHECKOUT ENGINE
// Customer Validation, Order Calculation, Razorpay Processing & Firestore Order Storage
// ==========================================================================

import { getCart, getCartTotals, clearCart } from './cart.js';
import { createOrder, onUserAuthChange, getUserProfile } from './firebase.js';
import { openRazorpayCheckout } from './razorpay.js';
import { formatCurrency, generateOrderId, showToast, setStorage } from './utils.js';
import { sendOrderToGoogleSheets } from './sheets.js';
import { trackInitiateCheckout } from './pixel.js';

export function initCheckoutPage() {
  const cart = getCart();
  const pincodeInput = document.getElementById('cust-pincode');
  let currentPincode = pincodeInput ? pincodeInput.value.trim() : '';
  let totals = getCartTotals(currentPincode);

  // Auto-fill logged-in customer profile details
  onUserAuthChange(async (user) => {
    if (!user) return;
    const nameInput = document.getElementById('cust-name');
    const emailInput = document.getElementById('cust-email');
    const phoneInput = document.getElementById('cust-phone');
    const cityInput = document.getElementById('cust-city');

    if (emailInput && !emailInput.value) emailInput.value = user.email || '';
    if (nameInput && !nameInput.value && user.displayName) nameInput.value = user.displayName;

    try {
      const profile = await getUserProfile(user.uid);
      if (profile) {
        if (nameInput && !nameInput.value) nameInput.value = profile.displayName || user.displayName || '';
        if (phoneInput && !phoneInput.value && profile.phone) phoneInput.value = profile.phone;
        if (cityInput && !cityInput.value && profile.city) cityInput.value = profile.city;
      }
    } catch (err) {
      console.warn('Profile autofill note:', err);
    }
  });

  const orderItemsContainer = document.getElementById('checkout-items-list');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const shippingEl = document.getElementById('checkout-shipping');
  const codRow = document.getElementById('checkout-cod-row');
  const codFeeEl = document.getElementById('checkout-cod-fee');
  const totalEl = document.getElementById('checkout-total');
  const checkoutForm = document.getElementById('checkout-form');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const pincodeNoticeEl = document.getElementById('checkout-pincode-notice');
  const stateInput = document.getElementById('cust-state');
  const cityInput = document.getElementById('cust-city');
  const payRazorpayRadio = document.getElementById('payRazorpay');
  const payCODRadio = document.getElementById('payCOD');
  const cardRazorpay = document.getElementById('card-pay-razorpay');
  const cardCOD = document.getElementById('card-pay-cod');
  const codNoticeEl = document.getElementById('checkout-cod-notice');

  // Support pre-selected payment method via query string (e.g. ?payment=cod)
  const urlParams = new URLSearchParams(window.location.search);
  const initialPaymentParam = urlParams.get('payment');
  if (initialPaymentParam === 'cod' && payCODRadio) {
    payCODRadio.checked = true;
  } else if (initialPaymentParam === 'razorpay' && payRazorpayRadio) {
    payRazorpayRadio.checked = true;
  }

  function getSelectedPaymentMethod() {
    if (payCODRadio && payCODRadio.checked) return 'COD';
    return 'RAZORPAY';
  }

  function updateOrderTotalsDisplay() {
    currentPincode = pincodeInput ? pincodeInput.value.trim() : '';
    const currentState = stateInput ? stateInput.value.trim() : '';
    const currentCity = cityInput ? cityInput.value.trim() : '';

    // If customer entered a Kerala PIN (67xxxx, 68xxxx, 69xxxx) and state is empty, auto-fill Kerala
    if (currentPincode.length >= 2 && stateInput && !currentState) {
      const pfx = currentPincode.substring(0, 2);
      if (pfx === '67' || pfx === '68' || pfx === '69') {
        stateInput.value = 'Kerala';
      }
    }

    const selectedMethod = getSelectedPaymentMethod();
    totals = getCartTotals(currentPincode, selectedMethod, stateInput ? stateInput.value.trim() : '', currentCity);

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    
    if (shippingEl) {
      if (totals.shipping === 0) {
        shippingEl.innerHTML = '<span class="text-success fw-bold">FREE (Orders > ₹2,500)</span>';
      } else if (totals.isKerala) {
        shippingEl.innerHTML = '<span class="text-accent fw-bold">₹60 <small class="text-muted-custom fw-normal">(All Kerala)</small></span>';
      } else {
        shippingEl.innerHTML = `<span class="text-dark fw-bold">₹${totals.shipping} <small class="text-muted-custom fw-normal">(Rest of India)</small></span>`;
      }
    }

    // Toggle COD fee row
    if (codRow) {
      if (selectedMethod === 'COD') {
        codRow.style.display = 'flex';
        if (codFeeEl) codFeeEl.textContent = `+${formatCurrency(totals.codFee)}`;
      } else {
        codRow.style.display = 'none';
      }
    }

    // Toggle COD informational notice
    if (codNoticeEl) {
      codNoticeEl.style.display = (selectedMethod === 'COD') ? 'block' : 'none';
    }

    // Toggle active card styles
    if (cardRazorpay && cardCOD) {
      if (selectedMethod === 'COD') {
        cardCOD.classList.add('border-accent');
        cardCOD.classList.remove('border-secondary');
        cardRazorpay.classList.remove('border-accent');
        cardRazorpay.classList.add('border-secondary');
      } else {
        cardRazorpay.classList.add('border-accent');
        cardRazorpay.classList.remove('border-secondary');
        cardCOD.classList.remove('border-accent');
        cardCOD.classList.add('border-secondary');
      }
    }

    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    if (placeOrderBtn) {
      if (selectedMethod === 'COD') {
        placeOrderBtn.innerHTML = `<i class="bi bi-truck me-2"></i> PLACE ORDER (CASH ON DELIVERY) — ${formatCurrency(totals.total)}`;
      } else {
        placeOrderBtn.innerHTML = `<i class="bi bi-lock-fill me-2"></i> PAY & CONFIRM ORDER — ${formatCurrency(totals.total)}`;
      }
    }

    if (pincodeNoticeEl) {
      if (totals.shipping === 0) {
        pincodeNoticeEl.innerHTML = '<span class="text-success small fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> Order above ₹2,500 — Free Shipping Applied!</span>';
        pincodeNoticeEl.style.display = 'block';
      } else if (totals.isKerala) {
        pincodeNoticeEl.innerHTML = '<span class="text-accent small fw-semibold"><i class="bi bi-geo-alt-fill me-1"></i> All Kerala Delivery: ₹60 Flat Rate</span>';
        pincodeNoticeEl.style.display = 'block';
      } else if (currentPincode.length === 6) {
        pincodeNoticeEl.innerHTML = `<span class="text-muted-custom small"><i class="bi bi-truck me-1"></i> Rest of India Delivery: ₹${totals.shipping} (Free above ₹2,500)</span>`;
        pincodeNoticeEl.style.display = 'block';
      } else {
        pincodeNoticeEl.style.display = 'none';
      }
    }
  }

  if (pincodeInput) {
    pincodeInput.addEventListener('input', updateOrderTotalsDisplay);
  }
  if (stateInput) {
    stateInput.addEventListener('input', updateOrderTotalsDisplay);
    stateInput.addEventListener('change', updateOrderTotalsDisplay);
  }
  if (cityInput) {
    cityInput.addEventListener('input', updateOrderTotalsDisplay);
    cityInput.addEventListener('change', updateOrderTotalsDisplay);
  }

  if (payRazorpayRadio) payRazorpayRadio.addEventListener('change', updateOrderTotalsDisplay);
  if (payCODRadio) payCODRadio.addEventListener('change', updateOrderTotalsDisplay);

  if (cardRazorpay) {
    cardRazorpay.addEventListener('click', () => {
      if (payRazorpayRadio && !payRazorpayRadio.checked) {
        payRazorpayRadio.checked = true;
        updateOrderTotalsDisplay();
      }
    });
  }
  if (cardCOD) {
    cardCOD.addEventListener('click', () => {
      if (payCODRadio && !payCODRadio.checked) {
        payCODRadio.checked = true;
        updateOrderTotalsDisplay();
      }
    });
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
            <div class="text-muted-custom" style="font-size: 0.72rem;">SKU: ${item.sku || 'N/A'} • Delivery: ₹${item.deliveryFee !== undefined ? item.deliveryFee : 80}</div>
          </div>
        </div>
        <div class="font-mono text-black fw-bold small">
          ${formatCurrency(item.price * item.quantity)}
        </div>
      </div>
    `).join('');
  }

  updateOrderTotalsDisplay();
  trackInitiateCheckout(cart, totals.total);

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
      const selectedPaymentMethod = getSelectedPaymentMethod();

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

      // Recalculate totals with entered pincode, state, and payment method
      totals = getCartTotals(pincode, selectedPaymentMethod, state, city);

      const originalBtnHtml = placeOrderBtn.innerHTML;
      placeOrderBtn.disabled = true;

      const orderId = generateOrderId();

      // ======================================================================
      // CASH ON DELIVERY (COD) FLOW
      // ======================================================================
      if (selectedPaymentMethod === 'COD') {
        placeOrderBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status"></span>
          CONFIRMING CASH ON DELIVERY ORDER...
        `;

        const orderData = {
          orderId: orderId,
          customer: { name, email, phone: cleanPhone },
          shippingAddress: { address, city, state, pincode, country: 'India' },
          items: cart,
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          codFee: totals.codFee,
          total: totals.total,
          orderStatus: 'Order Placed (COD)',
          payment: {
            method: 'COD',
            status: 'PENDING_COD',
            codFee: totals.codFee,
            details: 'Cash on Delivery (+₹20 extra handling fee)'
          }
        };

        try {
          await createOrder(orderData);
          sendOrderToGoogleSheets(orderData).catch(err => {
            console.warn('Google Sheets sync note:', err);
          });
          setStorage('xoroniq_last_order', orderData);
          clearCart();
          window.location.href = `success.html?orderId=${orderId}&payment=cod`;
        } catch (err) {
          console.error('Failed to store COD order in Firestore:', err);
          sendOrderToGoogleSheets(orderData).catch(e => console.warn('Google Sheets fallback note:', e));
          setStorage('xoroniq_last_order', orderData);
          clearCart();
          window.location.href = `success.html?orderId=${orderId}&payment=cod`;
        }
        return;
      }

      // ======================================================================
      // PREPAID ONLINE PAYMENT FLOW (RAZORPAY)
      // ======================================================================
      placeOrderBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        INITIALIZING SECURE CHECKOUT...
      `;

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
              codFee: 0,
              total: totals.total,
              orderStatus: 'Payment Confirmed',
              payment: {
                method: 'RAZORPAY',
                razorpayPaymentId: paymentResponse.razorpay_payment_id || `pay_${Date.now()}`,
                razorpayOrderId: paymentResponse.razorpay_order_id || '',
                status: 'PAID'
              }
            };

            try {
              await createOrder(orderData);
              // Dispatch order to Google Sheets
              sendOrderToGoogleSheets(orderData).catch(err => {
                console.warn('Google Sheets sync note:', err);
              });
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}&payment=razorpay`;
            } catch (err) {
              console.error('Failed to store order in Firestore:', err);
              sendOrderToGoogleSheets(orderData).catch(e => console.warn('Google Sheets fallback note:', e));
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}&payment=razorpay`;
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
