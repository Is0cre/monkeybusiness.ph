const flags = document.querySelectorAll('.lang-flag');

function setLang(lang) {
  const next = lang === 'tl' ? 'tl' : 'en';
  document.documentElement.lang = next;
  try {
    localStorage.setItem('mb-lang', next);
  } catch (_) {}

  flags.forEach(flag => {
    const on = flag.dataset.lang === next;
    flag.classList.toggle('is-active', on);
    flag.setAttribute('aria-pressed', on ? 'true' : 'false');
  });

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.dataset[next];
    if (!text) return;
    if (el.matches('input, textarea')) {
      el.placeholder = text;
    } else {
      el.textContent = text;
    }
  });

  syncSubmit(next);
}

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const params = new URLSearchParams(location.search);

if (form && formStatus && params.get('sent') === '1') {
  formStatus.dataset.en = 'Received. We will reply straight to your email.';
  formStatus.dataset.tl = 'Natanggap na. Sasagot kami diretso sa email mo.';
  formStatus.hidden = false;
}

// Pre-select flavour allocation if linked from a flavour page (?flavor=banana)
const requestedFlavor = params.get('flavor');
if (form && requestedFlavor) {
  const subjectEl = document.querySelector('#subject');
  const messageEl = form.querySelector('textarea[name="message"]');
  if (subjectEl) subjectEl.value = 'Allocation Request';
  if (messageEl && !messageEl.value) {
    const label = requestedFlavor.charAt(0).toUpperCase() + requestedFlavor.slice(1);
    messageEl.value = `2027 Allocation Inquiry — ${label} Liqueur\n\n`;
  }
}

let savedLang = 'en';
try {
  savedLang = localStorage.getItem('mb-lang') === 'tl' ? 'tl' : 'en';
} catch (_) {}
setLang(savedLang);

flags.forEach(flag => {
  flag.addEventListener('click', () => setLang(flag.dataset.lang));
});

const menuBtn = document.querySelector('.menu-btn');
const header = document.querySelector('header');
const drop = document.querySelector('.drop');
const dropBtn = document.querySelector('.drop-btn');

function closeMenu() {
  if (!header || !menuBtn) return;
  header.classList.remove('nav-open');
  menuBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn && header) {
  menuBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = header.classList.toggle('nav-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    // On mobile, auto-expand the flavours list inside the drawer for 1-tap access
    if (open && window.innerWidth <= 820 && drop && dropBtn) {
      drop.classList.add('open');
      dropBtn.setAttribute('aria-expanded', 'true');
    }
  });

  document.querySelectorAll('#site-nav a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  document.addEventListener('click', (event) => {
    if (header.classList.contains('nav-open') && !header.contains(event.target)) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820 && header.classList.contains('nav-open')) {
      closeMenu();
    }
  });
}

if (drop && dropBtn) {
  if (drop.querySelector('[aria-current="page"]')) {
    dropBtn.classList.add('is-current');
  }
  dropBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = drop.classList.toggle('open');
    dropBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', (event) => {
    if (!drop.contains(event.target) && (!header || !header.classList.contains('nav-open'))) {
      drop.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
    if (drop && dropBtn) {
      drop.classList.remove('open');
      dropBtn.setAttribute('aria-expanded', 'false');
    }
  }
});

// Header elevation on scroll
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function syncSubmit(lang) {
  const subject = document.querySelector('#subject');
  const button = document.querySelector('#send-btn');
  if (!subject || !button) return;
  const next = lang === 'tl' ? 'tl' : 'en';
  const alloc = subject.value === 'Allocation Request';
  button.textContent = alloc
    ? button.dataset[next === 'tl' ? 'allocTl' : 'allocEn']
    : button.dataset[next === 'tl' ? 'sendTl' : 'sendEn'];
}

const subject = document.querySelector('#subject');
if (subject) {
  subject.addEventListener('change', () => syncSubmit(document.documentElement.lang));
}

if (form) {
  form.addEventListener('submit', (event) => {
    const nextInput = form.querySelector('input[name="_next"]');
    if (nextInput) {
      nextInput.value = new URL('contact.html?sent=1', window.location.href).href;
    }
    const to = (form.dataset.to || '').trim();
    if (!to) {
      event.preventDefault();
      if (formStatus) formStatus.hidden = false;
      return;
    }
    form.action = 'https://formsubmit.co/' + encodeURIComponent(to);
  });
}

// Subtle scroll-triggered reveal
const revealTargets = document.querySelectorAll('.card, .flavor, .valley-frame, .spec-box, .info-tile');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.04, rootMargin: '0px 0px 80px 0px' });

  revealTargets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
