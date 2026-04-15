/* ===================================================
   EVA MILLER – Scroll Reveal & Micro-interactions
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Intersection Observer for scroll reveals ---- */
  const targets = document.querySelectorAll(
    '.header, .profile, .hero-texts, .hero > .btn-cta, ' +
    '.personal-text, .service-content, .stylist-card, .service-section__bottom, ' +
    '.cta-section__content, .cta-section > .btn-cta, ' +
    '.footer__name, .contact, .footer__bottom, .footer__brand'
  );

  targets.forEach(el => el.classList.add('scroll-animate'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const delay = i * 60;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => observer.observe(el));

  /* ---- Smooth hover tilt for stylist card ---- */
  const card = document.getElementById('stylist-card');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
    });
  }

  /* ---- Parallax-lite on hero bg ---- */
  const heroBg = document.querySelector('.hero__bg-img');
  const hero = document.querySelector('.hero');
  if (heroBg && hero) {
    window.addEventListener('scroll', () => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 40;
        heroBg.style.transform = `translateY(${offset}px)`;
      }
    }, { passive: true });
  }

  /* ---- Header Scroll Background ---- */
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

});
