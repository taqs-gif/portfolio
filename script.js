/* ==========================================================================
   script.js — Karan Bharti Personal Brand Website
   Handles: navbar scroll, hamburger, scroll reveal, active nav, back-to-top
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------------------------------
  // 1. NAVBAR — Scroll effect
  // -----------------------------------------------------------------------
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // initial check

  // -----------------------------------------------------------------------
  // 2. HAMBURGER — Mobile menu toggle
  // -----------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // -----------------------------------------------------------------------
  // 3. ACTIVE NAV LINK — Highlight based on scroll position
  // -----------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link');

  const highlightActiveNav = () => {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinkElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightActiveNav, { passive: true });

  // -----------------------------------------------------------------------
  // 4. SCROLL REVEAL — Intersection Observer
  // -----------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // -----------------------------------------------------------------------
  // 5. BACK TO TOP — Show/hide & scroll
  // -----------------------------------------------------------------------
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // -----------------------------------------------------------------------
  // 6. SMOOTH SCROLL — For all anchor links (fallback for older browsers)
  // -----------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -----------------------------------------------------------------------
  // 7. PARALLAX BLOBS — Subtle mouse interaction in hero
  // -----------------------------------------------------------------------
  const hero = document.getElementById('hero');
  const blobs = document.querySelectorAll('.hero-blob');

  if (hero && blobs.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      blobs.forEach((blob, i) => {
        const speed = (i + 1) * 15;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      blobs.forEach(blob => {
        blob.style.transform = '';
      });
    });
  }

  // -----------------------------------------------------------------------
  // 8. STAT COUNTERS — Count up animation when visible
  // -----------------------------------------------------------------------
  const statsElements = document.querySelectorAll('.stat-number');

  if (statsElements.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-count'), 10);
          const duration = 1500; // 1.5 seconds count duration
          const increment = target / (duration / 16); // ~60fps
          let current = 0;

          // Suffix mappings based on target value
          let suffix = '+';
          if (target === 10) suffix = 'M+';
          if (target === 3) suffix = '+';
          if (target === 300) suffix = '%';

          const updateCounter = () => {
            current += increment;
            if (current >= target) {
              entry.target.textContent = target + suffix;
            } else {
              entry.target.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
          statsObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    statsElements.forEach(el => statsObserver.observe(el));
  }

});
