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
    if (elAvatar) elAvatar.textContent = initials;
    if (elName) elName.textContent = data.name || user.displayName || 'My Account';
    if (elEmail) elEmail.textContent = user.email;
    if (elSince) elSince.textContent = 'Member since ' + formatDate(user.metadata?.creationTime);

    // Prefill form
    const fields = ['name', 'phone', 'city', 'vehicleModel'];
    fields.forEach(f => {
      const el = document.getElementById(`profile-${f}`);
      if (el) el.value = data[f] || '';
    });

    // Vehicle type radio
    const vType = data.vehicleType || 'Car';
    const radioEl = document.querySelector(`input[name="editVehicleType"][value="${vType}"]`);
    if (radioEl) radioEl.checked = true;

    // ── SAVE PROFILE ──
    const saveForm = document.getElementById('profile-edit-form');
    saveForm && saveForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('profile-save-btn');
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>SAVING...`;
      try {
        const updated = {
          name: document.getElementById('profile-name-input')?.value.trim() || data.name,
          phone: document.getElementById('profile-phone')?.value.trim(),
          city: document.getElementById('profile-city')?.value.trim(),
          vehicleModel: document.getElementById('profile-vehicleModel')?.value.trim(),
          vehicleType: document.querySelector('input[name="editVehicleType"]:checked')?.value || vType,
          updatedAt: new Date()
        };
        await saveUserProfile(user.uid, updated);
        if (elName) elName.textContent = updated.name || user.displayName;
        if (elAvatar) elAvatar.textContent = getInitials(updated.name);
        showToast('Profile updated successfully!', 'success');
      } catch {
        showToast('Failed to save profile.', 'error');
      } finally {
        btn.disabled = false;
        btn.innerHTML = `SAVE CHANGES <i class="bi bi-check2 ms-2"></i>`;
      }
    });

    // ── SIGN OUT ──
    const signoutBtn = document.getElementById('profile-signout-btn');
    signoutBtn && signoutBtn.addEventListener('click', async () => {
      await userSignOut();
      showToast('Signed out.', 'info');
      setTimeout(() => window.location.href = 'index.html', 400);
    });

    // ── MY ORDERS ──
    await loadUserOrders(user.email);

    // Scroll to orders if hash
    if (window.location.hash === '#orders') {
      setTimeout(() => {
        document.getElementById('profile-orders-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  });
}

async function loadUserOrders(email) {
  const container = document.getElementById('profile-orders-list');
  if (!container) return;
  container.innerHTML = `<div class="text-center py-4"><span class="spinner-border text-accent"></span></div>`;

  try {
    const orders = await getUserOrders(email);
    if (!orders.length) {
      container.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-bag-x" style="font-size:2.5rem;color:var(--x-text-muted);"></i>
          <p class="mt-3 text-muted">No orders yet. <a href="shop.html" class="text-accent fw-600">Start shopping →</a></p>
        </div>`;
      return;
    }

    container.innerHTML = orders.map(order => `
      <div class="profile-order-card">
        <div class="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <div class="fw-700" style="font-size:.9rem;">#${order.orderNumber || order.id?.slice(-8).toUpperCase()}</div>
            <div style="font-size:.8rem;color:var(--x-text-muted);">${formatDate(order.createdAt)}</div>
          </div>
          <span class="order-status-badge status-${(order.orderStatus || '').toLowerCase().replace(/\s+/g, '-')}">${order.orderStatus || 'Processing'}</span>
        </div>
        <div class="mt-2" style="font-size:.85rem;">
          ${(order.items || []).map(i => `<span class="me-2">• ${i.name} ×${i.quantity}</span>`).join('')}
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2">
          <span class="fw-700 text-accent">${formatCurrency(order.total)}</span>
          <a href="tracking.html?order=${order.orderNumber || ''}" class="btn btn-x-outline-accent btn-sm" style="font-size:.75rem;">Track Order</a>
        </div>
      </div>`).join('');
  } catch {
    container.innerHTML = `<p class="text-muted text-center py-3">Unable to load orders.</p>`;
  }
}
