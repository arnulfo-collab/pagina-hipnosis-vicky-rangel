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

// Parallax suave en imágenes — scroll nativo + GSAP ScrollTrigger
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var targets = document.querySelectorAll('.service-photo, .blog-card-photo');
  if (!targets.length) return;

  var s1 = document.createElement('script');
  s1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
  s1.onload = function () {
    var s2 = document.createElement('script');
    s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
    s2.onload = function () {
      gsap.registerPlugin(ScrollTrigger);
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
})();

// Animated Counters for Stats
const statNumbers = document.querySelectorAll('.stat-number');
if ('IntersectionObserver' in window && statNumbers.length > 0) {
  const animateCounter = (el) => {
    const targetText = el.innerText;
    const targetNum = parseInt(targetText.replace(/\D/g, ''));
    const suffix = targetText.replace(/[0-9]/g, ''); // e.g. "+" or "%"
    
    if (isNaN(targetNum)) return;
    
    let currentNum = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / targetNum));
    
    const timer = setInterval(() => {
      currentNum += 1;
      el.innerText = currentNum + suffix;
      if (currentNum >= targetNum) {
        clearInterval(timer);
        el.innerText = targetText; // Ensure exact match at the end
      }
    }, stepTime);
  };

  const statsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));
}

// Magnetic Buttons
const magneticButtons = document.querySelectorAll('.btn-cta, .btn-primary');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}

// Glow Tracking for Cards
const glowCards = document.querySelectorAll('.card, .service-card, .feature-card, .impact-card');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    glowCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}
