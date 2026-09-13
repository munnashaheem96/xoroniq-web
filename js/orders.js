// ==========================================================================
// XORONIQ CAR CARE - ORDER MANAGEMENT & TRACKING ENGINE
// Customer Live Status Timeline & Admin Order Fulfillment
// ==========================================================================

import { getOrderById, searchOrders, getOrders, updateOrderStatus } from './firebase.js';
import { formatCurrency, formatDate, showToast } from './utils.js';
import {
  exportOrdersToCSV,
  getGoogleSheetsWebhookUrl,
  setGoogleSheetsWebhookUrl,
  sendOrderToGoogleSheets
} from './sheets.js';

/**
 * Initialize Customer Order Tracking Page (tracking.html)
 */
export function initTrackingPage() {
  const form = document.getElementById('tracking-search-form');
  const input = document.getElementById('tracking-search-input');
  const resultContainer = document.getElementById('tracking-result-container');

  // Check if orderId is in URL query
  const urlParams = new URLSearchParams(window.location.search);
  const paramOrderId = urlParams.get('orderId');
  if (paramOrderId && input) {
    input.value = paramOrderId;
    executeTrackingSearch(paramOrderId);
  }

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = input.value.trim();
      if (!term) {
        showToast('Please enter an Order ID or Phone number.', 'warning');
        return;
      }
      executeTrackingSearch(term);
    });
  }

  async function executeTrackingSearch(term) {
    if (!resultContainer) return;

    resultContainer.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-accent mb-3"></div>
        <p class="font-heading small letter-spacing-wide text-muted-custom">LOCATING YOUR XORONIQ SHIPMENT...</p>
      </div>
    `;

    try {
      let order = await getOrderById(term);
      if (!order) {
        const results = await searchOrders(term);
        if (results.length > 0) order = results[0];
      }

      if (!order) {
        resultContainer.innerHTML = `
          <div class="admin-card p-4 p-md-5 text-center">
            <i class="bi bi-search text-muted-custom display-4 mb-3"></i>
            <h4 class="font-heading text-black fw-bold">ORDER NOT FOUND</h4>
            <p class="text-muted-custom small mb-4">No order matched "<strong>${term}</strong>". Please verify your Order ID or mobile number.</p>
            <a href="contact.html" class="btn btn-x-outline-accent btn-sm">CONTACT CONCIERGE</a>
          </div>
        `;
        return;
      }

      renderOrderTimeline(order);
    } catch (e) {
      console.error('Error tracking order:', e);
      resultContainer.innerHTML = `<p class="text-danger text-center">Failed to fetch order tracking status.</p>`;
    }
  }

  function renderOrderTimeline(order) {
    const statuses = [
      'Order Placed',
      'Payment Confirmed',
      'Processing',
      'Shipped',
      'Delivered'
    ];

    const currentStatus = order.orderStatus || 'Payment Confirmed';
    const currentIndex = statuses.indexOf(currentStatus) > -1 ? statuses.indexOf(currentStatus) : 1;

    resultContainer.innerHTML = `
      <div class="glass-panel-heavy p-4 p-md-5">
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 border-bottom border-secondary border-opacity-25 pb-4 mb-4">
          <div>
            <span class="section-tag mb-1">LIVE DISPATCH TRACKER</span>
            <h3 class="font-heading text-black fw-bold mb-0">ORDER #${order.orderId}</h3>
            <div class="text-muted-custom small mt-1">Placed on ${formatDate(order.createdAt)}</div>
          </div>
          <div>
            <span class="badge-status status-shipped fs-6 py-2 px-3">
              <i class="bi bi-geo-alt-fill me-1"></i> STATUS: ${currentStatus.toUpperCase()}
            </span>
          </div>
        </div>

        <!-- Animated Steps Timeline -->
        <div class="py-4">
          <div class="position-relative">
            <div class="row text-center g-3">
              ${statuses.map((step, idx) => {
                const isDone = idx < currentIndex;
                const isCurrent = idx === currentIndex;
                let stepClass = 'opacity-50';
                let icon = 'bi-circle';
                let iconColor = 'text-muted-custom';

                if (isDone) {
                  stepClass = 'opacity-100';
                  icon = 'bi-check-circle-fill';
                  iconColor = 'text-success';
                } else if (isCurrent) {
                  stepClass = 'opacity-100';
                  icon = 'bi-record-circle-fill';
                  iconColor = 'text-accent';
                }

                return `
                  <div class="col ${stepClass}">
                    <div class="fs-2 ${iconColor} mb-2">
                      <i class="bi ${icon}"></i>
                    </div>
                    <div class="font-heading fw-bold small text-black">${step.toUpperCase()}</div>
                    <div class="text-muted-custom" style="font-size: 0.7rem;">${isDone ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}</div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Order Summary & Shipping Address -->
        <div class="row g-4 mt-4 pt-4 border-top border-secondary border-opacity-25">
          <div class="col-md-6">
            <h5 class="font-heading text-black fw-bold mb-3">DESTINATION</h5>
            <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
              <div class="fw-bold text-black mb-1">${order.customer?.name || 'Valued Enthusiast'}</div>
              <div class="text-dark">${order.shippingAddress?.address || ''}</div>
              <div class="text-dark">${order.shippingAddress?.city || ''}, ${order.shippingAddress?.state || ''} - ${order.shippingAddress?.pincode || ''}</div>
              <div class="text-muted-custom mt-2">Phone: ${order.customer?.phone || 'N/A'}</div>
            </div>
          </div>

          <div class="col-md-6">
            <h5 class="font-heading text-black fw-bold mb-3">ITEMS ORDERED</h5>
            <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
              ${(order.items || []).map(item => `
                <div class="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10">
                  <span class="text-black">${item.name} <span class="text-muted-custom">x${item.quantity}</span></span>
                  <span class="font-mono text-accent">${formatCurrency(item.price * item.quantity)}</span>
                </div>
              `).join('')}
              <div class="d-flex justify-content-between pt-2 fw-bold text-black font-heading">
                <span>TOTAL PAID</span>
                <span class="text-accent">${formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

/**
 * Initialize Admin Orders Page (admin/orders.html)
 */
export async function initAdminOrdersPage() {
  const tableBody = document.getElementById('admin-orders-table-body');
  const searchInput = document.getElementById('admin-orders-search');
  const statusFilter = document.getElementById('admin-orders-filter');
  const totalCountBadge = document.getElementById('admin-orders-count');

  if (!tableBody) return;

  let allOrders = [];

  async function loadOrders() {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-4">
          <div class="spinner-border text-accent spinner-border-sm"></div> Loading orders...
        </td>
      </tr>
    `;

    try {
      allOrders = await getOrders();
      renderOrdersList();
    } catch (e) {
      console.error('Error fetching admin orders:', e);
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-danger">Failed to load orders.</td></tr>`;
    }
  }

  function renderOrdersList() {
    let filtered = [...allOrders];
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value : 'ALL';

    if (status !== 'ALL') {
      filtered = filtered.filter(o => o.orderStatus === status);
    }

    if (searchTerm) {
      filtered = filtered.filter(o => 
        (o.orderId || '').toLowerCase().includes(searchTerm) ||
        (o.customer?.name || '').toLowerCase().includes(searchTerm) ||
        (o.customer?.phone || '').includes(searchTerm) ||
        (o.customer?.email || '').toLowerCase().includes(searchTerm)
      );
    }

    if (totalCountBadge) totalCountBadge.textContent = `${filtered.length} Orders`;

    if (filtered.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center py-5 text-muted-custom">
            No orders found matching criteria.
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = filtered.map(order => {
      let badgeClass = 'status-pending';
      if (order.orderStatus === 'Delivered') badgeClass = 'status-delivered';
      if (order.orderStatus === 'Shipped') badgeClass = 'status-shipped';
      if (order.orderStatus === 'Cancelled') badgeClass = 'status-cancelled';

      return `
        <tr data-id="${order.id}">
          <td class="font-mono text-black fw-bold">${order.orderId}</td>
          <td>
            <div class="text-black fw-semibold">${order.customer?.name || 'N/A'}</div>
            <div class="text-muted-custom small">${order.customer?.phone || ''}</div>
          </td>
          <td class="small text-dark">${formatDate(order.createdAt)}</td>
          <td>
            <span class="badge bg-white border text-dark">
              ${(order.items || []).length} items
            </span>
          </td>
          <td class="font-mono text-accent fw-bold">${formatCurrency(order.total)}</td>
          <td>
            <select class="form-select form-select-sm bg-white text-dark border order-status-select" data-id="${order.id}">
              <option value="Payment Confirmed" ${order.orderStatus === 'Payment Confirmed' ? 'selected' : ''}>Payment Confirmed</option>
              <option value="Processing" ${order.orderStatus === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Shipped" ${order.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
              <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
              <option value="Cancelled" ${order.orderStatus === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
            </select>
          </td>
          <td>
            <div class="d-flex align-items-center gap-1">
              <button class="btn btn-x-outline btn-sm view-order-modal-btn" data-id="${order.id}" title="View Full Order Details">
                <i class="bi bi-eye me-1"></i> Details
              </button>
              <button class="btn btn-x-outline btn-sm sync-order-sheet-btn" data-id="${order.id}" title="Push this order to Google Sheet">
                <i class="bi bi-file-earmark-spreadsheet text-success"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Status Select change listeners
    tableBody.querySelectorAll('.order-status-select').forEach(select => {
      select.addEventListener('change', async (e) => {
        const id = select.getAttribute('data-id');
        const newStatus = e.target.value;
        try {
          await updateOrderStatus(id, newStatus);
          showToast(`Order status updated to ${newStatus}`, 'success');
        } catch (err) {
          showToast('Failed to update status', 'error');
        }
      });
    });

    // Attach Details modal listeners
    tableBody.querySelectorAll('.view-order-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const order = allOrders.find(o => o.id === id);
        if (order) openAdminOrderModal(order);
      });
    });

    // Attach individual Google Sheet sync listeners
    tableBody.querySelectorAll('.sync-order-sheet-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const order = allOrders.find(o => o.id === id);
        if (!order) return;

        const originalHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm"></span>`;

        try {
          const res = await sendOrderToGoogleSheets(order);
          if (res.queued) {
            showToast(`Order queued! Configure your Google Sheets Webhook URL to complete sync.`, 'warning');
          } else {
            showToast(`Order ${order.orderId} dispatched to Google Sheets!`, 'success');
          }
        } catch (err) {
          showToast('Failed to sync to Google Sheets: ' + err.message, 'error');
        } finally {
          btn.disabled = false;
          btn.innerHTML = originalHtml;
        }
      });
    });
  }

  if (searchInput) searchInput.addEventListener('input', renderOrdersList);
  if (statusFilter) statusFilter.addEventListener('change', renderOrdersList);

  // -------------------------------------------------------------
  // Google Sheets & CSV Controls
  // -------------------------------------------------------------
  const exportCsvBtn = document.getElementById('export-orders-csv-btn');
  const exportCsvModalBtn = document.getElementById('download-orders-csv-modal-btn');
  const handleExportCsv = () => {
    if (!allOrders || allOrders.length === 0) {
      showToast('No orders available to export.', 'warning');
      return;
    }
    try {
      exportOrdersToCSV(allOrders);
      showToast(`Exported ${allOrders.length} orders to CSV successfully!`, 'success');
    } catch (err) {
      showToast(err.message || 'Export failed', 'error');
    }
  };
  if (exportCsvBtn) exportCsvBtn.addEventListener('click', handleExportCsv);
  if (exportCsvModalBtn) exportCsvModalBtn.addEventListener('click', handleExportCsv);

  const urlInput = document.getElementById('sheets-webhook-url-input');
  const saveUrlBtn = document.getElementById('save-sheets-url-btn');
  const statusText = document.getElementById('sheets-url-status-text');
  const testConnBtn = document.getElementById('test-sheets-connection-btn');
  const syncAllBtn = document.getElementById('sync-all-orders-btn');
  const feedbackEl = document.getElementById('sheets-action-feedback');

  function updateSheetsStatusBadge() {
    const activeUrl = getGoogleSheetsWebhookUrl();
    if (urlInput) urlInput.value = activeUrl || '';
    if (statusText) {
      if (activeUrl) {
        statusText.innerHTML = `<span class="badge bg-success text-white"><i class="bi bi-check-circle-fill me-1"></i> Active Webhook Connected</span> <span class="text-muted-custom small ms-2">All incoming orders automatically append to your Google Sheet</span>`;
      } else {
        statusText.innerHTML = `<span class="badge bg-secondary"><i class="bi bi-exclamation-triangle-fill me-1"></i> Not Configured</span> <span class="text-muted-custom small ms-2">Paste your Google Apps Script Webhook URL above</span>`;
      }
    }
  }

  updateSheetsStatusBadge();

  if (saveUrlBtn && urlInput) {
    saveUrlBtn.addEventListener('click', () => {
      const val = urlInput.value.trim();
      if (val && !val.startsWith('https://script.google.com/')) {
        showToast('Please enter a valid Google Apps Script URL starting with https://script.google.com/', 'warning');
        return;
      }
      setGoogleSheetsWebhookUrl(val);
      updateSheetsStatusBadge();
      showToast(val ? 'Google Sheets Webhook URL saved successfully!' : 'Google Sheets Webhook URL cleared.', 'success');
    });
  }

  if (testConnBtn) {
    testConnBtn.addEventListener('click', async () => {
      const webhook = getGoogleSheetsWebhookUrl();
      if (!webhook) {
        showToast('Please enter and save a Webhook URL first.', 'warning');
        return;
      }
      testConnBtn.disabled = true;
      testConnBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Sending Test...`;
      try {
        const testOrder = {
          orderId: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
          orderStatus: 'Test Verified',
          customer: { name: 'XORONIQ Test User', email: 'test@xoroniq.store', phone: '9999999999' },
          shippingAddress: { address: 'Test Detailing Bay, Near NH 66', city: 'Malappuram', state: 'Kerala', pincode: '676306', country: 'India' },
          items: [{ name: 'XORONIQ Essential Kit (Test)', quantity: 1, price: 1199, sku: 'XOR-KIT-ESS-TEST' }],
          subtotal: 1199,
          shipping: 0,
          total: 1199,
          payment: { method: 'TEST', razorpayPaymentId: 'test_pay_' + Date.now() }
        };
        await sendOrderToGoogleSheets(testOrder);
        showToast('Test order row dispatched to your Google Sheet!', 'success');
        if (feedbackEl) {
          feedbackEl.innerHTML = `<div class="alert alert-success py-2 px-3 small mb-0"><i class="bi bi-check-circle-fill me-1"></i> Test order row successfully dispatched! Check the "Orders" sheet in your Google Spreadsheet.</div>`;
          feedbackEl.style.display = 'block';
        }
      } catch (err) {
        showToast('Error dispatching test order: ' + err.message, 'error');
      } finally {
        testConnBtn.disabled = false;
        testConnBtn.innerHTML = `<i class="bi bi-lightning-charge me-1"></i> Send Test Row`;
      }
    });
  }

  if (syncAllBtn) {
    syncAllBtn.addEventListener('click', async () => {
      const webhook = getGoogleSheetsWebhookUrl();
      if (!webhook) {
        showToast('Please enter and save a Webhook URL first.', 'warning');
        return;
      }
      if (!allOrders || allOrders.length === 0) {
        showToast('No orders found to sync.', 'warning');
        return;
      }
      syncAllBtn.disabled = true;
      syncAllBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Syncing Orders (0/${allOrders.length})...`;
      let count = 0;
      for (let i = 0; i < allOrders.length; i++) {
        try {
          await sendOrderToGoogleSheets(allOrders[i]);
          count++;
          syncAllBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Syncing Orders (${count}/${allOrders.length})...`;
        } catch (e) {
          console.warn('Sync order item error:', e);
        }
      }
      syncAllBtn.disabled = false;
      syncAllBtn.innerHTML = `<i class="bi bi-cloud-arrow-up me-1"></i> Sync All Existing Orders to Sheets`;
      showToast(`Successfully synced ${count} orders to Google Sheets!`, 'success');
      if (feedbackEl) {
        feedbackEl.innerHTML = `<div class="alert alert-success py-2 px-3 small mb-0"><i class="bi bi-check-circle-fill me-1"></i> Successfully synced ${count} orders into your Google Sheet!</div>`;
        feedbackEl.style.display = 'block';
      }
    });
  }

  loadOrders();
}

/**
 * Open Detailed Order Modal for Admin
 */
function openAdminOrderModal(order) {
  let modalEl = document.getElementById('admin-order-modal');
  if (!modalEl) {
    const modalHtml = `
      <div class="modal fade" id="admin-order-modal" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content modal-content-custom">
            <div class="modal-header border-secondary border-opacity-25">
              <h5 class="modal-title font-heading text-black fw-bold" id="admin-order-modal-title">ORDER DETAILS</h5>
              <button type="button" class="btn-close-custom" data-bs-dismiss="modal"><i class="bi bi-x-lg"></i></button>
            </div>
            <div class="modal-body p-4" id="admin-order-modal-body"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalEl = document.getElementById('admin-order-modal');
  }

  const modalBody = document.getElementById('admin-order-modal-body');
  modalBody.innerHTML = `
    <div class="row g-4 mb-4">
      <div class="col-md-6">
        <h6 class="font-heading text-black fw-bold mb-2">CUSTOMER CONTACT</h6>
        <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
          <div><strong>Name:</strong> ${order.customer?.name}</div>
          <div><strong>Email:</strong> ${order.customer?.email}</div>
          <div><strong>Phone:</strong> ${order.customer?.phone}</div>
        </div>
      </div>
      <div class="col-md-6">
        <h6 class="font-heading text-black fw-bold mb-2">SHIPPING ADDRESS</h6>
        <div class="p-3 bg-surface-custom rounded border border-secondary border-opacity-25 small">
          <div>${order.shippingAddress?.address}</div>
          <div>${order.shippingAddress?.city}, ${order.shippingAddress?.state} - ${order.shippingAddress?.pincode}</div>
          <div>${order.shippingAddress?.country || 'India'}</div>
        </div>
      </div>
    </div>

    <h6 class="font-heading text-black fw-bold mb-2">ORDERED ITEMS</h6>
    <div class="table-responsive mb-4">
      <table class="table-custom-dark w-100">
        <thead>
          <tr>
            <th>Product</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${(order.items || []).map(item => `
            <tr>
              <td>
                <div class="d-flex align-items-center gap-2">
                  <img src="${item.image}" alt="${item.name}" class="rounded" style="width: 35px; height: 35px; object-fit: contain;">
                  <span class="text-black fw-semibold">${item.name}</span>
                </div>
              </td>
              <td class="text-muted-custom font-mono small">${item.sku || 'N/A'}</td>
              <td>${formatCurrency(item.price)}</td>
              <td>${item.quantity}</td>
              <td class="font-mono text-accent fw-bold">${formatCurrency(item.price * item.quantity)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="d-flex flex-wrap justify-content-between align-items-center pt-3 border-top border-secondary border-opacity-25 font-heading gap-2">
      <div class="text-muted-custom">Payment ID: <span class="font-mono text-black">${order.payment?.razorpayPaymentId || 'N/A'}</span></div>
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-x-outline btn-sm font-sans" id="modal-push-sheet-btn">
          <i class="bi bi-file-earmark-spreadsheet text-success me-1"></i> Push to Google Sheet
        </button>
        <div class="fs-5 text-black">Grand Total: <span class="text-accent font-bold">${formatCurrency(order.total)}</span></div>
      </div>
    </div>
  `;

  const pushSheetBtn = modalBody.querySelector('#modal-push-sheet-btn');
  if (pushSheetBtn) {
    pushSheetBtn.addEventListener('click', async () => {
      pushSheetBtn.disabled = true;
      pushSheetBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Pushing...`;
      try {
        await sendOrderToGoogleSheets(order);
        showToast(`Order ${order.orderId} pushed to Google Sheets!`, 'success');
      } catch (e) {
        showToast('Sync error: ' + e.message, 'error');
      } finally {
        pushSheetBtn.disabled = false;
        pushSheetBtn.innerHTML = `<i class="bi bi-file-earmark-spreadsheet text-success me-1"></i> Push to Google Sheet`;
      }
    });
  }

  const bsModal = new window.bootstrap.Modal(modalEl);
  bsModal.show();
}
