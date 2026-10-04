// ==========================================================================
// XORONIQ CAR CARE - CHECKOUT ENGINE
// Customer Validation, Order Calculation, Razorpay Processing & Firestore Order Storage
// ==========================================================================

import { CONFIG } from './config.js';
import { getCart, getCartTotals, clearCart } from './cart.js';
import { createOrder, onUserAuthChange, getUserProfile } from './firebase.js';
import { openRazorpayCheckout } from './razorpay.js';
import { formatCurrency, generateOrderId, showToast, setStorage, getUtmAttribution } from './utils.js';
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
  const payCodRadio = document.getElementById('payCOD');
  const cardRazorpay = document.getElementById('card-pay-razorpay');
  const cardCod = document.getElementById('card-pay-cod');
  const codNoticeEl = document.getElementById('checkout-cod-notice');

  // If user navigated with ?payment=cod, pre-select COD
  const urlParams = new URLSearchParams(window.location.search);
  const initialPaymentParam = urlParams.get('payment');
  if (initialPaymentParam === 'cod') {
    if (payCodRadio) payCodRadio.checked = true;
    if (payRazorpayRadio) payRazorpayRadio.checked = false;
  }

  function getSelectedPaymentMethod() {
    if (payCodRadio && payCodRadio.checked) return 'COD';
    return 'RAZORPAY';
  }

  function updateOrderTotalsDisplay() {
    currentPincode = pincodeInput ? pincodeInput.value.trim() : '';
    const currentState = stateInput ? stateInput.value.trim() : '';
    const currentCity = cityInput ? cityInput.value.trim() : '';
    const selectedPaymentMethod = getSelectedPaymentMethod();

    // If customer entered a Kerala PIN (67xxxx, 68xxxx, 69xxxx) and state is empty, auto-fill Kerala
    if (currentPincode.length >= 2 && stateInput && !currentState) {
      const pfx = currentPincode.substring(0, 2);
      if (pfx === '67' || pfx === '68' || pfx === '69') {
        stateInput.value = 'Kerala';
      }
    }

    totals = getCartTotals(currentPincode, selectedPaymentMethod, stateInput ? stateInput.value.trim() : '', currentCity);

    if (subtotalEl) subtotalEl.textContent = formatCurrency(totals.subtotal);
    
    if (shippingEl) {
      shippingEl.innerHTML = `<span class="text-dark fw-bold">${formatCurrency(totals.shipping)}</span>`;
    }

    // Toggle COD fee row and notice based on payment method
    if (selectedPaymentMethod === 'COD') {
      if (cardRazorpay) {
        cardRazorpay.classList.remove('border-accent', 'active');
        cardRazorpay.classList.add('border-secondary', 'border-opacity-25');
      }
      if (cardCod) {
        cardCod.classList.remove('border-secondary', 'border-opacity-25');
        cardCod.classList.add('border-accent', 'active');
      }
      if (codNoticeEl) {
        codNoticeEl.style.display = 'block';
      }
      if (codRow) {
        codRow.classList.remove('d-none');
        codRow.classList.add('d-flex');
        codRow.style.setProperty('display', 'flex', 'important');
      }
      if (codFeeEl) codFeeEl.textContent = `+${formatCurrency(totals.codFee || 25)}`;
    } else {
      if (cardRazorpay) {
        cardRazorpay.classList.remove('border-secondary', 'border-opacity-25');
        cardRazorpay.classList.add('border-accent', 'active');
      }
      if (cardCod) {
        cardCod.classList.remove('border-accent', 'active');
        cardCod.classList.add('border-secondary', 'border-opacity-25');
      }
      if (codNoticeEl) {
        codNoticeEl.style.display = 'none';
      }
      if (codRow) {
        codRow.classList.remove('d-flex');
        codRow.classList.add('d-none');
        codRow.style.setProperty('display', 'none', 'important');
      }
    }

    if (totalEl) totalEl.textContent = formatCurrency(totals.total);

    if (placeOrderBtn) {
      if (selectedPaymentMethod === 'COD') {
        placeOrderBtn.innerHTML = `<i class="bi bi-box-seam-fill me-2"></i> CONFIRM CASH ON DELIVERY ORDER — ${formatCurrency(totals.total)}`;
      } else {
        placeOrderBtn.innerHTML = `<i class="bi bi-lock-fill me-2"></i> PAY & CONFIRM ORDER — ${formatCurrency(totals.total)}`;
      }
    }

    if (pincodeNoticeEl) {
      const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      pincodeNoticeEl.innerHTML = `<span class="text-muted-custom small"><i class="bi bi-truck text-accent me-1"></i> Delivery Cash: ${formatCurrency(totals.shipping)} itemized for ${itemCount} item${itemCount > 1 ? 's' : ''}</span>`;
      pincodeNoticeEl.style.display = 'block';
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
  if (payCodRadio) payCodRadio.addEventListener('change', updateOrderTotalsDisplay);

  if (cardRazorpay) {
    cardRazorpay.addEventListener('click', () => {
      if (payRazorpayRadio && !payRazorpayRadio.checked) {
        payRazorpayRadio.checked = true;
        if (payCodRadio) payCodRadio.checked = false;
        updateOrderTotalsDisplay();
      }
    });
  }

  if (cardCod) {
    cardCod.addEventListener('click', () => {
      if (payCodRadio && !payCodRadio.checked) {
        payCodRadio.checked = true;
        if (payRazorpayRadio) payRazorpayRadio.checked = false;
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
            <div class="text-muted-custom" style="font-size: 0.72rem;">SKU: ${item.sku || 'N/A'} • Delivery Cash: ₹${item.deliveryFee !== undefined ? item.deliveryFee : 80} / unit (${formatCurrency((item.deliveryFee !== undefined ? item.deliveryFee : 80) * item.quantity)})</div>
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

      // ======================================================================
      // CASH ON DELIVERY (COD) FLOW
      // ======================================================================
      if (selectedPaymentMethod === 'COD') {
        placeOrderBtn.innerHTML = `
          <span class="spinner-border spinner-border-sm me-2" role="status"></span>
          CONFIRMING CASH ON DELIVERY ORDER...
        `;

        const attribution = getUtmAttribution();
        let orderId = null;

        try {
          // Attempt server-side atomic Order ID generation & email notifications
          const createRes = await fetch(`${CONFIG.API_BASE_URL}/create-cod-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customer: { name, email, phone: cleanPhone },
              shippingAddress: { address, city, state, pincode, country: 'India' },
              items: cart,
              subtotal: totals.subtotal,
              shipping: totals.shipping,
              codFee: totals.codFee || 25,
              discount: totals.discount || 0,
              total: totals.total,
              attribution: attribution || null,
            }),
          });

          if (createRes.ok) {
            const createData = await createRes.json();
            orderId = createData.orderId;
            console.log('Server created COD order:', orderId);
          } else {
            console.warn('Backend COD order creation status:', createRes.status);
          }
        } catch (apiErr) {
          console.warn('Backend COD endpoint unreachable, using client fallback:', apiErr);
        }

        if (!orderId) {
          orderId = generateOrderId();
        }

        const orderData = {
          orderId: orderId,
          customer: { name, email, phone: cleanPhone },
          customerName: name,
          customerEmail: email,
          customerPhone: cleanPhone,
          shippingAddress: { address, city, state, pincode, country: 'India' },
          items: cart,
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          discount: totals.discount || 0,
          codFee: totals.codFee || 25,
          total: totals.total,
          orderStatus: 'Order Placed (COD)',
          paymentStatus: 'PENDING_COD',
          payment: {
            method: 'COD',
            status: 'PENDING_COD',
            codFee: totals.codFee || 25,
            details: 'Cash on Delivery (+₹25 extra handling fee)'
          },
          attribution: attribution || null
        };

        try {
          // Direct Firestore write backup
          await createOrder(orderData);
        } catch (err) {
          console.warn('Client direct Firestore write note:', err);
        }

        try {
          sendOrderToGoogleSheets(orderData).catch(err => {
            console.warn('Google Sheets sync note:', err);
          });
          setStorage('xoroniq_last_order', orderData);
          clearCart();
          window.location.href = `success.html?orderId=${orderId}&payment=cod`;
        } catch (err) {
          console.error('Failed to complete COD order:', err);
          setStorage('xoroniq_last_order', orderData);
          clearCart();
          window.location.href = `success.html?orderId=${orderId}&payment=cod`;
        }
        return;
      }

      // ======================================================================
      // PREPAID ONLINE PAYMENT FLOW (RAZORPAY & SERVER ORDER SYSTEM)
      // ======================================================================
      placeOrderBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status"></span>
        INITIALIZING SECURE CHECKOUT...
      `;

      let orderId = null;
      let razorpayOrderId = null;

      try {
        // Request server-generated atomic XRQ-YYYY-XXXXX Order ID & Razorpay Order
        const createRes = await fetch(`${CONFIG.API_BASE_URL}/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: { name, email, phone: cleanPhone },
            shippingAddress: { address, city, state, pincode, country: 'India' },
            items: cart,
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            discount: totals.discount || 0,
            total: totals.total,
            attribution: getUtmAttribution() || null,
          }),
        });

        if (createRes.ok) {
          const createData = await createRes.json();
          orderId = createData.orderId;
          razorpayOrderId = createData.razorpayOrderId;
        } else {
          console.warn('Backend order creation returned status', createRes.status);
        }
      } catch (apiErr) {
        console.warn('Backend order creation endpoint unreachable, using client fallback ID:', apiErr);
      }

      // Safe fallback if backend is offline in local development
      if (!orderId) {
        orderId = generateOrderId();
      }

      try {
        await openRazorpayCheckout({
          amount: totals.total,
          orderId: orderId,
          razorpayOrderId: razorpayOrderId,
          customer: { name, email, phone: cleanPhone },
          onSuccess: async (paymentResponse) => {
            placeOrderBtn.innerHTML = `
              <span class="spinner-border spinner-border-sm me-2" role="status"></span>
              VERIFYING PAYMENT & CONFIRMING...
            `;

            // Server-side payment verification & automated email triggers
            try {
              const verifyRes = await fetch(`${CONFIG.API_BASE_URL}/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  orderId: orderId,
                  razorpay_order_id: paymentResponse.razorpay_order_id || razorpayOrderId,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                }),
              });

              if (verifyRes.ok) {
                const verifyData = await verifyRes.json();
                console.log('Server verified order and triggered notifications:', verifyData);
              }
            } catch (vErr) {
              console.warn('Server verification API note (Razorpay Webhook will also verify and notify):', vErr);
            }

            const attribution = getUtmAttribution();

            const orderData = {
              orderId: orderId,
              customer: { name, email, phone: cleanPhone },
              shippingAddress: { address, city, state, pincode, country: 'India' },
              items: cart,
              subtotal: totals.subtotal,
              shipping: totals.shipping,
              discount: totals.discount || 0,
              codFee: 0,
              total: totals.total,
              orderStatus: 'Payment Confirmed',
              payment: {
                method: 'RAZORPAY',
                razorpayPaymentId: paymentResponse.razorpay_payment_id || `pay_${Date.now()}`,
                razorpayOrderId: paymentResponse.razorpay_order_id || razorpayOrderId || '',
                status: 'PAID',
              },
              attribution: attribution || null,
            };

            try {
              // Also sync with Google Sheets
              sendOrderToGoogleSheets(orderData).catch((err) => {
                console.warn('Google Sheets sync note:', err);
              });
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}&payment=razorpay`;
            } catch (err) {
              console.error('Checkout completion note:', err);
              setStorage('xoroniq_last_order', orderData);
              clearCart();
              window.location.href = `success.html?orderId=${orderId}&payment=razorpay`;
            }
          },
          onFailure: (error) => {
            console.warn('Payment failed or cancelled:', error);
            placeOrderBtn.disabled = false;
            placeOrderBtn.innerHTML = originalBtnHtml;
            const msg = error?.description || error?.message || (typeof error === 'string' ? error : 'Payment was not completed. Please try again.');
            showToast(msg, 'error');
          },
        });
      } catch (err) {
        console.error('Error in checkout flow:', err);
        placeOrderBtn.disabled = false;
        placeOrderBtn.innerHTML = originalBtnHtml;
        showToast(err?.message || 'Unable to start payment checkout.', 'error');
      }
    });
  }
}
