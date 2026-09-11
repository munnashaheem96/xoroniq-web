// ==========================================================================
// XORONIQ CAR CARE - MASTER APPLICATION COORDINATOR
// ==========================================================================

import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import { 
  initPreloader, 
  initCustomCursor, 
  initNavbarScroll, 
  initScrollReveals, 
  initParallaxTilt, 
  initStatCounters 
} from './animations.js';
import { updateCartBadges, renderOffcanvasCart, openCartDrawer, getCartTotals } from './cart.js';
import { initSearch } from './search.js';
import { showToast, formatCurrency } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // Ensure page starts at top if not linking to anchor
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  // Initialize Core Animations & Motion
  initPreloader();
  initCustomCursor();
  initNavbarScroll();
  initScrollReveals();
  initParallaxTilt();
  initStatCounters();
  initSearch();

  // Initialize Cart drawer rendering & badge states
  updateCartBadges();
  renderOffcanvasCart();

  // Attach Cart Drawer Triggers
  const cartTriggers = document.querySelectorAll('.nav-cart-trigger, [data-action="open-cart"]');
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCartDrawer();
    });
  });

  // Newsletter Form handler
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value.trim()) {
        showToast('Welcome to XORONIQ Inner Circle. You are subscribed.', 'success');
        emailInput.value = '';
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});
