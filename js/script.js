document.body.classList.add('js-enabled');

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', () => {
  initHeroAnimation();
  initHeroSlider();
  initHeaderScroll();
  initHamburgerMenu();
  initScrollReveal();
  initDummyLinks();
});

function initHeroAnimation() {
  const logoPaths = document.querySelectorAll('.hero__logo-path, .hero__logo-draw');
  const logoStage = document.querySelector('[data-logo-stage]');
  const targetLogo = document.querySelector('.hero__logo .hero__logo-svg');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }

  logoPaths.forEach((path) => {
    const length = Math.ceil(
      typeof path.getTotalLength === 'function'
        ? path.getTotalLength()
        : path.getComputedTextLength()
    );

    path.style.setProperty('--path-length', length);
  });

  const updateLogoTravel = () => {
    if (!logoStage || !targetLogo) return;

    const stageRect = logoStage.getBoundingClientRect();
    const targetRect = targetLogo.getBoundingClientRect();

    const stageCenterX = stageRect.left + stageRect.width / 2;
    const stageCenterY = stageRect.top + stageRect.height / 2;
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const scale = targetRect.width / stageRect.width;

    logoStage.style.setProperty('--logo-move-x', `${targetCenterX - stageCenterX}px`);
    logoStage.style.setProperty('--logo-move-y', `${targetCenterY - stageCenterY}px`);
    logoStage.style.setProperty('--logo-move-scale', scale.toFixed(3));
  };

  updateLogoTravel();
  window.addEventListener('resize', updateLogoTravel, { passive: true });

  document.body.classList.add('is-loaded');

  if (reduceMotion) {
    document.body.classList.add('is-logo-settled', 'is-hero-bg-visible', 'is-hero-complete');
    return;
  }

  if (logoStage && targetLogo) {
    window.setTimeout(() => {
      updateLogoTravel();
      document.body.classList.add('is-logo-moving');
    }, 2500);
  
    window.setTimeout(() => {
      document.body.classList.add('is-logo-settled');
    }, 3200);
  
    window.setTimeout(() => {
      document.body.classList.add('is-hero-bg-visible');
    }, 3300);
  
    window.setTimeout(() => {
      document.body.classList.add('is-hero-complete');
    }, 3900);
  } else {
    window.setTimeout(() => {
      document.body.classList.add('is-hero-bg-visible', 'is-hero-complete');
    }, 3300);
  }
}

function initHeroSlider() {
  const slider = document.querySelector('[data-hero-slider]');
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll('.hero-slider__image'));
  if (slides.length <= 1) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));

  if (currentIndex < 0) {
    currentIndex = 0;
    slides[0].classList.add('is-active');
  }

  slides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
  });

  if (reduceMotion) return;

  const showSlide = (nextIndex) => {
    slides[currentIndex].classList.remove('is-active');
    slides[currentIndex].setAttribute('aria-hidden', 'true');

    slides[nextIndex].classList.add('is-active');
    slides[nextIndex].setAttribute('aria-hidden', 'false');

    currentIndex = nextIndex;
  };

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  };

  let timer = window.setInterval(goNext, 5200);

  const stopSlider = () => {
    window.clearInterval(timer);
  };

  const startSlider = () => {
    timer = window.setInterval(goNext, 5200);
  };

  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);
  slider.addEventListener('focusin', stopSlider);
  slider.addEventListener('focusout', startSlider);
}

function initHeaderScroll() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}

function initHamburgerMenu() {
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (!header || !nav || !toggle) return;

  const setOpen = (isOpen) => {
    header.classList.toggle('is-open', isOpen);
    nav.classList.toggle('is-open', isOpen);
    document.body.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  };

  toggle.addEventListener('click', () => {
    setOpen(!header.classList.contains('is-open'));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setOpen(false);
    });
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  });
}

function initScrollReveal() {
  const revealItems = document.querySelectorAll('.reveal');
  if (!revealItems.length) return;

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: '0px 0px -8% 0px',
  });

  revealItems.forEach((item) => observer.observe(item));
}

function initDummyLinks() {
  document.querySelectorAll('[data-dummy-link]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
}