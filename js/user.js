// ==========================================================================
// XORONIQ CAR CARE - USER AUTHENTICATION & PROFILE MODULE
// Customer login, signup, profile management, and navbar auth state
// ==========================================================================

import {
  onUserAuthChange,
  userSignIn,
  userSignUp,
  userGoogleSignIn,
  userSignOut,
  getUserProfile,
  saveUserProfile,
  sendUserPasswordReset,
  getUserOrders
} from './firebase.js';
import { showToast } from './utils.js';

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────

function getInitials(name) {
  if (!name) return '?';
  return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
}

function formatDate(dateVal) {
  if (!dateVal) return '—';
  const d = dateVal.toDate ? dateVal.toDate() : new Date(dateVal);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

// ─────────────────────────────────────────────────────────────
// NAVBAR: runs on every page
// ─────────────────────────────────────────────────────────────

export function initUserNavbar() {
  onUserAuthChange(async (user) => {
    const icons = document.querySelectorAll('.user-nav-icon-wrap');
    icons.forEach(wrap => {
      if (!user) {
        wrap.innerHTML = `
          <a href="auth.html" class="btn-icon user-nav-btn" title="Sign In / Register" id="user-nav-signin">
            <i class="bi bi-person"></i>
          </a>`;
      } else {
        const initials = getInitials(user.displayName || user.email);
        wrap.innerHTML = `
          <div class="user-nav-dropdown position-relative" id="user-nav-dropdown-wrap">
            <button class="btn-icon user-avatar-btn" title="${user.displayName || user.email}" id="user-avatar-btn">
              <span class="user-avatar-initials">${initials}</span>
            </button>
            <div class="user-nav-dropdown-menu" id="user-nav-menu" style="display:none;">
              <div class="user-nav-menu-header">
                <div class="user-avatar-initials-lg">${initials}</div>
                <div>
                  <div class="fw-700 text-main" style="font-size:.9rem;line-height:1.2;">${user.displayName || 'My Account'}</div>
                  <div style="font-size:.75rem;color:var(--x-text-muted);">${user.email}</div>
                </div>
              </div>
              <div class="user-nav-menu-divider"></div>
              <a href="profile.html" class="user-nav-menu-item"><i class="bi bi-person-circle me-2"></i>My Profile</a>
              <a href="profile.html#orders" class="user-nav-menu-item"><i class="bi bi-bag-check me-2"></i>My Orders</a>
              <div class="user-nav-menu-divider"></div>
              <button class="user-nav-menu-item text-danger user-signout-btn" id="user-signout-btn"><i class="bi bi-box-arrow-right me-2"></i>Sign Out</button>
            </div>
          </div>`;

        // Toggle dropdown
        const btn = wrap.querySelector('#user-avatar-btn');
        const menu = wrap.querySelector('#user-nav-menu');
        btn && btn.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
        });
        document.addEventListener('click', () => {
          if (menu) menu.style.display = 'none';
        }, { once: false });

        // Sign out
        const signoutBtn = wrap.querySelector('#user-signout-btn');
        signoutBtn && signoutBtn.addEventListener('click', async () => {
          await userSignOut();
          showToast('Signed out. See you soon!', 'info');
          setTimeout(() => location.reload(), 400);
        });
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────
// AUTH PAGE: login + signup tabs
// ─────────────────────────────────────────────────────────────

export function initAuthPage() {
  // Redirect if already logged in
  onUserAuthChange((user) => {
    if (user) window.location.href = 'profile.html';
  });

  const tabLogin = document.getElementById('auth-tab-login');
  const tabSignup = document.getElementById('auth-tab-signup');
  const panelLogin = document.getElementById('auth-panel-login');
  const panelSignup = document.getElementById('auth-panel-signup');

  function showTab(tab) {
    if (tab === 'login') {
      panelLogin.style.display = 'block';
      panelSignup.style.display = 'none';
      tabLogin.classList.add('active');
      tabSignup.classList.remove('active');
    } else {
      panelLogin.style.display = 'none';
      panelSignup.style.display = 'block';
      tabSignup.classList.add('active');
      tabLogin.classList.remove('active');
    }
  }

  tabLogin && tabLogin.addEventListener('click', () => showTab('login'));
  tabSignup && tabSignup.addEventListener('click', () => showTab('signup'));

  // Switch links inside panels
  document.querySelectorAll('[data-auth-switch]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showTab(el.dataset.authSwitch);
    });
  });

  // ── LOGIN FORM ──
  const loginForm = document.getElementById('login-form');
  loginForm && loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    if (!email || !password) { showToast('Please fill in all fields.', 'warning'); return; }
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>SIGNING IN...`;
    try {
      await userSignIn(email, password);
      showToast('Welcome back!', 'success');
      setTimeout(() => window.location.href = 'profile.html', 600);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = `SIGN IN <i class="bi bi-arrow-right ms-2"></i>`;
      let msg = 'Login failed. Check your email and password.';
      if (err.code === 'auth/user-not-found') msg = 'No account found with this email.';
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') msg = 'Incorrect email or password.';
      showToast(msg, 'error');
    }
  });

  // ── GOOGLE SIGN-IN ──
  document.querySelectorAll('.google-signin-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      try {
        await userGoogleSignIn();
        showToast('Signed in with Google!', 'success');
        setTimeout(() => window.location.href = 'profile.html', 600);
      } catch (err) {
        if (err.code !== 'auth/popup-closed-by-user') {
          showToast('Google sign-in failed. Please try again.', 'error');
        }
      }
    });
  });

  // ── FORGOT PASSWORD ──
  const forgotLink = document.getElementById('forgot-password-link');
  forgotLink && forgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    if (!email) { showToast('Enter your email above first.', 'warning'); return; }
    try {
      await sendUserPasswordReset(email);
      showToast(`Password reset link sent to ${email}`, 'success');
    } catch {
      showToast('Failed to send reset link.', 'error');
    }
  });

  // ── SIGNUP FORM ──
  const signupForm = document.getElementById('signup-form');
  signupForm && signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    const confirm = document.getElementById('signup-confirm').value;
    const phone = document.getElementById('signup-phone').value.trim();
    const city = document.getElementById('signup-city').value.trim();
    const vehicle = document.querySelector('input[name="vehicleType"]:checked')?.value || 'Car';
    const btn = document.getElementById('signup-btn');

    if (!name || !email || !password || !confirm) { showToast('Please fill in all required fields.', 'warning'); return; }
    if (password !== confirm) { showToast('Passwords do not match.', 'warning'); return; }
    if (password.length < 6) { showToast('Password must be at least 6 characters.', 'warning'); return; }

    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>CREATING ACCOUNT...`;
    try {
      await userSignUp(name, email, password, phone, city, vehicle);
      showToast('Account created! Welcome to XORONIQ.', 'success');
      setTimeout(() => window.location.href = 'profile.html', 700);
    } catch (err) {
      btn.disabled = false;
      btn.innerHTML = `CREATE ACCOUNT <i class="bi bi-arrow-right ms-2"></i>`;
      let msg = 'Sign up failed. Please try again.';
      if (err.code === 'auth/email-already-in-use') msg = 'This email is already registered. Try logging in.';
      if (err.code === 'auth/invalid-email') msg = 'Please enter a valid email address.';
      showToast(msg, 'error');
    }
  });
}

// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// PROFILE PAGE
// ─────────────────────────────────────────────────────────────

export async function initProfilePage() {
  onUserAuthChange(async (user) => {
    if (!user) {
      window.location.href = 'auth.html';
      return;
    }

    const profile = await getUserProfile(user.uid);
    const data = profile || {};

    // Avatar & header
    const initials = getInitials(user.displayName || data.name || user.email);
    const elAvatar = document.getElementById('profile-avatar');
    const elName = document.getElementById('profile-name');
    const elEmail = document.getElementById('profile-email');
    const elSince = document.getElementById('profile-since');
    const elGarageChip = document.getElementById('profile-garage-chip-text');

    if (elAvatar) elAvatar.textContent = initials;
    if (elName) elName.textContent = data.name || user.displayName || 'VIP Enthusiast';
    if (elEmail) elEmail.innerHTML = `<i class="bi bi-envelope me-1"></i> ${user.email}`;
    if (elSince) elSince.textContent = 'Member since ' + formatDate(user.metadata?.creationTime);

    // Vehicle Garage summary badge
    function updateGarageChipText() {
      if (elGarageChip) {
        if (data.vehicleModel) {
          elGarageChip.textContent = `${data.vehicleModel} • ${data.vehicleType || 'Car'}`;
        } else {
          elGarageChip.textContent = `${data.vehicleType || 'Car'} Enthusiast`;
        }
      }
    }
    updateGarageChipText();

    // ── TABS SWITCHING ──
    const tabButtons = document.querySelectorAll('.profile-nav-pill-btn');
    const panels = ['panel-orders', 'panel-garage', 'panel-address', 'panel-settings'];

    function switchTab(targetId) {
      tabButtons.forEach(btn => {
        if (btn.getAttribute('data-target') === targetId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      panels.forEach(pId => {
        const el = document.getElementById(pId);
        if (el) {
          el.style.display = pId === targetId ? 'block' : 'none';
        }
      });
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-target');
        switchTab(target);
      });
    });

    // Check hash in URL (e.g. #garage, #orders, #address, #settings)
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const matched = panels.find(p => p.includes(hash));
      if (matched) switchTab(matched);
    }

    // ── PREFILL FORMS ──
    // 1. Garage
    const garageModelInput = document.getElementById('garage-vehicle-model');
    const garageFinishInput = document.getElementById('garage-vehicle-finish');
    if (garageModelInput) garageModelInput.value = data.vehicleModel || '';
    if (garageFinishInput) garageFinishInput.value = data.vehicleFinish || '';
    const vType = data.vehicleType || 'Car';
    const vTypeRadio = document.querySelector(`input[name="garageVehicleType"][value="${vType}"]`);
    if (vTypeRadio) vTypeRadio.checked = true;

    // 2. Address
    const addressStreet = document.getElementById('address-street');
    const addressCity = document.getElementById('address-city');
    const addressState = document.getElementById('address-state');
    const addressPincode = document.getElementById('address-pincode');
    if (addressStreet) addressStreet.value = data.address || data.shippingAddress?.address || '';
    if (addressCity) addressCity.value = data.city || data.shippingAddress?.city || '';
    if (addressState) addressState.value = data.state || data.shippingAddress?.state || '';
    if (addressPincode) addressPincode.value = data.pincode || data.shippingAddress?.pincode || '';

    // 3. Settings
    const settingsName = document.getElementById('settings-name');
    const settingsPhone = document.getElementById('settings-phone');
    const settingsEmail = document.getElementById('settings-email');
    if (settingsName) settingsName.value = data.name || user.displayName || '';
    if (settingsPhone) settingsPhone.value = data.phone || '';
    if (settingsEmail) settingsEmail.value = user.email || '';

    // ── FORM 1: GARAGE SUBMIT ──
    const garageForm = document.getElementById('garage-edit-form');
    if (garageForm) {
      garageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveBtn = document.getElementById('garage-save-btn');
        if (saveBtn) {
          saveBtn.disabled = true;
          saveBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Updating Garage...`;
        }
        try {
          const selectedType = document.querySelector('input[name="garageVehicleType"]:checked')?.value || 'Car';
          const model = garageModelInput ? garageModelInput.value.trim() : '';
          const finish = garageFinishInput ? garageFinishInput.value.trim() : '';

          data.vehicleType = selectedType;
          data.vehicleModel = model;
          data.vehicleFinish = finish;
          data.updatedAt = new Date();

          await saveUserProfile(user.uid, {
            vehicleType: selectedType,
            vehicleModel: model,
            vehicleFinish: finish,
            updatedAt: new Date()
          });

          updateGarageChipText();
          showToast('Garage ride updated successfully!', 'success');
        } catch (err) {
          showToast('Failed to update garage details: ' + err.message, 'error');
        } finally {
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `<i class="bi bi-check2-circle me-1"></i> Update My Garage`;
          }
        }
      });
    }

    // ── FORM 2: ADDRESS SUBMIT ──
    const addressForm = document.getElementById('address-edit-form');
    if (addressForm) {
      addressForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveBtn = document.getElementById('address-save-btn');
        if (saveBtn) {
          saveBtn.disabled = true;
          saveBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Saving Address...`;
        }
        try {
          const street = addressStreet ? addressStreet.value.trim() : '';
          const city = addressCity ? addressCity.value.trim() : '';
          const state = addressState ? addressState.value.trim() : '';
          const pincode = addressPincode ? addressPincode.value.trim() : '';

          data.address = street;
          data.city = city;
          data.state = state;
          data.pincode = pincode;

          await saveUserProfile(user.uid, {
            address: street,
            city,
            state,
            pincode,
            shippingAddress: { address: street, city, state, pincode, country: 'India' },
            updatedAt: new Date()
          });

          showToast('Default delivery address saved!', 'success');
        } catch (err) {
          showToast('Failed to save address: ' + err.message, 'error');
        } finally {
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `<i class="bi bi-check2-circle me-1"></i> Save Default Address`;
          }
        }
      });
    }

    // ── FORM 3: SETTINGS SUBMIT ──
    const settingsForm = document.getElementById('settings-edit-form');
    if (settingsForm) {
      settingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const saveBtn = document.getElementById('settings-save-btn');
        if (saveBtn) {
          saveBtn.disabled = true;
          saveBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Saving...`;
        }
        try {
          const newName = settingsName ? settingsName.value.trim() : '';
          const newPhone = settingsPhone ? settingsPhone.value.trim() : '';

          data.name = newName;
          data.phone = newPhone;

          await saveUserProfile(user.uid, {
            name: newName,
            phone: newPhone,
            updatedAt: new Date()
          });

          if (elName) elName.textContent = newName || user.displayName;
          if (elAvatar) elAvatar.textContent = getInitials(newName || user.displayName);
          showToast('Profile credentials updated!', 'success');
        } catch (err) {
          showToast('Failed to update credentials: ' + err.message, 'error');
        } finally {
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `<i class="bi bi-check2-circle me-1"></i> Save Profile Details`;
          }
        }
      });
    }

    // ── PASSWORD RESET ──
    const resetBtn = document.getElementById('send-password-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        if (!user.email) return;
        resetBtn.disabled = true;
        resetBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span> Sending...`;
        try {
          await sendUserPasswordReset(user.email);
          showToast(`Password reset link dispatched to ${user.email}`, 'success');
        } catch (err) {
          showToast('Failed to send reset link: ' + err.message, 'error');
        } finally {
          resetBtn.disabled = false;
          resetBtn.innerHTML = `<i class="bi bi-key me-1"></i> Send Password Reset Link`;
        }
      });
    }

    // ── SIGN OUT ──
    const signoutBtn = document.getElementById('profile-signout-btn');
    if (signoutBtn) {
      signoutBtn.addEventListener('click', async () => {
        await userSignOut();
        showToast('Signed out of XORONIQ. Come back soon!', 'info');
        setTimeout(() => window.location.href = 'index.html', 400);
      });
    }

    // ── LOAD & RENDER ORDERS ──
    await loadUserOrders(user.email);
  });
}

