// Mobile nav toggle
const navToggle = document.querySelector('[data-nav-toggle]');
const menu = document.querySelector('[data-menu]');

if (navToggle && menu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

// Dropdown — mobile click toggle, desktop via CSS :hover
document.querySelectorAll('.has-dropdown').forEach(parent => {
  const trigger = parent.querySelector('.dropdown-trigger');
  if (!trigger) return;

  trigger.addEventListener('click', (e) => {
    if (window.innerWidth <= 960) {
      e.preventDefault();
      const isOpen = parent.classList.toggle('open');
      // close siblings
      parent.closest('[data-menu]')
        ?.querySelectorAll('.has-dropdown')
        .forEach(sib => { if (sib !== parent) sib.classList.remove('open'); });
    }
  });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(p => p.classList.remove('open'));
  }
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const revealEl = el => el.classList.add('visible');

if ('IntersectionObserver' in window && reveals.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealEl(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  reveals.forEach(el => observer.observe(el));

  // Fallback: garantiza que lo que ya está en pantalla aparezca aunque el
  // observer no dispare (p. ej. iframe en segundo plano).
  const revealInView = () => reveals.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight * 0.95 && r.bottom > 0) revealEl(el);
  });
  window.addEventListener('load', () => setTimeout(revealInView, 150));
  setTimeout(revealInView, 1000);
} else {
  reveals.forEach(revealEl);
}

// Lenis smooth scroll + GSAP ScrollTrigger parallax (integrados)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ls = document.createElement('script');
  ls.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js';
  ls.onload = function () {
    var lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    var targets = document.querySelectorAll('.service-photo, .blog-card-photo');

    if (targets.length) {
      // Páginas con imágenes: cargar GSAP + ScrollTrigger y sincronizar con Lenis
      var s1 = document.createElement('script');
      s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
      s1.onload = function () {
        var s2 = document.createElement('script');
        s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
        s2.onload = function () {
          gsap.registerPlugin(ScrollTrigger);
          lenis.on('scroll', ScrollTrigger.update);
          gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
          gsap.ticker.lagSmoothing(0);
          targets.forEach(function (img) {
            gsap.fromTo(img,
              { scale: 1 },
              {
                scale: 1.07,
                ease: 'none',
                scrollTrigger: {
                  trigger: img,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5
                }
              }
            );
          });
        };
        document.head.appendChild(s2);
      };
      document.head.appendChild(s1);
    } else {
      // Páginas sin imágenes: solo Lenis con RAF manual
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  };
  document.head.appendChild(ls);
})();
