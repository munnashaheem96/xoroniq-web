// ==========================================================================
// XORONIQ CAR CARE - META ADS (FACEBOOK PIXEL) ENGINE
// Tracks PageView, ViewContent, AddToCart, InitiateCheckout & Purchase
// ==========================================================================

import { CONFIG } from './config.js';

let pixelInitialized = false;

/**
 * Initialize Meta Pixel Snippet
 */
export function initMetaPixel() {
  if (pixelInitialized) return;

  const pixelId = CONFIG.META_PIXEL_ID || '1588128035519008';
  if (!pixelId || pixelId === 'your_meta_pixel_id') {
    console.info('Meta Pixel: No Pixel ID provided.');
    return;
  }

  // If fbq already defined by inline script, just track PageView
  if (typeof window.fbq === 'function') {
    pixelInitialized = true;
    return;
  }

  /* eslint-disable */
  (function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      document.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    pixelInitialized = true;
    console.info(`✓ Meta Pixel initialized with ID: ${pixelId}`);
  }
}

/**
 * Track PageView
 */
export function trackPageView() {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}

/**
 * Track Product View (ViewContent)
 * @param {Object} product
 */
export function trackViewContent(product) {
  if (!product) return;
  initMetaPixel();

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: product.name || 'XORONIQ Product',
      content_ids: [String(product.id || product.sku || 'xoroniq-item')],
      content_type: 'product',
      value: Number(product.price) || 0,
      currency: 'INR',
      content_category: product.category || 'Automotive Care'
    });
  }
}

/**
 * Track Add to Cart
 * @param {Object} item
 * @param {number} quantity
 */
export function trackAddToCart(item, quantity = 1) {
  if (!item) return;
  initMetaPixel();

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: item.name || 'XORONIQ Product',
      content_ids: [String(item.id || item.sku || 'item')],
      content_type: 'product',
      value: (Number(item.price) || 0) * quantity,
      currency: 'INR',
      num_items: quantity
    });
  }
}

/**
 * Track Checkout Initiation
 * @param {Array} items
 * @param {number} total
 */
export function trackInitiateCheckout(items = [], total = 0) {
  initMetaPixel();

  const contentIds = items.map(i => String(i.id || i.sku || 'item'));
  const numItems = items.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0);

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: contentIds,
      content_type: 'product',
      num_items: numItems,
      value: Number(total) || 0,
      currency: 'INR'
    });
  }
}

/**
 * Track Completed Purchase
 * @param {Object} orderData
 */
export function trackPurchase(orderData) {
  if (!orderData) return;
  initMetaPixel();

  const items = Array.isArray(orderData.items) ? orderData.items : [];
  const contentIds = items.map(i => String(i.id || i.sku || 'item'));
  const numItems = items.reduce((acc, curr) => acc + (Number(curr.quantity) || 1), 0);

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      content_ids: contentIds,
      content_type: 'product',
      num_items: numItems,
      value: Number(orderData.total) || 0,
      currency: 'INR',
      order_id: String(orderData.orderId || '')
    });
    console.info(`✓ Meta Pixel Purchase tracked for order: ${orderData.orderId}`);
  }
}