async function loadUserOrders(email) {
  const container = document.getElementById('profile-orders-list');
  const statOrders = document.getElementById('stat-total-orders');
  const statActive = document.getElementById('stat-active-orders');
  const statSpent = document.getElementById('stat-total-spent');
  const tabCountBadge = document.getElementById('orders-tab-count');

  if (!container) return;

  try {
    const orders = await getUserOrders(email);

    // Update KPI Metric Counters
    const totalCount = orders.length;
    const activeCount = orders.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled').length;
    const totalSpentVal = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);

    if (statOrders) statOrders.textContent = totalCount;
    if (statActive) statActive.textContent = activeCount;
    if (statSpent) statSpent.textContent = formatCurrency(totalSpentVal);
    if (tabCountBadge) tabCountBadge.textContent = totalCount;

    if (!orders.length) {
      container.innerHTML = `
        <div class="text-center py-5">
          <div class="d-inline-flex align-items-center justify-content-center bg-light rounded-circle mb-3" style="width: 76px; height: 76px;">
            <i class="bi bi-bag-x text-muted-custom fs-1"></i>
          </div>
          <h4 class="font-heading text-black fw-bold mb-2">NO ORDERS PLACED YET</h4>
          <p class="text-muted-custom small mb-4" style="max-width: 420px; margin: 0 auto;">
            Explore our professional-grade vehicle detailing chemicals, SiO2 ceramic boosters, and high-performance kits.
          </p>
          <a href="shop.html" class="btn btn-x-primary px-4 py-2">
            <i class="bi bi-bag-plus me-1"></i> Explore Shop Arsenal
          </a>
        </div>
      `;
      return;
    }

    let currentFilter = 'ALL';

    function renderFilteredOrders() {
      let filtered = [...orders];
      if (currentFilter === 'ACTIVE') {
        filtered = filtered.filter(o => o.orderStatus !== 'Delivered' && o.orderStatus !== 'Cancelled');
      } else if (currentFilter === 'DELIVERED') {
        filtered = filtered.filter(o => o.orderStatus === 'Delivered');
      }

      if (!filtered.length) {
        container.innerHTML = `
          <div class="text-center py-5 text-muted-custom small">
            <i class="bi bi-inbox fs-2 mb-2 d-block"></i>
            No orders match the selected filter.
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(order => {
        const orderIdDisplay = order.orderId || order.orderNumber || (order.id ? order.id.slice(-8).toUpperCase() : 'N/A');
        const isCod = order.payment?.method === 'COD' || (order.orderStatus && order.orderStatus.includes('COD'));
        
        let statusClass = 'status-processing';
        if (order.orderStatus === 'Delivered') statusClass = 'status-delivered';
        else if (order.orderStatus === 'Shipped') statusClass = 'status-shipped';
        else if (order.orderStatus === 'Cancelled') statusClass = 'status-cancelled';
        else if (isCod) statusClass = 'status-order-placed-cod';

        const trackingUrl = order.trackingUrl || (order.trackingId ? `https://www.delhivery.com/track/package/${order.trackingId}` : null);

        return `
          <div class="profile-order-card">
            <div class="profile-order-header">
              <div>
                <span class="text-muted-custom small" style="font-size: 0.76rem;">ORDER REFERENCE</span>
                <div class="order-id-badge">#${orderIdDisplay}</div>
                <div class="text-muted-custom small mt-1">
                  <i class="bi bi-calendar3 me-1"></i> Placed on ${formatDate(order.createdAt)}
                </div>
              </div>

              <div class="text-end">
                <div class="d-flex align-items-center gap-2 justify-content-end mb-1">
                  <span class="order-status-badge ${statusClass}">
                    <i class="bi bi-record-circle-fill" style="font-size: 0.6rem;"></i>
                    ${order.orderStatus || 'Processing'}
                  </span>
                </div>
                <div>
                  ${isCod ? `
                    <span class="badge bg-warning bg-opacity-25 text-dark border border-warning" style="font-size: 0.7rem;">CASH ON DELIVERY</span>
                  ` : `
                    <span class="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25" style="font-size: 0.7rem;">PAID ONLINE (RAZORPAY)</span>
                  `}
                </div>
              </div>
            </div>

            <!-- Items Ordered Breakdown -->
            <div class="order-items-grid">
              ${(order.items || []).map(item => `
                <div class="order-item-row">
                  <div class="d-flex align-items-center gap-3">
                    <img src="${item.image || 'images/product/essentials.png'}" alt="${item.name}" class="order-item-img" onerror="this.src='images/product/essentials.png'">
                    <div>
                      <div class="text-black fw-bold" style="font-size: 0.88rem;">${item.name}</div>
                      <div class="text-muted-custom small">Qty: ${item.quantity} ${item.sku ? `• SKU: ${item.sku}` : ''}</div>
                    </div>
                  </div>
                  <div class="text-end font-mono text-black fw-bold">
                    ${formatCurrency((item.price || 0) * (item.quantity || 1))}
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Delhivery Live Tracking Alert Box (If Dispatched / Shipped) -->
            ${order.trackingId ? `
              <div class="profile-delhivery-box">
                <div class="d-flex align-items-center gap-2">
                  <span class="badge bg-danger text-white px-2 py-1 small fw-bold">
                    <i class="bi bi-truck me-1"></i> DELHIVERY EXPRESS
                  </span>
                  <span class="font-mono text-black fw-bold small">
                    AWB: <span>${order.trackingId}</span>
                  </span>
                  <button type="button" class="btn btn-sm btn-outline-secondary py-0 px-2 copy-profile-awb-btn" data-awb="${order.trackingId}" title="Copy Delhivery AWB">
                    <i class="bi bi-clipboard"></i>
                  </button>
                </div>
                <div>
                  <a href="${trackingUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-danger px-3 py-1 d-inline-flex align-items-center gap-1 shadow-sm font-sans" style="font-size: 0.78rem;">
                    <span>Track Live on Delhivery</span>
                    <i class="bi bi-box-arrow-up-right" style="font-size: 0.7rem;"></i>
                  </a>
                </div>
              </div>
            ` : ''}

            <!-- Order Footer / Grand Total & Actions -->
            <div class="d-flex flex-wrap justify-content-between align-items-center pt-2 border-top border-secondary border-opacity-10 gap-2">
              <div class="d-flex align-items-center gap-3">
                <span class="text-muted-custom small">Grand Total:</span>
                <span class="font-heading text-accent fw-bold fs-5">${formatCurrency(order.total)}</span>
              </div>
              <div class="d-flex align-items-center gap-2">
                <a href="tracking.html?orderId=${orderIdDisplay}" class="btn btn-x-outline btn-sm font-sans" style="font-size: 0.78rem;">
                  <i class="bi bi-geo-alt me-1"></i> Dispatch Timeline
                </a>
                <a href="success.html?orderId=${orderIdDisplay}" class="btn btn-x-outline btn-sm font-sans" style="font-size: 0.78rem;">
                  <i class="bi bi-receipt me-1"></i> View Receipt
                </a>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Attach copy listeners
      container.querySelectorAll('.copy-profile-awb-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const awb = btn.getAttribute('data-awb');
          if (awb) {
            try {
              await navigator.clipboard.writeText(awb);
              showToast(`Delhivery AWB ${awb} copied!`, 'success');
            } catch {
              showToast(`AWB: ${awb}`, 'info');
            }
          }
        });
      });
    }

    renderFilteredOrders();

    // Attach filter buttons
    document.querySelectorAll('.order-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.order-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'ALL';
        renderFilteredOrders();
      });
    });

  } catch (err) {
    console.error('loadUserOrders error:', err);
    container.innerHTML = `<p class="text-danger text-center py-4">Unable to load orders. Please refresh.</p>`;
  }
}
