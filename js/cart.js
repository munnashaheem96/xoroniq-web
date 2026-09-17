// ==========================================================================
// XORONIQ CAR CARE - CART SYSTEM
// LocalStorage Persistence, Bootstrap Offcanvas Drawer, Shipping Calculation
// ==========================================================================

import { CONFIG } from './config.js';
import { formatCurrency, getStorage, setStorage, showToast, isNearLocalPincode, isKeralaAddress } from './utils.js';
import { trackAddToCart } from './pixel.js';

const CART_STORAGE_KEY = 'xoroniq_cart';

/**
 * Get current cart items from LocalStorage
 * @returns {Array}
 */
export function getCart() {
  return getStorage(CART_STORAGE_KEY, []);
}

/**
 * Save cart items to LocalStorage
 */
export function saveCart(cart) {
  setStorage(CART_STORAGE_KEY, cart);
  updateCartBadges();
  renderOffcanvasCart();
}

/**
 * Calculate Cart Totals
 * @param {string|number|null} pincode - Optional customer pincode
 * @param {string} paymentMethod - 'RAZORPAY' or 'COD'
 * @param {string|null} state - Optional customer state
 * @param {string|null} city - Optional customer city
 */
export function getCartTotals(pincode = null, paymentMethod = 'RAZORPAY', state = null, city = null) {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  
  let shipping = 0;
  let freeShippingRemaining = 0;
  let isKerala = false;
  let isLocalDelivery = false;
  let codFee = 0;

  const isKeralaDestination = isKeralaAddress(pincode, state, city);

  if (subtotal > 0) {
    if (subtotal >= CONFIG.STORE.FREE_SHIPPING_THRESHOLD) {
      shipping = 0;
      freeShippingRemaining = 0;
      isKerala = isKeralaDestination;
      isLocalDelivery = isKeralaDestination;
    } else if (isKeralaDestination) {
      shipping = CONFIG.STORE.KERALA_SHIPPING_FEE || 60; // All Kerala delivery ₹60
      isKerala = true;
      isLocalDelivery = true;
      freeShippingRemaining = Math.max(0, CONFIG.STORE.FREE_SHIPPING_THRESHOLD - subtotal);
    } else if (pincode && String(pincode).trim().length === 6) {
      // Confirmed outside Kerala 6-digit PIN
      shipping = CONFIG.STORE.STANDARD_SHIPPING_FEE || 80;
      isKerala = false;
      isLocalDelivery = false;
      freeShippingRemaining = Math.max(0, CONFIG.STORE.FREE_SHIPPING_THRESHOLD - subtotal);
    } else {
      // Default initial delivery calculation when destination not yet confirmed:
      // Since XORONIQ is Kerala-based, default delivery rate is Kerala rate ₹60
      shipping = CONFIG.STORE.KERALA_SHIPPING_FEE || 60;
      isKerala = true;
      isLocalDelivery = true;
      freeShippingRemaining = Math.max(0, CONFIG.STORE.FREE_SHIPPING_THRESHOLD - subtotal);
    }
  }

  // Cash on Delivery extra ₹20 fee
  const isCod = (paymentMethod === 'COD' || paymentMethod === 'CASH_ON_DELIVERY');
  if (isCod && subtotal > 0) {
    codFee = CONFIG.STORE.COD_FEE || 20;
  }

  const total = subtotal + shipping + codFee;

  return {
    count,
    subtotal,
    shipping,
    codFee,
    isCod,
    isKerala,
    isLocalDelivery,
    freeShippingRemaining,
    total,
    freeShippingThreshold: CONFIG.STORE.FREE_SHIPPING_THRESHOLD
  };
}

/**
 * Add Product to Cart
 */
export function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === product.id);

  const itemImage = (Array.isArray(product.images) && product.images.length > 0) 
    ? product.images[0] 
    : (product.image || 'images/product/essentials.png');

  const deliveryFee = (product.deliveryFee !== undefined && product.deliveryFee !== null && !isNaN(Number(product.deliveryFee)))
    ? Number(product.deliveryFee)
    : CONFIG.STORE.STANDARD_SHIPPING_FEE;

  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
    if (cart[existingIndex].deliveryFee === undefined) {
      cart[existingIndex].deliveryFee = deliveryFee;
    }
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      slug: product.slug || product.id,
      price: Number(product.price) || 0,
      compareAtPrice: Number(product.compareAtPrice) || 0,
      deliveryFee: deliveryFee,
      image: itemImage,
      quantity: quantity,
      sku: product.sku || ''
    });
  }

  saveCart(cart);
  trackAddToCart(product, quantity);
  showToast(`${product.name} added to cart`, 'success');
  openCartDrawer();
}

/**
 * Remove Item from Cart
 */
export function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  showToast('Item removed from cart', 'info');
}

/**
 * Update Quantity of an item
 */
export function updateQuantity(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    if (newQty <= 0) {
      removeFromCart(productId);
    } else {
      item.quantity = newQty;
      saveCart(cart);
    }
  }
}

/**
 * Clear Cart
 */
