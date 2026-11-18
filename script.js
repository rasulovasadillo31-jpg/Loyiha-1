/**
 * Apple.com Single-Page Replica — Interactive Engine
 * Handles:
 * 1. Global Navbar Mega-Menu Curtain, Search, Bag, & Mobile Drawer
 * 2. Apple TV+ Infinite Loop Center-Focused Carousel + Pagination + Play/Pause
 * 3. Apple Services Auto-Scrolling Marquee
 * 4. Mobile Footer Accordions & Scroll Reveal Animations
 * 5. Interactive Quick-View / Bag Modal
 */

document.addEventListener('DOMContentLoaded', () => {
  initGlobalNav();
  initTvCarousel();
  initServicesTicker();
  initFooterAccordions();
  initScrollReveal();
  initQuickModals();
});

/* ==========================================================================
   1. GLOBAL NAVIGATION MEGA-MENU, SEARCH, BAG & MOBILE DRAWER
   ========================================================================== */
function initGlobalNav() {
  const nav = document.getElementById('ac-globalnav');
  const flyout = document.getElementById('ac-gn-flyout');
  const flyoutContent = document.getElementById('ac-gn-flyout-content');
  const curtain = document.getElementById('ac-gn-curtain');
  const menuItems = document.querySelectorAll('.ac-gn-item-menu');
  const searchBtn = document.getElementById('gn-search-btn');
  const bagBtn = document.getElementById('gn-bag-btn');
  const mobileToggle = document.getElementById('gn-mobile-toggle');
  const mobileDrawer = document.getElementById('ac-gn-mobile-drawer');

  // Authentic Apple Mega-Menu Data
  const menuData = {
    store: {
      primaryTitle: 'Shop',
      primaryLinks: ['Shop the Latest', 'Mac', 'iPad', 'iPhone', 'Apple Watch', 'Apple Vision Pro', 'Accessories'],
      secondaryTitle: 'Quick Links',
      secondaryLinks: ['Find a Store', 'Order Status', 'Apple Trade In', 'Financing', 'Personal Setup']
    },
    mac: {
      primaryTitle: 'Explore Mac',
      primaryLinks: ['Explore All Mac', 'MacBook Air', 'MacBook Pro', 'iMac', 'Mac mini', 'Mac Studio', 'Mac Pro', 'Displays'],
      secondaryTitle: 'Shop Mac',
      secondaryLinks: ['Shop Mac', 'Help Me Choose', 'Mac Accessories', 'Apple Trade In', 'Financing']
    },
    ipad: {
      primaryTitle: 'Explore iPad',
      primaryLinks: ['Explore All iPad', 'iPad Pro', 'iPad Air', 'iPad', 'iPad mini', 'Apple Pencil', 'Keyboards'],
      secondaryTitle: 'Shop iPad',
      secondaryLinks: ['Shop iPad', 'iPad Accessories', 'Apple Trade In', 'Financing']
    },
    iphone: {
      primaryTitle: 'Explore iPhone',
      primaryLinks: ['Explore All iPhone', 'iPhone 17 Pro', 'iPhone Air', 'iPhone 17', 'iPhone 16', 'Compare iPhone'],
      secondaryTitle: 'Shop iPhone',
      secondaryLinks: ['Shop iPhone', 'iPhone Accessories', 'Apple Trade In', 'Carrier Deals at Apple']
    },
    watch: {
      primaryTitle: 'Explore Watch',
      primaryLinks: ['Explore All Apple Watch', 'Apple Watch Series 11', 'Apple Watch Ultra 3', 'Apple Watch SE', 'Apple Watch Nike'],
      secondaryTitle: 'Shop Watch',
      secondaryLinks: ['Shop Apple Watch', 'Apple Watch Studio', 'Apple Watch Bands', 'Apple Trade In']
    },
    vision: {
      primaryTitle: 'Explore Vision',
      primaryLinks: ['Apple Vision Pro', 'Guided Tour', 'Tech Specs'],
      secondaryTitle: 'Shop Vision',
      secondaryLinks: ['Shop Apple Vision Pro', 'Apple Vision Pro Accessories', 'Book a Demo']
    },
    airpods: {
      primaryTitle: 'Explore AirPods',
      primaryLinks: ['Explore All AirPods', 'AirPods Pro 3', 'AirPods 4', 'AirPods Max'],
      secondaryTitle: 'Shop AirPods',
      secondaryLinks: ['Shop AirPods', 'AirPods Accessories']
    },
    tv: {
      primaryTitle: 'Explore TV & Home',
      primaryLinks: ['Explore TV & Home', 'Apple TV 4K', 'HomePod', 'HomePod mini'],
      secondaryTitle: 'Shop TV & Home',
      secondaryLinks: ['Shop Apple TV 4K', 'Shop HomePod', 'Siri Remote', 'TV & Home Accessories']
    },
    entertainment: {
      primaryTitle: 'Explore Entertainment',
      primaryLinks: ['Explore Entertainment', 'Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+'],
      secondaryTitle: 'Support',
      secondaryLinks: ['Apple TV+ Support', 'Apple Music Support']
    },
    accessories: {
      primaryTitle: 'Shop Accessories',
      primaryLinks: ['Shop All Accessories', 'Mac', 'iPad', 'iPhone', 'Apple Watch', 'AirPods', 'TV & Home'],
      secondaryTitle: 'Explore Accessories',
      secondaryLinks: ['Made by Apple', 'Beats by Dr. Dre', 'AirTag']
    },
    support: {
      primaryTitle: 'Explore Support',
      primaryLinks: ['iPhone', 'Mac', 'iPad', 'Watch', 'Apple Vision Pro', 'AirPods', 'Music', 'TV'],
      secondaryTitle: 'Get Help',
      secondaryLinks: ['Community', 'Check Coverage', 'Repair', 'Contact Us']
    }
  };

  let bagItems = [];

  function openFlyout(html) {
    flyoutContent.innerHTML = html;
    flyout.classList.add('active');
    flyout.setAttribute('aria-hidden', 'false');
    curtain.classList.add('active');
    nav.classList.add('flyout-open');
  }

  function closeFlyout() {
    flyout.classList.remove('active');
    flyout.setAttribute('aria-hidden', 'true');
    curtain.classList.remove('active');
    nav.classList.remove('flyout-open');
  }

  // Hover over desktop nav categories
  menuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      const key = item.getAttribute('data-menu');
      const data = menuData[key];
      if (!data) return;

      const primaryHtml = data.primaryLinks
        .map((link) => `<li><a href="#top" class="flyout-nav-link">${link}</a></li>`)
        .join('');
      const secondaryHtml = data.secondaryLinks
        .map((link) => `<li><a href="#top" class="flyout-nav-link">${link}</a></li>`)
        .join('');

      openFlyout(`
        <div class="flyout-col primary-col">
          <h4>${data.primaryTitle}</h4>
          <ul>${primaryHtml}</ul>
        </div>
        <div class="flyout-col secondary-col">
          <h4>${data.secondaryTitle}</h4>
          <ul>${secondaryHtml}</ul>
        </div>
      `);
    });
  });

  // Search button click
  searchBtn.addEventListener('click', () => {
    const isOpen = flyout.classList.contains('active') && flyoutContent.querySelector('.flyout-search-box');
    if (isOpen) {
      closeFlyout();
      return;
    }
    openFlyout(`
      <div class="flyout-search-box">
        <div class="flyout-search-input-wrap">
          <input type="text" class="flyout-search-input" placeholder="Search apple.com" autofocus />
        </div>
        <div class="flyout-col secondary-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#iphone-17-pro" class="flyout-nav-link">&rarr; Find a Store</a></li>
            <li><a href="#iphone-17-pro" class="flyout-nav-link">&rarr; iPhone 17 Pro</a></li>
            <li><a href="#iphone-air" class="flyout-nav-link">&rarr; iPhone Air</a></li>
            <li><a href="#airpods-pro" class="flyout-nav-link">&rarr; AirPods Pro 3</a></li>
            <li><a href="#trade-in" class="flyout-nav-link">&rarr; Apple Trade In</a></li>
          </ul>
        </div>
      </div>
    `);
    const input = flyoutContent.querySelector('.flyout-search-input');
    if (input) setTimeout(() => input.focus(), 50);
  });

  // Shopping Bag button click
  bagBtn.addEventListener('click', () => {
    const isOpen = flyout.classList.contains('active') && flyoutContent.querySelector('.flyout-bag-box');
    if (isOpen) {
      closeFlyout();
      return;
    }
    const itemsMarkup = bagItems.length
      ? `<ul class="list-unstyled mb-3">${bagItems.map((i) => `<li class="py-1 fw-semibold">${i}</li>`).join('')}</ul>`
      : `<h3 style="font-size:24px;font-weight:600;margin-bottom:8px;">Your Bag is empty.</h3>
         <p style="font-size:14px;color:#6e6e73;">Sign in to see if you have any saved items.</p>`;

    openFlyout(`
      <div class="flyout-bag-box">
        ${itemsMarkup}
        <div class="flyout-col secondary-col mt-4">
          <h4>My Profile</h4>
          <ul>
            <li><a href="#top" class="flyout-nav-link">Orders</a></li>
            <li><a href="#top" class="flyout-nav-link">Your Saves</a></li>
            <li><a href="#top" class="flyout-nav-link">Account</a></li>
            <li><a href="#top" class="flyout-nav-link">Sign in</a></li>
          </ul>
        </div>
      </div>
    `);
  });

  // Close flyout on mouse leave from header or clicking curtain
  nav.addEventListener('mouseleave', closeFlyout);
  curtain.addEventListener('click', closeFlyout);
  flyoutContent.addEventListener('click', (e) => {
    if (e.target.classList.contains('flyout-nav-link')) closeFlyout();
  });

  // Expose helper to add items to bag from product modals
  window.addToAppleBag = (productName) => {
    bagItems.push(productName);
  };

  // Mobile Menu Drawer Toggle
  mobileToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    mobileToggle.classList.toggle('open', isOpen);
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      mobileToggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ==========================================================================
   2. APPLE TV+ INFINITE LOOP CENTER-FOCUSED CAROUSEL
   ========================================================================== */
