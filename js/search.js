// ==========================================================================
// XORONIQ CAR CARE - SEARCH ENGINE
// Full-Screen Animated Search Overlay with Live Multi-Field Product Filtering
// ==========================================================================

import { getProducts } from './firebase.js';
import { formatCurrency, debounce } from './utils.js';

let searchOverlayEl = null;
let searchInputEl = null;
let searchResultsEl = null;
let searchProductsCache = [];

/**
 * Initialize Full-Screen Search System
 */
export async function initSearch() {
  // Inject Search Overlay HTML if not present
  if (!document.getElementById('xoroniq-search-overlay')) {
    const searchHtml = `
      <div id="xoroniq-search-overlay" class="search-overlay">
        <div class="search-container">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="section-tag mb-0">GLOBAL CATALOG QUERY</span>
            <button type="button" class="btn-close-custom fs-4 text-dark" id="close-search-btn">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          
          <input type="text" id="global-search-input" class="search-input-field" placeholder="SEARCH XORONIQ PRODUCTS..." autocomplete="off">
          
          <div class="d-flex align-items-center justify-content-between mt-3 text-muted-custom small">
            <span>Type product name, category, or SKU</span>
            <span id="search-count-label"></span>
          </div>

          <div id="global-search-results" class="search-results-box mt-4">
            <!-- Results injected here -->
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchHtml);
  }

  searchOverlayEl = document.getElementById('xoroniq-search-overlay');
  searchInputEl = document.getElementById('global-search-input');
  searchResultsEl = document.getElementById('global-search-results');
  const closeBtn = document.getElementById('close-search-btn');

  // Attach search triggers (navbar search icons)
  const searchTriggers = document.querySelectorAll('.nav-search-trigger, [data-action="open-search"]');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearchOverlay();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearchOverlay);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchOverlayEl && searchOverlayEl.classList.contains('active')) {
      closeSearchOverlay();
    }
  });

  // Debounced input filtering
  if (searchInputEl) {
    searchInputEl.addEventListener('input', debounce(performLiveSearch, 200));
  }
}

/**
 * Open Search Overlay
 */
export async function openSearchOverlay() {
  if (!searchOverlayEl) return;
  searchOverlayEl.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (searchInputEl) {
    searchInputEl.value = '';
    setTimeout(() => searchInputEl.focus(), 250);
  }

  if (searchResultsEl) {
    searchResultsEl.innerHTML = `
      <div class="text-center py-4 text-muted-custom small">
        <i class="bi bi-search display-6 d-block mb-2"></i>
        Start typing to search products...
      </div>
    `;
  }

  // Pre-fetch products
  try {
    searchProductsCache = await getProducts({ activeOnly: true });
  } catch (e) {
    console.warn('Error loading search catalog:', e);
  }
}

/**
 * Close Search Overlay
 */
export function closeSearchOverlay() {
  if (!searchOverlayEl) return;
  searchOverlayEl.classList.remove('active');
  document.body.style.overflow = '';
}

/**
 * Perform Live Search across Name, Category, SKU, and Description
 */
function performLiveSearch() {
  if (!searchInputEl || !searchResultsEl) return;
  const term = searchInputEl.value.toLowerCase().trim();
  const countLabel = document.getElementById('search-count-label');

  if (!term) {
    searchResultsEl.innerHTML = `
      <div class="text-center py-4 text-muted-custom small">
        <i class="bi bi-search display-6 d-block mb-2"></i>
        Start typing to search products...
      </div>
    `;
    if (countLabel) countLabel.textContent = '';
    return;
  }

  const results = searchProductsCache.filter(p => {
    const nameMatch = (p.name || '').toLowerCase().includes(term);
    const catMatch = (p.category || '').toLowerCase().includes(term);
    const skuMatch = (p.sku || '').toLowerCase().includes(term);
    const descMatch = (p.description || '').toLowerCase().includes(term);
    return nameMatch || catMatch || skuMatch || descMatch;
  });

  if (countLabel) {
    countLabel.textContent = `${results.length} match${results.length === 1 ? '' : 'es'} found`;
  }

  if (results.length === 0) {
    searchResultsEl.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-slash-circle display-5 text-muted-custom mb-3"></i>
        <h5 class="text-black font-heading fw-bold">NO RESULTS FOR "${term.toUpperCase()}"</h5>
        <p class="text-muted-custom small">Try searching for "Kit", "Car Care", "Ceramic", or "Foam".</p>
      </div>
    `;
    return;
  }

  searchResultsEl.innerHTML = results.map(product => {
    const imgUrl = (Array.isArray(product.images) && product.images.length > 0) 
      ? product.images[0] 
      : (product.image || 'images/product/essentials.png');

    return `
      <a href="product.html?id=${product.id}" class="search-result-item">
        <img src="${imgUrl}" alt="${product.name}" class="rounded p-1 bg-light border" style="width: 50px; height: 50px; object-fit: contain;">
        <div class="flex-grow-1">
          <div class="font-heading fw-bold text-black small">${product.name}</div>
          <div class="text-muted-custom small font-mono">${product.category || 'CAR CARE'} • SKU: ${product.sku || 'N/A'}</div>
        </div>
        <div class="font-mono text-accent fw-bold">
          ${formatCurrency(product.price)}
        </div>
      </a>
    `;
  }).join('');
}
