// ==========================================================================
// XORONIQ CAR CARE - ADMIN DASHBOARD & PRODUCT CRUD
// Metric Counters, Real-Time Product Management, Image Upload & Stock Control
// ==========================================================================

import { 
  getDashboardMetrics, 
  getProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  uploadProductImage, 
  getOrders, 
  INITIAL_ESSENTIAL_KIT 
} from './firebase.js';
import { formatCurrency, formatDate, calculateDiscount, showToast, generateSku, generateProductId } from './utils.js';

/**
 * Initialize Admin Overview Dashboard (admin/index.html)
 */
export async function initAdminDashboard() {
  const mProducts = document.getElementById('metric-total-products');
  const mActive = document.getElementById('metric-active-products');
  const mOrders = document.getElementById('metric-total-orders');
  const mPending = document.getElementById('metric-pending-orders');
  const mCompleted = document.getElementById('metric-completed-orders');
  const mSales = document.getElementById('metric-total-sales');
  const recentOrdersTable = document.getElementById('recent-orders-table-body');

  try {
    const metrics = await getDashboardMetrics();
    
    if (mProducts) mProducts.textContent = metrics.totalProducts;
    if (mActive) mActive.textContent = metrics.activeProducts;
    if (mOrders) mOrders.textContent = metrics.totalOrders;
    if (mPending) mPending.textContent = metrics.pendingOrders;
    if (mCompleted) mCompleted.textContent = metrics.completedOrders;
    if (mSales) mSales.textContent = formatCurrency(metrics.totalSales);

    if (recentOrdersTable) {
      const orders = await getOrders();
      const recent = orders.slice(0, 5);

      if (recent.length === 0) {
        recentOrdersTable.innerHTML = `
          <tr>
            <td colspan="5" class="text-center py-4 text-muted-custom">
              No orders placed yet. Orders will appear here in real-time.
            </td>
          </tr>
        `;
      } else {
        recentOrdersTable.innerHTML = recent.map(o => `
          <tr>
            <td class="font-mono text-black fw-bold">${o.orderId}</td>
            <td class="text-black">${o.customer?.name || 'Customer'}</td>
            <td class="small text-dark">${formatDate(o.createdAt)}</td>
            <td class="font-mono text-accent fw-bold">${formatCurrency(o.total)}</td>
            <td>
              <span class="badge-status ${o.orderStatus === 'Delivered' ? 'status-delivered' : 'status-pending'}">
                ${o.orderStatus}
              </span>
            </td>
          </tr>
        `).join('');
      }
    }
  } catch (err) {
    console.error('Error loading dashboard stats:', err);
  }
}

let cachedProducts = [];

/**
 * ==========================================================================
 * PRODUCTS MANAGEMENT PAGE LOGIC
 * ==========================================================================
 */