function initTvCarousel() {
  const track = document.getElementById('tv-track');
  const dotsContainer = document.getElementById('tv-dots');
  const prevBtn = document.getElementById('tv-prev-btn');
  const nextBtn = document.getElementById('tv-next-btn');
  const playPauseBtn = document.getElementById('tv-play-pause');
  const iconPause = document.getElementById('icon-pause');
  const iconPlay = document.getElementById('icon-play');

  const shows = [
    {
      title: 'Severance',
      genre: 'Thriller',
      tagline: 'There’s more to work than life.',
      bg: 'linear-gradient(135deg, #0b192c 0%, #1e3e62 55%, #09122c 100%)'
    },
    {
      title: 'Ted Lasso',
      genre: 'Comedy',
      tagline: 'Kindness makes a comeback.',
      bg: 'linear-gradient(135deg, #004e92 0%, #0071e3 50%, #34c759 100%)'
    },
    {
      title: 'Silo',
      genre: 'Sci-Fi',
      tagline: 'The truth will surface.',
      bg: 'linear-gradient(135deg, #1c1c1e 0%, #3a3a3c 50%, #8e8e93 100%)'
    },
    {
      title: 'The Morning Show',
      genre: 'Drama',
      tagline: 'The news is only half the story.',
      bg: 'linear-gradient(135deg, #2c003e 0%, #512b58 50%, #fe346e 100%)'
    },
    {
      title: 'Foundation',
      genre: 'Sci-Fi',
      tagline: 'All empires fall.',
      bg: 'linear-gradient(135deg, #090d16 0%, #3b1d5e 50%, #d4af37 100%)'
    },
    {
      title: 'Slow Horses',
      genre: 'Thriller',
      tagline: 'MI5’s reject squad gets the job done.',
      bg: 'linear-gradient(135deg, #1b262c 0%, #0f4c75 60%, #3282b8 100%)'
    }
  ];

  // Build infinite loop buffer: [last, ...shows, first]
  const extendedShows = [shows[shows.length - 1], ...shows, shows[0]];
  let currentIndex = 1; // Starts at first real slide
  let isPlaying = true;
  let autoplayTimer = null;
  let isTransitioning = false;

  // Render slides
  track.innerHTML = extendedShows
    .map(
      (show, idx) => `
      <div class="tv-slide" data-ext-index="${idx}" style="background: ${show.bg};">
        <div style="position:absolute;top:36px;left:52px;font-weight:700;font-size:20px;letter-spacing:-0.02em;opacity:0.9;">
          &#63743;tv+
        </div>
        <div style="position:relative;z-index:2;margin-bottom:24px;">
          <h3 style="font-size:48px;font-weight:700;letter-spacing:-0.02em;margin:0;">${show.title}</h3>
        </div>
        <div class="tv-slide-overlay">
          <a href="#modal-info" class="btn-stream-now" data-product="Apple TV+: ${show.title}">
            Stream now <span>&#9654;</span>
          </a>
          <div class="tv-meta">
            <strong>${show.genre}</strong> &middot; ${show.tagline}
          </div>
        </div>
      </div>
    `
    )
    .join('');

  // Render pagination dots
  dotsContainer.innerHTML = shows
    .map(
      (show, i) =>
        `<button class="tv-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}: ${show.title}"></button>`
    )
    .join('');

  const slides = Array.from(track.querySelectorAll('.tv-slide'));
  const dots = Array.from(dotsContainer.querySelectorAll('.tv-dot'));

  function updatePosition(animate = true) {
    const slideWidth = slides[0].offsetWidth;
    const gap = 16;
    const viewportWidth = track.parentElement.offsetWidth;
    const centerOffset = (viewportWidth - slideWidth) / 2;
    const translateX = centerOffset - currentIndex * (slideWidth + gap);

    track.style.transition = animate ? 'transform 0.7s cubic-bezier(0.28, 0.11, 0.32, 1)' : 'none';
    track.style.transform = `translate3d(${translateX}px, 0, 0)`;

    slides.forEach((s, idx) => s.classList.toggle('active', idx === currentIndex));

    const realIndex = (currentIndex - 1 + shows.length) % shows.length;
    dots.forEach((d, idx) => d.classList.toggle('active', idx === realIndex));
  }

  function goToNext() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  }

  function goToPrev() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  }

  track.addEventListener('transitionend', () => {
    isTransitioning = false;
    if (currentIndex === extendedShows.length - 1) {
      currentIndex = 1;
      updatePosition(false);
    } else if (currentIndex === 0) {
      currentIndex = shows.length;
      updatePosition(false);
    }
  });

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(goToNext, 4500);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  prevBtn.addEventListener('click', () => {
    goToPrev();
    if (isPlaying) startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    goToNext();
    if (isPlaying) startAutoplay();
  });

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetReal = Number(dot.getAttribute('data-slide'));
      currentIndex = targetReal + 1;
      updatePosition(true);
      if (isPlaying) startAutoplay();
    });
  });

  playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    iconPause.classList.toggle('d-none', !isPlaying);
    iconPlay.classList.toggle('d-none', isPlaying);
    playPauseBtn.setAttribute('aria-label', isPlaying ? 'Pause slideshow' : 'Play slideshow');
    if (isPlaying) startAutoplay();
    else stopAutoplay();
  });

  window.addEventListener('resize', () => updatePosition(false));

  // Initial layout + start
  updatePosition(false);
  startAutoplay();
}

