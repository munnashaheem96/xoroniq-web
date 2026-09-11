// ==========================================================================
// XORONIQ CAR CARE - UTILITY FUNCTIONS
// ==========================================================================

import { CONFIG } from './config.js';

/**
 * Format number into Indian Rupee Currency string
 * @param {number} amount 
 * @returns {string} e.g. "₹2,499"
 */
export function formatCurrency(amount) {
  if (typeof amount !== 'number') {
    amount = parseFloat(amount) || 0;
  }
  return `${CONFIG.STORE.CURRENCY}${amount.toLocaleString('en-IN')}`;
}

/**
 * Calculate percentage discount
 */
export function calculateDiscount(price, comparePrice) {
  if (!comparePrice || comparePrice <= price) return 0;
  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

/**
 * Check if a 6-digit pincode is near 676306 (Malappuram / Kerala 676xxx region or nearby 673 zone)
 * @param {string|number} pincode 
 * @returns {boolean}
 */
export function isNearLocalPincode(pincode) {
  if (!pincode) return false;
  const pinStr = String(pincode).trim().replace(/\D/g, '');
  if (pinStr.length !== 6) return false;

  // Exact match 676306
  if (pinStr === CONFIG.STORE.LOCAL_PINCODE_BASE || pinStr === '676306') return true;

  // Malappuram / Tirurangadi / Calicut University zone (676xxx postal circle)
  if (pinStr.startsWith('676')) return true;

  // Directly adjoining pin codes in 673 zone (like Ramanattukara, Feroke, Calicut Univ border)
  const nearby673 = ['673634', '673635', '673636', '673637', '673638', '673639', '673641', '673642', '673633'];
  if (nearby673.includes(pinStr)) return true;

  return false;
}

/**
 * Format Firestore or JS timestamp to readable string
 */
export function formatDate(dateVal) {
  if (!dateVal) return 'N/A';
  let d;
  if (dateVal.toDate) {
    d = dateVal.toDate();
  } else if (dateVal.seconds) {
    d = new Date(dateVal.seconds * 1000);
  } else {
    d = new Date(dateVal);
  }
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Create a slug from product title
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

/**
 * Generate a unique XORONIQ order ID (e.g. XOR-83921)
 */
export function generateOrderId() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `XOR-${rand}`;
}

/**
 * Debounce helper
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Display a luxury animated toast notification
 */
export function showToast(message, type = 'info') {
  let container = document.getElementById('xoroniq-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'xoroniq-toast-container';
    container.className = 'toast-container-custom';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'bi-check-circle-fill text-success',
    error: 'bi-exclamation-octagon-fill text-danger',
    warning: 'bi-exclamation-triangle-fill text-warning',
    info: 'bi-info-circle-fill text-accent',
  };

  const toast = document.createElement('div');
  toast.className = 'toast-custom';
  toast.innerHTML = `
    <i class="bi ${icons[type] || icons.info} fs-5"></i>
    <div class="toast-message font-heading fw-semibold small">${message}</div>
  `;

  container.appendChild(toast);

  // Trigger entrance animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3500);
}

/**
 * LocalStorage Helpers
 */
export function getStorage(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading from localStorage: ${key}`, e);
    return fallback;
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing to localStorage: ${key}`, e);
  }
}