export async function initAdminProductsPage() {
  const tableBody = document.getElementById('admin-products-table-body');
  const searchInput = document.getElementById('admin-products-search');
  const categoryFilter = document.getElementById('admin-products-category-filter');
  const addProductBtn = document.getElementById('admin-add-product-btn');
  const totalCountBadge = document.getElementById('admin-products-count');

  let allProducts = [];
  let editingProductId = null;

  async function loadProducts() {
    if (!tableBody) return;
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="text-center py-4">
          <div class="spinner-border text-accent spinner-border-sm"></div> Accessing Catalog...
        </td>
      </tr>
    `;

    try {
      allProducts = await getProducts({ activeOnly: false });
      renderProductRows();
    } catch (e) {
      console.error('Error fetching admin products:', e);
      tableBody.innerHTML = `<tr><td colspan="8" class="text-center py-4 text-danger">Failed to load products.</td></tr>`;
    }
  }

  function renderProductRows() {
    let filtered = [...allProducts];
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const cat = categoryFilter ? categoryFilter.value : 'ALL';

    if (cat !== 'ALL') {
      filtered = filtered.filter(p => matchesCategory(p, cat));
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        (p.name || '').toLowerCase().includes(searchTerm) ||
        (p.sku || '').toLowerCase().includes(searchTerm) ||
        (p.category || '').toLowerCase().includes(searchTerm) ||
        (Array.isArray(p.categories) && p.categories.some(c => c.toLowerCase().includes(searchTerm)))
      );
    }

    if (totalCountBadge) totalCountBadge.textContent = `${filtered.length} Product${filtered.length === 1 ? '' : 's'}`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-5 text-muted-custom">
            No products match the filter.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(p => {
      const img = (Array.isArray(p.images) && p.images.length > 0) ? p.images[0] : (p.image || 'images/product/essentials.png');
      const discount = p.discount || calculateDiscount(p.price, p.compareAtPrice);
      const cats = getProductCategories(p);
      const catBadges = cats.map(c => `<span class="badge bg-white border text-dark me-1">${c}</span>`).join('');

      return `
        <tr data-id="${p.id}">
          <td>
            <div class="d-flex align-items-center gap-3">
              <img src="${img}" alt="${p.name}" class="rounded bg-surface-custom p-1 border border-secondary border-opacity-25" style="width: 48px; height: 48px; object-fit: contain;">
              <div>
                <div class="font-heading fw-bold text-black">${p.name}</div>
                <div class="text-muted-custom font-mono" style="font-size: 0.72rem;">SKU: ${p.sku || 'N/A'}</div>
              </div>
            </div>
          </td>
          <td>${catBadges}</td>
          <td class="font-mono text-black fw-bold">
            ${formatCurrency(p.price)}
            ${p.compareAtPrice > p.price ? `<div class="text-muted-custom text-decoration-line-through small">${formatCurrency(p.compareAtPrice)}</div>` : ''}
          </td>
          <td>
            <span class="badge ${p.stock > 10 ? 'bg-success bg-opacity-25 text-success' : p.stock > 0 ? 'bg-warning bg-opacity-25 text-warning' : 'bg-danger bg-opacity-25 text-danger'}">
              ${p.stock} Units
            </span>
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input form-check-input-custom toggle-active-switch" type="checkbox" data-id="${p.id}" ${p.active !== false ? 'checked' : ''}>
            </div>
          </td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input form-check-input-custom toggle-featured-switch" type="checkbox" data-id="${p.id}" ${p.featured ? 'checked' : ''}>
            </div>
          </td>
          <td>
            <div class="d-flex gap-2">
              <button class="btn btn-x-outline btn-sm edit-product-btn" data-id="${p.id}" title="Edit Product">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button class="btn btn-x-outline btn-sm text-danger border-danger border-opacity-25 delete-product-btn" data-id="${p.id}" title="Delete Product">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Row Event Listeners
    tableBody.querySelectorAll('.toggle-active-switch').forEach(sw => {
      sw.addEventListener('change', async () => {
        const id = sw.getAttribute('data-id');
        const isActive = sw.checked;
        try {
          await updateProduct(id, { active: isActive });
          showToast(`Product visibility ${isActive ? 'activated' : 'deactivated'}.`, 'success');
        } catch (e) {
          showToast('Failed to update status in database.', 'error');
          sw.checked = !isActive;
        }
      });
    });

    tableBody.querySelectorAll('.toggle-featured-switch').forEach(sw => {
      sw.addEventListener('change', async () => {
        const id = sw.getAttribute('data-id');
        const isFeatured = sw.checked;
        try {
          await updateProduct(id, { featured: isFeatured });
          showToast(`Featured status updated.`, 'success');
        } catch (e) {
          showToast('Failed to update featured flag.', 'error');
          sw.checked = !isFeatured;
        }
      });
    });

    tableBody.querySelectorAll('.edit-product-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const prod = allProducts.find(p => p.id === id);
        if (prod) openProductModal(prod);
      });
    });

    tableBody.querySelectorAll('.delete-product-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this product from Firestore?')) {
          try {
            await deleteProduct(id);
            showToast('Product removed from catalog.', 'info');
            loadProducts();
          } catch (e) {
            showToast('Failed to delete product.', 'error');
          }
        }
      });
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderProductRows);
  if (categoryFilter) categoryFilter.addEventListener('change', renderProductRows);
  if (addProductBtn) {
    addProductBtn.addEventListener('click', () => {
      openProductModal(null);
    });
  }

  loadProducts();

  /**
   * Open Add / Edit Product Modal
   */
  function openProductModal(product = null) {
    editingProductId = product ? product.id : null;
    let modalEl = document.getElementById('admin-product-modal');
    
    if (!modalEl) {
      const modalHtml = `
        <div class="modal fade" id="admin-product-modal" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content modal-content-custom">
              <div class="modal-header border-secondary border-opacity-25">
                <h5 class="modal-title font-heading text-black fw-bold" id="product-modal-title">PRODUCT SPECIFICATION</h5>
                <button type="button" class="btn-close-custom" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
              </div>
              <div class="modal-body p-4">
                <form id="admin-product-form">
                  <div class="row g-3">
                    <div class="col-md-12">
                      <label class="form-label font-heading text-black small fw-bold">PRODUCT NAME *</label>
                      <input type="text" id="p-name" class="form-control form-control-custom" required placeholder="e.g. XORONIQ Ultra Ceramic Spray">
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">APPLICABLE CATEGORIES (SELECT ALL THAT APPLY) *</label>
                      <div class="d-flex flex-wrap gap-3 p-3 bg-surface-custom border border-secondary border-opacity-25 rounded-3" id="p-categories-container">
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-car" value="CAR CARE">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-car"><i class="bi bi-car-front text-accent me-1"></i> Car Care</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-bike" value="BIKE CARE">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-bike"><i class="bi bi-bicycle text-accent me-1"></i> Bike Care</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-kits" value="KITS">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-kits"><i class="bi bi-box-seam text-accent me-1"></i> Detailing Kits</label>
                        </div>
                        <div class="form-check m-0">
                          <input class="form-check-input form-check-input-custom p-category-cb" type="checkbox" id="cat-accessories" value="ACCESSORIES">
                          <label class="form-check-label small fw-bold text-black ms-2 cursor-pointer" for="cat-accessories"><i class="bi bi-tools text-accent me-1"></i> Accessories & Towels</label>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">PRICE (₹) *</label>
                      <input type="number" id="p-price" class="form-control form-control-custom" required min="0" placeholder="1199">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">COMPARE PRICE (₹)</label>
                      <input type="number" id="p-compare-price" class="form-control form-control-custom" min="0" placeholder="1499">
                    </div>
                    <div class="col-md-4">
                      <label class="form-label font-heading text-black small fw-bold">STOCK UNITS *</label>
                      <input type="number" id="p-stock" class="form-control form-control-custom" required min="0" value="50">
                    </div>

                    <div class="col-md-6">
                      <label class="form-label font-heading text-black small fw-bold d-flex justify-content-between">
                        <span>SKU CODE *</span>
                        <span class="text-accent small cursor-pointer" id="btn-auto-sku" style="cursor: pointer;" title="Auto-generate SKU"><i class="bi bi-magic me-1"></i> Auto-Generate</span>
                      </label>
                      <div class="input-group">
                        <input type="text" id="p-sku" class="form-control form-control-custom" placeholder="e.g. XOR-CB-4892" required>
                        <button class="btn btn-x-outline-accent btn-sm px-3" type="button" id="btn-regen-sku" title="Generate New SKU">
                          <i class="bi bi-arrow-repeat"></i>
                        </button>
                      </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-center mt-4">
                      <div class="form-check form-switch">
                        <input class="form-check-input form-check-input-custom" type="checkbox" id="p-active" checked>
                        <label class="form-check-label text-dark small fw-bold ms-2">Active</label>
                      </div>
                    </div>
                    <div class="col-md-3 d-flex align-items-center mt-4">
                      <div class="form-check form-switch">
                        <input class="form-check-input form-check-input-custom" type="checkbox" id="p-featured">
                        <label class="form-check-label text-dark small fw-bold ms-2">Featured</label>
                      </div>
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">SHORT HEADLINE DESCRIPTION</label>
                      <input type="text" id="p-short-desc" class="form-control form-control-custom" placeholder="Ultra-hydrophobic ceramic barrier for deep gloss.">
                    </div>

                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">FULL PRODUCT DESCRIPTION</label>
                      <textarea id="p-desc" class="form-control form-control-custom" rows="3" placeholder="Engineered with SiO2 nanoparticles..."></textarea>
                    </div>

                    <!-- Image Upload or URL Input -->
                    <div class="col-12">
                      <label class="form-label font-heading text-black small fw-bold">PRODUCT IMAGE</label>
                      <div class="row g-2 align-items-center">
                        <div class="col-md-7">
                          <input type="file" id="p-image-file" class="form-control form-control-custom" accept="image/*">
                        </div>
                        <div class="col-md-5">
                          <input type="text" id="p-image-url" class="form-control form-control-custom" placeholder="Or enter Image URL">
                        </div>
                      </div>
                      <div class="mt-2 text-center" id="p-preview-container">
                        <img id="p-image-preview" src="images/product/essentials.png" class="upload-preview-img" alt="Preview">
                      </div>
                    </div>
                  </div>

                  <div class="d-flex justify-content-end gap-3 mt-4 pt-3 border-top border-secondary border-opacity-25">
                    <button type="button" class="btn btn-x-outline btn-sm" data-bs-dismiss="modal">CANCEL</button>
                    <button type="submit" class="btn btn-x-primary btn-sm" id="p-save-btn">
                      <i class="bi bi-cloud-check-fill me-1"></i> SAVE TO FIRESTORE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHtml);
      modalEl = document.getElementById('admin-product-modal');

      // Setup Image Preview handlers
      const fileInput = document.getElementById('p-image-file');
      const previewImg = document.getElementById('p-image-preview');

      if (fileInput) {
        fileInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
              previewImg.src = evt.target.result;
            };
            reader.readAsDataURL(file);
          }
        });
      }

      // Helper to get checked categories
      const getSelectedCategories = () => {
        const checked = Array.from(document.querySelectorAll('.p-category-cb:checked')).map(cb => cb.value);
        return checked.length > 0 ? checked : ['CAR CARE'];
      };

      // Setup Auto-SKU Generator buttons
      const btnAutoSku = document.getElementById('btn-auto-sku');
      const btnRegenSku = document.getElementById('btn-regen-sku');
      const skuInput = document.getElementById('p-sku');
      const nameInput = document.getElementById('p-name');

      const triggerAutoSku = () => {
        const cats = getSelectedCategories();
        const name = nameInput ? nameInput.value : '';
        if (skuInput) {
          skuInput.value = generateSku(cats, name);
          showToast(`Generated SKU: ${skuInput.value}`, 'info');
        }
      };

      if (btnAutoSku) btnAutoSku.addEventListener('click', triggerAutoSku);
      if (btnRegenSku) btnRegenSku.addEventListener('click', triggerAutoSku);

      document.querySelectorAll('.p-category-cb').forEach(cb => {
        cb.addEventListener('change', () => {
          if (!editingProductId && skuInput && (!skuInput.value || skuInput.value.startsWith('XOR-'))) {
            skuInput.value = generateSku(getSelectedCategories(), nameInput ? nameInput.value : '');
          }
        });
      });
    }

    const modalTitle = document.getElementById('product-modal-title');
    const form = document.getElementById('admin-product-form');
    const nameInp = document.getElementById('p-name');
    const priceInp = document.getElementById('p-price');
    const compPriceInp = document.getElementById('p-compare-price');
    const stockInp = document.getElementById('p-stock');
    const skuInp = document.getElementById('p-sku');
    const activeInp = document.getElementById('p-active');
    const featuredInp = document.getElementById('p-featured');
    const shortDescInp = document.getElementById('p-short-desc');
    const descInp = document.getElementById('p-desc');
    const urlInp = document.getElementById('p-image-url');
    const previewImg = document.getElementById('p-image-preview');

    const getSelectedCategories = () => {
      const checked = Array.from(document.querySelectorAll('.p-category-cb:checked')).map(cb => cb.value);
      return checked.length > 0 ? checked : ['CAR CARE'];
    };

    if (product) {
      modalTitle.textContent = `EDIT: ${product.name.toUpperCase()}`;
      nameInp.value = product.name || '';
      
      const selectedCats = getProductCategories(product);
      document.querySelectorAll('.p-category-cb').forEach(cb => {
        cb.checked = selectedCats.some(c => 
          c === cb.value || 
          (c.includes('CAR') && cb.value === 'CAR CARE') || 
          (c.includes('BIKE') && cb.value === 'BIKE CARE') || 
          (c.includes('KIT') && cb.value === 'KITS') || 
          (c.includes('ACC') && cb.value === 'ACCESSORIES')
        );
      });

      priceInp.value = product.price || '';
      compPriceInp.value = product.compareAtPrice || '';
      stockInp.value = product.stock !== undefined ? product.stock : 50;
      skuInp.value = product.sku || '';
      activeInp.checked = product.active !== false;
      featuredInp.checked = Boolean(product.featured);
      shortDescInp.value = product.shortDescription || '';
      descInp.value = product.description || '';
      
      const currentImg = (Array.isArray(product.images) && product.images.length > 0) ? product.images[0] : (product.image || 'images/product/essentials.png');
      urlInp.value = currentImg;
      previewImg.src = currentImg;
    } else {
      modalTitle.textContent = 'ADD NEW PRODUCT TO FIRESTORE';
      form.reset();
      activeInp.checked = true;
      featuredInp.checked = false;
      
      // Default to both Car and Bike care
      document.querySelectorAll('.p-category-cb').forEach(cb => {
        cb.checked = cb.value === 'CAR CARE' || cb.value === 'BIKE CARE';
      });

      skuInp.value = generateSku(getSelectedCategories(), nameInp.value);
      previewImg.src = 'images/product/essentials.png';
    }

    const bsModal = new window.bootstrap.Modal(modalEl);
    bsModal.show();

    form.onsubmit = async (e) => {
      e.preventDefault();
      const saveBtn = document.getElementById('p-save-btn');
      saveBtn.disabled = true;
      saveBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> UPLOADING...`;

      try {
        let imageUrl = urlInp.value.trim() || 'images/product/essentials.png';
        const fileInput = document.getElementById('p-image-file');
        
        // If an image file is selected, upload to Firebase Storage
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          try {
            imageUrl = await uploadProductImage(file, `products/${Date.now()}_${file.name}`);
          } catch (uploadErr) {
            console.warn('Storage upload error, using local/preview URL:', uploadErr);
          }
        }

        const selectedCategories = getSelectedCategories();
        const primaryCategory = formatCategoryBadge({ categories: selectedCategories });

        const productPayload = {
          name: nameInp.value.trim(),
          category: primaryCategory,
          categories: selectedCategories,
          price: parseFloat(priceInp.value) || 0,
          compareAtPrice: parseFloat(compPriceInp.value) || 0,
          stock: parseInt(stockInp.value) || 0,
          sku: skuInp.value.trim() || generateSku(selectedCategories, nameInp.value),
          active: activeInp.checked,
          featured: featuredInp.checked,
          shortDescription: shortDescInp.value.trim(),
          description: descInp.value.trim(),
          images: [imageUrl]
        };

        if (editingProductId && editingProductId !== INITIAL_ESSENTIAL_KIT.id) {
          await updateProduct(editingProductId, productPayload);
          showToast('Product updated successfully in Firestore.', 'success');
        } else {
          await addProduct(productPayload);
          showToast('New product added to Firestore & Live Storefront.', 'success');
        }

        bsModal.hide();
        loadProducts();
      } catch (err) {
        console.error('Error saving product:', err);
        showToast('Failed to save product to database.', 'error');
      } finally {
        saveBtn.disabled = false;
        saveBtn.innerHTML = `<i class="bi bi-cloud-check-fill me-1"></i> SAVE TO FIRESTORE`;
      }
    };
  }
}
