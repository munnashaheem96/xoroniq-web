// ==========================================================================
// XORONIQ CAR CARE - PRODUCT DETAIL PAGE LOGIC
// Dynamic Gallery, Hover Zoom, Specs & Direct Buy Flow
// ==========================================================================

import { getProductById, getProductBySlug, INITIAL_ESSENTIAL_KIT } from './firebase.js';
import { formatCurrency, calculateDiscount, showToast, formatCategoryBadge } from './utils.js';
import { addToCart } from './cart.js';
import { trackViewContent } from './pixel.js';
import { initRazorpayAffordabilityWidget } from './razorpay.js';

/**
 * Initialize Standalone Product Detail Page
 */
export async function initProductDetailPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const productSlug = urlParams.get('slug');

  let product = null;

  try {
    if (productId) {
      product = await getProductById(productId);
    } else if (productSlug) {
      product = await getProductBySlug(productSlug);
    }
  } catch (e) {
    console.warn('Error loading product, using initial kit:', e);
  }

  if (!product) {
    product = INITIAL_ESSENTIAL_KIT;
  }

  renderProductDetails(product);
  trackViewContent(product);
}

/**
 * Render all product details onto product.html
 */
function renderProductDetails(product) {
  // Update Page Title
  document.title = `${product.name} | XORONIQ Car Care`;

  // Breadcrumbs & Category
  const breadcrumbEl = document.getElementById('product-breadcrumb-name');
  if (breadcrumbEl) breadcrumbEl.textContent = product.name;

  const categoryTag = document.getElementById('product-detail-category');
  if (categoryTag) categoryTag.textContent = formatCategoryBadge(product);

  // Title & SKU
  const titleEl = document.getElementById('product-detail-title');
  if (titleEl) titleEl.textContent = product.name;

  const skuEl = document.getElementById('product-detail-sku');
  if (skuEl) skuEl.textContent = `SKU: ${product.sku || 'XOR-001'}`;

  // Stock & Launch Status
  const isSoon = Boolean(product.isComingSoon || product.launchStatus === 'LAUNCHING SOON');

  // Price & Discount
  const priceCurrent = document.getElementById('product-detail-price');
  if (priceCurrent) {
    priceCurrent.textContent = isSoon ? '₹XXXX' : formatCurrency(product.price);
  }

  const priceCompare = document.getElementById('product-detail-compare-price');
  const discountBadge = document.getElementById('product-detail-discount-badge');
  const discount = product.discount || calculateDiscount(product.price, product.compareAtPrice);

  if (priceCompare) {
    if (!isSoon && product.compareAtPrice > product.price) {
      priceCompare.textContent = formatCurrency(product.compareAtPrice);
      priceCompare.style.display = 'inline';
    } else {
      priceCompare.style.display = 'none';
    }
  }

  if (discountBadge) {
    if (!isSoon && discount > 0) {
      discountBadge.textContent = `${discount}% OFF`;
      discountBadge.style.display = 'inline-block';
    } else {
      discountBadge.style.display = 'none';
    }
  }

  const stockEl = document.getElementById('product-detail-stock');
  if (stockEl) {
    if (isSoon) {
      stockEl.innerHTML = `<span class="badge-status status-active bg-dark text-white border border-secondary border-opacity-50"><i class="bi bi-stars text-warning me-1"></i> LAUNCHING SOON (UPCOMING RELEASE)</span>`;
    } else if (product.stock > 0) {
      stockEl.innerHTML = `<span class="badge-status status-active"><i class="bi bi-check-circle-fill"></i> IN STOCK (${product.stock} Units Available)</span>`;
    } else {
      stockEl.innerHTML = `<span class="badge-status status-cancelled"><i class="bi bi-x-circle-fill"></i> OUT OF STOCK</span>`;
    }
  }

  // Delivery info
  const deliveryInfoEl = document.getElementById('product-detail-delivery-info');
  if (deliveryInfoEl) {
    deliveryInfoEl.textContent = `Kerala Delivery: ₹60 (Rest of India: ₹80, Free > ₹2,500)`;
  }

  // Short & Long Descriptions
  const shortDescEl = document.getElementById('product-detail-short-desc');
  if (shortDescEl) shortDescEl.textContent = product.shortDescription || product.description;

  const fullDescEl = document.getElementById('product-detail-full-desc');
  if (fullDescEl) fullDescEl.textContent = product.description;

  // Gallery
  let images = (Array.isArray(product.images) && product.images.length > 0) 
    ? product.images 
    : ['images/product/essentials.png'];

  if (isSoon && (images.length === 0 || images[0] === 'images/product/essentials.png')) {
    images = ['images/product/anonymous-teaser.jpg'];
  }

  const mainImageEl = document.getElementById('product-detail-main-img');
  const thumbsContainer = document.getElementById('product-detail-thumbs');

  if (mainImageEl) {
    mainImageEl.src = images[0];
    mainImageEl.alt = product.name;
    
    // Zoom effect on mouse move
    mainImageEl.parentElement.addEventListener('mousemove', (e) => {
      const rect = mainImageEl.parentElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      mainImageEl.style.transformOrigin = `${x}% ${y}%`;
      mainImageEl.style.transform = 'scale(1.35)';
    });

    mainImageEl.parentElement.addEventListener('mouseleave', () => {
      mainImageEl.style.transform = 'scale(1)';
    });
  }

  if (thumbsContainer) {
    if (images.length > 1) {
      thumbsContainer.innerHTML = images.map((img, idx) => `
        <div class="thumb-item ${idx === 0 ? 'active' : ''}" data-src="${img}">
          <img src="${img}" alt="Thumbnail ${idx + 1}" class="img-fluid rounded" style="width: 70px; height: 70px; object-fit: contain;">
        </div>
      `).join('');

      thumbsContainer.querySelectorAll('.thumb-item').forEach(th => {
        th.addEventListener('click', () => {
          thumbsContainer.querySelectorAll('.thumb-item').forEach(t => t.classList.remove('active'));
          th.classList.add('active');
          if (mainImageEl) mainImageEl.src = th.getAttribute('data-src');
        });
      });
    } else {
      thumbsContainer.style.display = 'none';
    }
  }

  // Specifications list
  const specsContainer = document.getElementById('product-detail-specs-table');
  if (specsContainer && product.specs) {
    specsContainer.innerHTML = product.specs.map(s => `
      <tr>
        <td class="text-black font-heading fw-bold" style="width: 35%;">${s.label}</td>
        <td class="text-dark">${s.value}</td>
      </tr>
    `).join('');
  }

  // Key Features
  const featuresContainer = document.getElementById('product-detail-features-list');
  if (featuresContainer && product.features) {
    featuresContainer.innerHTML = product.features.map(f => `
      <li class="d-flex align-items-start gap-2 mb-2">
        <i class="bi bi-shield-check text-accent mt-1"></i>
        <span>${f}</span>
      </li>
    `).join('');
  }

  // Quantity control
  let quantity = 1;
  const qtyVal = document.getElementById('detail-qty-val');
  const btnMinus = document.getElementById('detail-qty-minus');
  const btnPlus = document.getElementById('detail-qty-plus');

  if (btnMinus && btnPlus && qtyVal) {
    btnMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyVal.textContent = quantity;
      }
    });
    btnPlus.addEventListener('click', () => {
      quantity++;
      qtyVal.textContent = quantity;
    });
  }

  // Add to Cart & Buy Now Buttons
  const addCartBtn = document.getElementById('product-detail-add-cart-btn');
  const buyNowBtn = document.getElementById('product-detail-buy-now-btn');

  if (isSoon) {
    if (addCartBtn) {
      addCartBtn.innerHTML = `<i class="bi bi-bell-fill me-1"></i> NOTIFY ME ON LAUNCH`;
      addCartBtn.addEventListener('click', () => {
        showToast(`Thank you for your interest! We will notify you when ${product.name} launches.`, 'info');
      });
    }
    if (buyNowBtn) {
      buyNowBtn.style.display = 'none';
    }
  } else {
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        addToCart(product, quantity);
      });
    }
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        addToCart(product, quantity);
        window.location.href = 'checkout.html';
      });
    }
  }

  // ==========================================================================
  // Razorpay EMI² Affordability Widget (Dynamic Product Pricing)
  // ==========================================================================
  const affordabilityWidgetContainer = document.getElementById('razorpay-affordability-widget');
  const validPrice = Number(product.price);

  if (isSoon || isNaN(validPrice) || validPrice <= 0) {
    if (affordabilityWidgetContainer) {
      affordabilityWidgetContainer.style.display = 'none';
      affordabilityWidgetContainer.innerHTML = '';
    }
  } else {
    // Convert current dynamic selling price to paise (e.g. ₹1,199 -> 119900 paise)
    const amountInPaise = Math.round(validPrice * 100);
    initRazorpayAffordabilityWidget({
      amount: amountInPaise,
      containerId: 'razorpay-affordability-widget',
      isDarkMode: false,
    });
  }
}