export function clearCart() {
  saveCart([]);
}

/**
 * Update all navbar/floating cart badges with bounce effect
 */
export function updateCartBadges() {
  const totals = getCartTotals();
  const badges = document.querySelectorAll('.badge-cart-count');
  
  badges.forEach(badge => {
    badge.textContent = totals.count;
    badge.style.display = totals.count > 0 ? 'flex' : 'none';
    
    // Trigger bounce animation
    badge.style.transform = 'scale(1.35)';
    setTimeout(() => {
      badge.style.transform = 'scale(1)';
    }, 250);
  });
}

/**
 * Open Bootstrap Offcanvas Cart Drawer
 */
export function openCartDrawer() {
  const cartDrawerEl = document.getElementById('xoroniq-cart-drawer');
  if (cartDrawerEl && window.bootstrap && window.bootstrap.Offcanvas) {
    const bsOffcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(cartDrawerEl);
    bsOffcanvas.show();
  }
}

/**
 * Render items inside Offcanvas Cart
 */
export function renderOffcanvasCart() {
  const cartItemsContainer = document.getElementById('cart-drawer-items');
  const cartSubtotalEl = document.getElementById('cart-drawer-subtotal');
  const cartTotalEl = document.getElementById('cart-drawer-total');
  const cartShippingEl = document.getElementById('cart-drawer-shipping');
  const shippingMsgEl = document.getElementById('cart-shipping-msg');
  const shippingProgressEl = document.getElementById('cart-shipping-progress');
  const checkoutBtn = document.getElementById('cart-drawer-checkout-btn');

  if (!cartItemsContainer) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-bag-x text-muted-custom display-4 mb-3"></i>
        <h5 class="font-heading text-black fw-bold mb-2">YOUR CART IS EMPTY</h5>
        <p class="small text-muted-custom mb-4">Elevate your detailing arsenal with professional-grade care.</p>
        <a href="shop.html" class="btn btn-x-outline-accent btn-sm">EXPLORE COLLECTION</a>
      </div>
    `;
    if (checkoutBtn) checkoutBtn.classList.add('disabled');
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(0);
    if (cartShippingEl) cartShippingEl.textContent = formatCurrency(0);
    if (cartTotalEl) cartTotalEl.textContent = formatCurrency(0);
    if (shippingMsgEl) shippingMsgEl.innerHTML = `Free delivery on orders above <strong>${formatCurrency(CONFIG.STORE.FREE_SHIPPING_THRESHOLD)}</strong>`;
    if (shippingProgressEl) shippingProgressEl.style.width = '0%';
    return;
  }

  if (checkoutBtn) checkoutBtn.classList.remove('disabled');

  // Render items list
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='images/product/essentials.png'">
      <div class="cart-item-info">
        <div class="d-flex justify-content-between align-items-start">
          <div class="cart-item-title">${item.name}</div>
          <button class="btn btn-link text-muted-custom p-0 remove-item-btn" data-id="${item.id}" title="Remove Item">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
        <div class="text-muted-custom" style="font-size: 0.72rem;"><i class="bi bi-truck text-accent me-1"></i>Delivery: ₹${item.deliveryFee !== undefined ? item.deliveryFee : CONFIG.STORE.STANDARD_SHIPPING_FEE}</div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <div class="quantity-control">
            <button class="quantity-btn btn-qty-minus" data-id="${item.id}">-</button>
            <span class="quantity-value">${item.quantity}</span>
            <button class="quantity-btn btn-qty-plus" data-id="${item.id}">+</button>
          </div>
          <div class="font-mono text-black fw-bold small">
            ${formatCurrency(item.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners for item actions
  cartItemsContainer.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.getAttribute('data-id')));
  });

  cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = cart.find(i => i.id === id);
      if (item) updateQuantity(id, item.quantity - 1);
    });
  });

  cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = cart.find(i => i.id === id);
      if (item) updateQuantity(id, item.quantity + 1);
    });
  });

  // Update Summary numbers
  if (cartSubtotalEl) cartSubtotalEl.textContent = formatCurrency(totals.subtotal);
  if (cartShippingEl) {
    cartShippingEl.textContent = totals.shipping === 0 ? 'FREE' : formatCurrency(totals.shipping);
  }
  if (cartTotalEl) cartTotalEl.textContent = formatCurrency(totals.total);

  // Update Shipping meter
  if (shippingMsgEl && shippingProgressEl) {
    if (totals.freeShippingRemaining > 0) {
      const percent = Math.min(100, Math.round((totals.subtotal / totals.freeShippingThreshold) * 100));
      shippingProgressEl.style.width = `${percent}%`;
      shippingMsgEl.innerHTML = `Add <strong>${formatCurrency(totals.freeShippingRemaining)}</strong> more to get <strong>FREE SHIPPING</strong>`;
    } else {
      shippingProgressEl.style.width = '100%';
      shippingMsgEl.innerHTML = `<span class="text-success fw-bold"><i class="bi bi-check-circle-fill me-1"></i> YOU HAVE UNLOCKED FREE SHIPPING!</span>`;
    }
  }
}
