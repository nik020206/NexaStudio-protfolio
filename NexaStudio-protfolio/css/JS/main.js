// ===== NAVIGATION: Active link highlighting =====
function setActiveNav() {
  const links = document.querySelectorAll('.nav-links a');
  const page  = location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page);
  });
}

// ===== HAMBURGER MENU =====
function initHamburger() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('navLinks');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => menu.classList.remove('open'));
  });
}

// ===== CONTACT FORM SUBMIT =====
function initContactForm() {
  const form  = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    if (!name) { alert('Please enter your name.'); return; }

    // Simulate sending
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';

    setTimeout(() => {
      toast.style.display = 'block';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
      setTimeout(() => { toast.style.display = 'none'; }, 4000);
    }, 1200);
  });
}

// ===== SCROLL-REVEAL ANIMATION =====
function initScrollReveal() {
  const targets = document.querySelectorAll('.card, .team-card, .about-visual, .contact-form');
  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

// ===== YEAR IN FOOTER =====
function setYear() {
  const els = document.querySelectorAll('.current-year');
  els.forEach(el => { el.textContent = new Date().getFullYear(); });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initHamburger();
  initContactForm();
  initScrollReveal();
  setYear();
});