/* ==========================================================================
   3. APPLE SERVICES CONTINUOUS MARQUEE TICKER
   ========================================================================== */
function initServicesTicker() {
  const track = document.getElementById('ticker-track');
  const toggleBtn = document.getElementById('ticker-toggle');
  const iconPause = document.getElementById('ticker-icon-pause');
  const iconPlay = document.getElementById('ticker-icon-play');

  const services = [
    { badge: 'Apple Fitness+', title: 'Strength with Gregg', cta: 'Watch now', bg: 'linear-gradient(135deg, #1b4332, #40916c)' },
    { badge: 'Apple Music', title: 'A-List Pop', cta: 'Listen now', bg: 'linear-gradient(135deg, #800f2f, #ff4d6d)' },
    { badge: 'Apple Arcade', title: 'NBA 2K26 Arcade Edition', cta: 'Play now', bg: 'linear-gradient(135deg, #14213d, #fca311)' },
    { badge: 'Apple Fitness+', title: 'HIIT with Bakari', cta: 'Watch now', bg: 'linear-gradient(135deg, #240046, #7b2cbf)' },
    { badge: 'Apple Music', title: 'Today’s Hits', cta: 'Listen now', bg: 'linear-gradient(135deg, #003566, #00b4d8)' },
    { badge: 'Apple Arcade', title: 'Sneaky Sasquatch', cta: 'Play now', bg: 'linear-gradient(135deg, #283618, #606c38)' }
  ];

  // Duplicate list twice for seamless infinite scroll
  const items = [...services, ...services];
  track.innerHTML = items
    .map(
      (s) => `
      <div class="service-card" style="background: ${s.bg};">
        <div class="service-badge">&#63743; ${s.badge.replace('Apple ', '')}</div>
        <h4 class="service-title">${s.title}</h4>
        <div class="service-card-hover-cta">
          <span class="service-pill">${s.cta}</span>
        </div>
      </div>
    `
    )
    .join('');

  let pos = 0;
  let running = true;
  let hovered = false;

  track.addEventListener('mouseenter', () => (hovered = true));
  track.addEventListener('mouseleave', () => (hovered = false));

  function animateTicker() {
    if (running && !hovered) {
      pos -= 0.65;
      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(pos) >= halfWidth) {
        pos = 0;
      }
      track.style.transform = `translate3d(${pos}px, 0, 0)`;
    }
    requestAnimationFrame(animateTicker);
  }

  toggleBtn.addEventListener('click', () => {
    running = !running;
    iconPause.classList.toggle('d-none', !running);
    iconPlay.classList.toggle('d-none', running);
  });

  requestAnimationFrame(animateTicker);
}

