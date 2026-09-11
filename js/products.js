// ==========================================================================
// XORONIQ CAR CARE - PRODUCTS MODULE
// Dynamic Firestore Catalog, Filter Tabs, Sorting, Staggered Cards & Quick View Modal
// ==========================================================================

import { getProducts, getProductById } from './firebase.js';
import { formatCurrency, calculateDiscount, matchesCategory, formatCategoryBadge, getProductCategories } from './utils.js';
import { addToCart } from './cart.js';

let cachedProducts = [];
let currentCategory = 'ALL';
let currentSort = 'featured';

/**
 * Initialize Collection Grid
 * @param {string} containerId - Target DOM element ID
 * @param {Object} options - { limit, showFilters }
 */
export async function initProductsGrid(containerId = 'products-grid-container', options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Show loading skeleton
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-accent" role="status">
        <span class="visually-hidden">Loading Products...</span>
      </div>
      <p class="font-heading mt-3 text-muted-custom small letter-spacing-wide">ACCESSING XORONIQ CATALOG...</p>
    </div>
  `;

  try {
    cachedProducts = await getProducts({ activeOnly: true });
    renderFilteredProducts(containerId, options);
    initFilterTabs(containerId, options);
    initSortDropdown(containerId, options);
  } catch (error) {
    console.error('Failed to load products:', error);
    container.innerHTML = `
      <div class="col-12 text-center py-4 text-danger">
        <i class="bi bi-exclamation-triangle-fill display-5 mb-2"></i>
        <p>Failed to load products. Please refresh.</p>
      </div>
    `;
  }
}

/**
 * Filter & Sort Cached Products and Render to DOM
 */
function renderFilteredProducts(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let filtered = [...cachedProducts];

  // Apply Multi-Category Filter (Matches products applicable to Car, Bike, or Both)
  if (currentCategory !== 'ALL') {
    filtered = filtered.filter(p => matchesCategory(p, currentCategory));
  }

  // Apply Sorting
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
  } else if (currentSort === 'newest') {
    filtered.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return dateB - dateA;
    });
  } else {
    // Featured first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  // Apply limit if specified
  if (options.limit && options.limit > 0) {
    filtered = filtered.slice(0, options.limit);
  }

  const countBadge = document.getElementById('product-count-display');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Product${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="bi bi-box-seam text-muted-custom display-4 mb-3"></i>
        <h5 class="text-black font-heading fw-bold">NO PRODUCTS FOUND</h5>
        <p class="text-muted-custom small">No active products match the selected category.</p>
        <button class="btn btn-x-outline-accent btn-sm mt-2" id="reset-filter-btn">VIEW ALL PRODUCTS</button>
      </div>
    `;
    const resetBtn = document.getElementById('reset-filter-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        currentCategory = 'ALL';
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'ALL'));
        renderFilteredProducts(containerId, options);
      });
    }
    return;
  }

  // Render Product Cards with staggered animation delays
  container.innerHTML = filtered.map((product, index) => {
    const delay = ((index % 6) + 1) * 0.1;
    const isSoon = Boolean(product.isComingSoon || product.launchStatus === 'LAUNCHING SOON');
    const discount = product.discount || calculateDiscount(product.price, product.compareAtPrice);
    const imgUrl = (Array.isArray(product.images) && product.images.length > 0) 
      ? product.images[0] 
      : (product.image || 'images/product/essentials.png');
    const categoryBadge = formatCategoryBadge(product);

    return `
      <div class="col-lg-4 col-md-6 mb-4 reveal reveal-fade-up" style="animation-delay: ${delay}s; transition-delay: ${delay}s;">
        <div class="product-card ${isSoon ? 'product-card-coming-soon' : ''}" data-id="${product.id}">
          <div class="product-card-image-wrap">
            ${isSoon 
              ? `<span class="product-badge-discount bg-dark text-white border border-secondary border-opacity-50"><i class="bi bi-stars text-warning me-1"></i> LAUNCHING SOON</span>` 
              : (discount > 0 ? `<span class="product-badge-discount">${discount}% OFF</span>` : '')
            }
            <span class="product-badge-category">${categoryBadge}</span>
            <img src="${imgUrl}" alt="${product.name}" class="product-card-image" loading="lazy" onerror="this.src='images/product/essentials.png'">
          </div>
          <div class="product-card-body">
            <a href="product.html?id=${product.id}" class="product-card-title">${product.name}</a>
            <p class="product-card-desc">${product.shortDescription || product.description || 'Professional detailing formulation.'}</p>
            <div class="product-card-pricing">
              <span class="price-current">${formatCurrency(product.price)}</span>
              ${product.compareAtPrice > product.price ? `<span class="price-compare">${formatCurrency(product.compareAtPrice)}</span>` : ''}
              ${isSoon ? `<span class="badge bg-warning bg-opacity-25 text-warning small ms-2">UPCOMING</span>` : ''}
            </div>
            <div class="product-card-actions">
              ${isSoon 
                ? `<a href="product.html?id=${product.id}" class="btn btn-x-outline-accent btn-sm flex-grow-1">
                    <i class="bi bi-eye me-1"></i> PREVIEW KIT
                   </a>`
                : `<button class="btn btn-x-primary btn-sm add-cart-btn" data-id="${product.id}">
                    <i class="bi bi-cart-plus me-1"></i> ADD TO CART
                   </button>`
              }
              <button class="btn btn-x-outline btn-sm quick-view-btn" data-id="${product.id}" title="Quick View">
                <i class="bi bi-info-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach card event listeners
  container.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const product = cachedProducts.find(p => p.id === id);
      if (product) addToCart(product, 1);
    });
  });

  container.querySelectorAll('.quick-view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      openQuickViewModal(id);
    });
  });
}

/**
 * Filter Tabs Event Listener
 */
function initFilterTabs(containerId, options) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category') || 'ALL';
      renderFilteredProducts(containerId, options);
    });
  });
}

/**
 * Sort Dropdown Event Listener
 */
function initSortDropdown(containerId, options) {
  const sortSelect = document.getElementById('product-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderFilteredProducts(containerId, options);
    });
  }
}

/**
 * Quick View Modal System
 */
export async function openQuickViewModal(productId) {
  let modalEl = document.getElementById('xoroniq-quickview-modal');
  if (!modalEl) {
    const modalHtml = `
      <div class="modal fade" id="xoroniq-quickview-modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-custom">
            <div class="modal-header border-0 pb-0">
              <button type="button" class="btn-close-custom ms-auto" data-bs-dismiss="modal" aria-label="Close">
                <i class="bi bi-x-lg"></i>
              </button>
            </div>
            <div class="modal-body p-4 p-md-5" id="quickview-modal-content">
              <!-- Injected dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById('xoroniq-quickview-modal');
  }

  const contentWrap = document.getElementById('quickview-modal-content');
  contentWrap.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-accent"></div>
    </div>
  `;

  const bsModal = new window.bootstrap.Modal(modalEl);
  bsModal.show();

  const product = cachedProducts.find(p => p.id === productId) || await getProductById(productId);
  if (!product) {
    contentWrap.innerHTML = `<p class="text-center text-danger">Product details could not be found.</p>`;
    return;
  }

  const imgUrl = (Array.isArray(product.images) && product.images.length > 0) 
    ? product.images[0] 
    : (product.image || 'images/product/essentials.png');
  const discount = product.discount || calculateDiscount(product.price, product.compareAtPrice);

  contentWrap.innerHTML = `
    <div class="row align-items-center g-4">
      <div class="col-md-6 text-center">
        <div class="p-4 bg-surface-custom rounded-3 border border-secondary border-opacity-25 position-relative">
          ${discount > 0 ? `<span class="product-badge-discount position-absolute top-0 start-0 m-3">${discount}% OFF</span>` : ''}
          <img src="${imgUrl}" alt="${product.name}" class="img-fluid" style="max-height: 280px; object-fit: contain;">
        </div>
      </div>
      <div class="col-md-6">
        <span class="section-tag mb-2">${product.category || 'CAR CARE'}</span>
        <h3 class="font-heading text-black fw-bold mb-2">${product.name}</h3>
        <div class="d-flex align-items-baseline gap-3 mb-3">
          <span class="price-current fs-3 text-black">${formatCurrency(product.price)}</span>
          ${product.compareAtPrice > product.price ? `<span class="price-compare">${formatCurrency(product.compareAtPrice)}</span>` : ''}
        </div>
        <p class="text-body small mb-4">${product.description || product.shortDescription || 'Engineered for exceptional surface protection and gloss.'}</p>
        
        <div class="d-flex gap-3 align-items-center mb-4">
          <div class="quantity-control">
            <button class="quantity-btn" id="modal-qty-minus">-</button>
            <span class="quantity-value" id="modal-qty-val">1</span>
            <button class="quantity-btn" id="modal-qty-plus">+</button>
          </div>
          <button class="btn btn-x-primary flex-grow-1" id="modal-add-cart-btn">
            <i class="bi bi-cart-plus me-1"></i> ADD TO CART
          </button>
        </div>
        
        <a href="product.html?id=${product.id}" class="text-accent small font-heading fw-bold letter-spacing-wide text-decoration-none d-inline-flex align-items-center gap-1">
          VIEW FULL PRODUCT DETAILS <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    </div>
  `;

  let qty = 1;
  const qtyValEl = document.getElementById('modal-qty-val');
  document.getElementById('modal-qty-minus').addEventListener('click', () => {
    if (qty > 1) {
      qty--;
      qtyValEl.textContent = qty;
    }
  });
  document.getElementById('modal-qty-plus').addEventListener('click', () => {
    qty++;
    qtyValEl.textContent = qty;
  });

  document.getElementById('modal-add-cart-btn').addEventListener('click', () => {
    addToCart(product, qty);
    bsModal.hide();
  });
}
