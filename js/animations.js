// ==========================================================================
// XORONIQ CAR CARE - CINEMATIC ANIMATION ENGINE
// Motion Design: Preloader, Custom Desktop Cursor, Parallax, Staggered Reveals & Counters
// ==========================================================================

/**
 * Initialize Preloader
 * Mobile: dismisses fast (1.2s after DOM ready) — no waiting for large images
 * Desktop: waits for window.load then adds 1.4s brand animation
 */
export function initPreloader() {
  const preloader = document.getElementById('xoroniq-preloader');
  if (!preloader) return;

  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const dismiss = () => {
    if (preloader.classList.contains('loaded')) return;
    preloader.classList.add('loaded');
    setTimeout(() => {
      if (preloader.parentNode) preloader.remove();
    }, 600);
  };

  if (isMobile) {
    // On mobile: dismiss quickly after DOM is ready — don't wait on slow image loads
    setTimeout(dismiss, 1200);
  } else {
    // Desktop: wait for full page load then show brand animation
    window.addEventListener('load', () => {
      setTimeout(dismiss, 1400);
    });
  }

  // Absolute fallback: dismiss no matter what after 3.5s
  setTimeout(dismiss, 3500);
}

/**
 * Initialize Interactive Custom Cursor for Desktop
 */
export function initCustomCursor() {
  // Disable on touch devices or screens smaller than 992px
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 992) {
    return;
  }

  // Create cursor elements if they don't exist
  let cursorDot = document.querySelector('.custom-cursor-dot');
  let cursorRing = document.querySelector('.custom-cursor-ring');
  let cursorText = document.querySelector('.custom-cursor-text');

  if (!cursorDot || !cursorRing) {
    cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    
    cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';

    cursorText = document.createElement('span');
    cursorText.className = 'custom-cursor-text';
    cursorText.textContent = 'VIEW';
    cursorRing.appendChild(cursorText);

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  });

  // Smooth lerp loop for outer ring
  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;

    cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Attach hover triggers dynamically
  function updateCursorTriggers() {
    // Links, regular buttons & toggles
    const hoverElements = document.querySelectorAll('a, button, .btn, .filter-btn, .quantity-btn, .btn-close-custom, .nav-link, input, select, textarea');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Product cards & gallery images -> VIEW badge
    const viewElements = document.querySelectorAll('.product-card, .product-card-image-wrap, .social-item, .gallery-main-img');
    viewElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorText.textContent = 'VIEW';
        document.body.classList.add('cursor-view');
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view'));
    });

    // Hero CTA & Explore elements -> EXPLORE badge
    const exploreElements = document.querySelectorAll('.hero-cta-btn, .featured-cta-btn, .category-panel');
    exploreElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorText.textContent = 'EXPLORE';
        document.body.classList.add('cursor-explore');
      });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-explore'));
    });
  }

  updateCursorTriggers();

  // Hide cursor on leaving window
  document.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
    cursorRing.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
  });

  return { updateCursorTriggers };
}

/**
 * Sticky Navbar Blur & Shrink on Scroll
 */
export function initNavbarScroll() {
  const navbar = document.querySelector('.xoroniq-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Scroll Reveal Engine
 * Mobile: skips IntersectionObserver and instantly reveals all elements
 * Desktop: uses smooth IntersectionObserver-based reveal
 */
export function initScrollReveals(root = document) {
  const revealElements = root.querySelectorAll('.reveal:not(.is-revealed)');
  if (!revealElements.length) return;

  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isMobile) {
    // On mobile, instantly reveal all elements with a short stagger
    revealElements.forEach((el, idx) => {
      setTimeout(() => el.classList.add('is-revealed'), idx * 30);
    });
    return;
  }

  // Desktop: IntersectionObserver-based reveal
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: '0px 0px 50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * 3D Parallax Mouse Tilt on Hero & Featured Products
 */
export function initParallaxTilt() {
  if (window.innerWidth < 992) return;

  const tiltContainers = document.querySelectorAll('[data-tilt]');
  tiltContainers.forEach(container => {
    const target = container.querySelector('[data-tilt-target]') || container;

    container.addEventListener('mousemove', (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    container.addEventListener('mouseleave', () => {
      target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/**
 * Animated Stat Counters on Viewport Entry
 */
export function initStatCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute('data-target')) || 0;
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = el.getAttribute('data-decimal') === 'true';

        let current = 0;
        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          current = easeOut * targetVal;

          if (isDecimal) {
            el.textContent = `${prefix}${current.toFixed(1)}${suffix}`;
          } else {
            el.textContent = `${prefix}${Math.floor(current)}${suffix}`;
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${targetVal}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(c => observer.observe(c));
}
