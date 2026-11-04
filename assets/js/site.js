const flags = document.querySelectorAll('.lang-flag');

// Inject Age Gatekeeper & Cookie Disclaimer if not yet verified
(function initAgeGate() {
  let verified = false;
  try {
    verified = localStorage.getItem('mb-age-ok') === '1';
  } catch (_) {}
  if (verified) return;

  document.body.classList.add('age-locked');

  const gate = document.createElement('div');
  gate.className = 'age-gate';
  gate.setAttribute('role', 'dialog');
  gate.setAttribute('aria-modal', 'true');
  gate.setAttribute('aria-labelledby', 'age-gate-title');
  gate.innerHTML = `
    <div class="age-card">
      <div class="age-header">
        <div class="lang-switch age-lang" role="group" aria-label="Language">
          <button type="button" class="lang-flag" data-lang="en" aria-pressed="true" title="English">
            <span class="sr">English</span>
            <svg viewBox="0 0 60 30" aria-hidden="true">
              <rect width="60" height="30" fill="#B22234"/>
              <path d="M0,3.46H60 M0,8.08H60 M0,12.69H60 M0,17.31H60 M0,21.92H60 M0,26.54H60" stroke="#fff" stroke-width="2.31"/>
              <rect width="24" height="16.15" fill="#3C3B6E"/>
              <g fill="#fff">
                <circle cx="3" cy="2.6" r="0.85"/><circle cx="7.5" cy="2.6" r="0.85"/><circle cx="12" cy="2.6" r="0.85"/><circle cx="16.5" cy="2.6" r="0.85"/><circle cx="21" cy="2.6" r="0.85"/>
                <circle cx="5.25" cy="5.3" r="0.85"/><circle cx="9.75" cy="5.3" r="0.85"/><circle cx="14.25" cy="5.3" r="0.85"/><circle cx="18.75" cy="5.3" r="0.85"/>
                <circle cx="3" cy="8.1" r="0.85"/><circle cx="7.5" cy="8.1" r="0.85"/><circle cx="12" cy="8.1" r="0.85"/><circle cx="16.5" cy="8.1" r="0.85"/><circle cx="21" cy="8.1" r="0.85"/>
                <circle cx="5.25" cy="10.8" r="0.85"/><circle cx="9.75" cy="10.8" r="0.85"/><circle cx="14.25" cy="10.8" r="0.85"/><circle cx="18.75" cy="10.8" r="0.85"/>
                <circle cx="3" cy="13.5" r="0.85"/><circle cx="7.5" cy="13.5" r="0.85"/><circle cx="12" cy="13.5" r="0.85"/><circle cx="16.5" cy="13.5" r="0.85"/><circle cx="21" cy="13.5" r="0.85"/>
              </g>
            </svg>
          </button>
          <button type="button" class="lang-flag" data-lang="tl" aria-pressed="false" title="Tagalog">
            <span class="sr">Tagalog</span>
            <svg viewBox="0 0 60 30" aria-hidden="true">
              <rect width="60" height="15" fill="#0038A8"/>
              <rect y="15" width="60" height="15" fill="#CE1126"/>
              <polygon points="0,0 27,15 0,30" fill="#fff"/>
              <g fill="#FCD116" transform="translate(9.2 15)">
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(45)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(90)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(135)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(180)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(225)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(270)"/>
                <polygon points="0,-5.6 0.55,-2.7 -0.55,-2.7" transform="rotate(315)"/>
                <circle r="2.15"/>
              </g>
              <g fill="#FCD116">
                <polygon points="0,-1.35 .38,-.42 1.35,-.42 .58,.16 .88,1.15 0,.55 -.88,1.15 -.58,.16 -1.35,-.42 -.38,-.42" transform="translate(4.4 5.6)"/>
                <polygon points="0,-1.35 .38,-.42 1.35,-.42 .58,.16 .88,1.15 0,.55 -.88,1.15 -.58,.16 -1.35,-.42 -.38,-.42" transform="translate(4.4 24.4)"/>
                <polygon points="0,-1.35 .38,-.42 1.35,-.42 .58,.16 .88,1.15 0,.55 -.88,1.15 -.58,.16 -1.35,-.42 -.38,-.42" transform="translate(16.6 15)"/>
              </g>
            </svg>
          </button>
        </div>
      </div>
      <img class="age-seal" src="assets/img/wax-gold.png" alt="Monkey Business">
      <p class="tagline">Monkey Business</p>
      <h2 id="age-gate-title" data-en="Of legal drinking age?" data-tl="Nasa legal na edad ka na ba?">Of legal drinking age?</h2>
      <p id="age-gate-copy" data-en="You must be 18 or older (or of legal drinking age in your country) to enter this house." data-tl="Dapat ikaw ay 18 taong gulang pataas (o nasa legal na edad sa iyong bansa) upang makapasok sa bahay na ito.">You must be 18 or older (or of legal drinking age in your country) to enter this house.</p>
      <div class="age-actions" id="age-gate-actions">
        <button type="button" class="cta" id="age-yes" data-en="Yes, enter" data-tl="Oo, pumasok">Yes, enter</button>
        <button type="button" class="cta cta-ghost" id="age-no" data-en="No" data-tl="Hindi">No</button>
      </div>
      <div class="age-cookie-notice">
        <p class="cookie-text" data-en="We use essential local storage cookies to remember your age verification and language preference. No tracking or marketing cookies." data-tl="Gumagamit kami ng mahahalagang lokal na cookies upang alalahanin ang iyong edad at wika. Walang tracking o marketing cookies.">We use essential local storage cookies to remember your age verification and language preference. No tracking or marketing cookies.</p>
      </div>
      <p class="age-note" data-en="Craft fruit liqueur · Isabela, Philippines" data-tl="Likor mula sa prutas · Isabela, Pilipinas">Craft fruit liqueur · Isabela, Philippines</p>
    </div>
  `;
  document.body.appendChild(gate);

  const yesBtn = gate.querySelector('#age-yes');
  const noBtn = gate.querySelector('#age-no');
  const copyEl = gate.querySelector('#age-gate-copy');
  const actionsEl = gate.querySelector('#age-gate-actions');

  yesBtn.addEventListener('click', () => {
    try {
      localStorage.setItem('mb-age-ok', '1');
    } catch (_) {}
    gate.classList.add('is-hidden');
    document.body.classList.remove('age-locked');
    setTimeout(() => gate.remove(), 400);
  });

  noBtn.addEventListener('click', () => {
    const isTl = document.documentElement.lang === 'tl';
    copyEl.dataset.en = 'No shortcuts. Come back when you are of legal drinking age.';
    copyEl.dataset.tl = 'Walang shortcut. Bumalik ka kapag nasa legal na edad ka na.';
    copyEl.textContent = isTl ? copyEl.dataset.tl : copyEl.dataset.en;
    copyEl.classList.add('age-denied');
    actionsEl.hidden = true;
  });
})();

function setLang(lang) {
  const next = lang === 'tl' ? 'tl' : 'en';
  document.documentElement.lang = next;
  try {
    localStorage.setItem('mb-lang', next);
  } catch (_) {}

  document.querySelectorAll('.lang-flag').forEach(flag => {
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

document.addEventListener('click', (event) => {
  const flag = event.target.closest('.lang-flag');
  if (flag && flag.dataset.lang) {
    setLang(flag.dataset.lang);
  }
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
