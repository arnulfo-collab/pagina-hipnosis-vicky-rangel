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
