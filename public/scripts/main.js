(function() {
  'use strict';

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    let isOpen = false;

    function toggleMenu() {
      isOpen = !isOpen;
      menuToggle.setAttribute('aria-expanded', isOpen.toString());
      if (isOpen) {
        mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
      } else {
        mobileMenu.style.maxHeight = '0';
      }
    }

    function closeMenu() {
      isOpen = false;
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.style.maxHeight = '0';
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (e) => {
      if (isOpen && !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      let target = null;
      try {
        target = document.querySelector(targetId);
      } catch (_) {
        e.preventDefault();
        return;
      }

      if (!target) {
        e.preventDefault();
        return;
      }

      if (target.offsetParent === null) {
        e.preventDefault();
        return;
      }

      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      try {
        target.focus({ preventScroll: true });
      } catch (_) {}
      e.preventDefault();
    });
  });

  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 100) {
        header.classList.add('bg-dark-950/95');
      } else {
        header.classList.remove('bg-dark-950/95');
      }
    }, { passive: true });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section, .card, .animate-in').forEach(el => {
    observer.observe(el);
  });

  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    let contactVisible = false;

    const updateStickyCta = () => {
      const threshold = hero ? hero.offsetHeight * 0.7 : window.innerHeight;
      const show = window.pageYOffset > threshold && !contactVisible;
      stickyCta.classList.toggle('is-visible', show);
      stickyCta.setAttribute('aria-hidden', show ? 'false' : 'true');
    };

    if (contact && 'IntersectionObserver' in window) {
      const contactObserver = new IntersectionObserver((entries) => {
        contactVisible = entries[0] && entries[0].isIntersecting;
        updateStickyCta();
      }, { threshold: 0.1 });
      contactObserver.observe(contact);
    }

    window.addEventListener('scroll', updateStickyCta, { passive: true });
    window.addEventListener('resize', updateStickyCta);
    updateStickyCta();
  }

  window.dataLayer = window.dataLayer || [];
  const vcTrack = (name, params) => {
    const evt = { event: name };
    if (params) Object.assign(evt, params);
    window.dataLayer.push(evt);
  };

  document.addEventListener('click', (e) => {
    const link = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const area = link.closest('footer') ? 'footer' : 'page';
    if (href === '#contact' || href === '/#contact') vcTrack('cta_discuss', { area });
    else if (href === '#cases') vcTrack('cta_cases', { area });
    else if (href.indexOf('t.me/') !== -1) vcTrack('contact_telegram', { area });
    else if (href.indexOf('vk.ru/') !== -1) vcTrack('contact_vk', { area });
    else if (href.indexOf('max.ru/') !== -1) vcTrack('contact_max', { area });
    else if (href.indexOf('github.com/andr8andr-max') !== -1) vcTrack('contact_github', { area });
    else if (href.indexOf('mailto:') === 0) vcTrack('contact_email', { area });
  });

  document.addEventListener('toggle', (e) => {
    const el = e.target;
    if (!el || el.tagName !== 'DETAILS' || !el.open) return;
    const card = el.closest('[data-case]');
    if (card) {
      vcTrack('case_open', { case: card.getAttribute('data-case') });
      return;
    }
    if (el.closest('#faq')) vcTrack('faq_open');
  }, true);

  if ('IntersectionObserver' in window) {
    const viewObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          vcTrack(entry.target.id === 'pricing' ? 'view_pricing' : 'view_about');
          viewObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    ['pricing', 'about'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) viewObserver.observe(section);
    });

    const contact = document.getElementById('contact');
    if (contact) {
      let contactTracked = false;
      const contactObserver = new IntersectionObserver((entries) => {
        if (!contactTracked && entries[0] && entries[0].isIntersecting) {
          contactTracked = true;
          vcTrack('scroll_to_contact');
          contactObserver.disconnect();
        }
      }, { threshold: 0.1 });
      contactObserver.observe(contact);
    }
  }
})();