/* ==========================================================================
   4. MOBILE FOOTER ACCORDIONS & INTERSECTION OBSERVER REVEALS
   ========================================================================== */
function initFooterAccordions() {
  const titles = document.querySelectorAll('.ac-gf-directory-title');
  titles.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.innerWidth > 833) return;
      const section = btn.parentElement;
      const expanded = section.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', String(expanded));
    });
  });
}

function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal-up').forEach((el) => observer.observe(el));
}

/* ==========================================================================
   5. QUICK-VIEW & ADD-TO-BAG INTERACTIVE MODAL
   ========================================================================== */
function initQuickModals() {
  const modal = document.getElementById('apple-quick-modal');
  const modalBody = document.getElementById('apple-modal-body');
  const closeBtn = document.getElementById('apple-modal-close');

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-product]');
    if (!trigger) return;

    e.preventDefault();
    const product = trigger.getAttribute('data-product');
    const price = trigger.getAttribute('data-price');
    const isBuy = Boolean(price);

    modalBody.innerHTML = isBuy
      ? `
        <p style="font-size:12px;font-weight:600;color:#bf4800;text-transform:uppercase;margin-bottom:4px;">New</p>
        <h3 style="font-size:32px;font-weight:600;letter-spacing:-0.015em;margin-bottom:8px;">Buy ${product}</h3>
        <p style="font-size:17px;color:#6e6e73;margin-bottom:24px;">${price}</p>
        <button id="confirm-add-bag" class="btn-apple btn-apple-primary w-100">Add to Bag</button>
      `
      : `
        <h3 style="font-size:32px;font-weight:600;letter-spacing:-0.015em;margin-bottom:12px;">${product}</h3>
        <p style="font-size:17px;line-height:1.47;color:#1d1d1f;margin-bottom:24px;">
          Designed with aerospace-grade materials, industry-leading silicon performance, and seamless integration across all your Apple devices.
        </p>
        <div class="d-flex gap-2">
          <button id="modal-dismiss-btn" class="btn-apple btn-apple-primary">Done</button>
        </div>
      `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    const confirmBag = document.getElementById('confirm-add-bag');
    if (confirmBag) {
      confirmBag.addEventListener('click', () => {
        if (window.addToAppleBag) window.addToAppleBag(product);
        confirmBag.textContent = 'Added to Bag ✓';
        confirmBag.style.backgroundColor = '#34c759';
        confirmBag.style.borderColor = '#34c759';
        setTimeout(() => closeModal(), 900);
      });
    }

    const dismissBtn = document.getElementById('modal-dismiss-btn');
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}