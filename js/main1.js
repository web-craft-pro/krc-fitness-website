/* ════════════════════════════════════════════
   KRC FITNESS WORLD — main.js
════════════════════════════════════════════ */

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── HAMBURGER ──
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}

// Close nav (used by contact link on home page)
function closeNav() {
  document.getElementById('navLinks').classList.remove('open');
  const btn = document.getElementById('hamburger');
  if (btn) btn.classList.remove('open');
}

// Close nav when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (nav && nav.classList.contains('open')) {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  }
});

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// ── STATS COUNTER ──
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 28);
  });
}
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
  }, { threshold: 0.3 });
  statsObs.observe(statsBar);
}

// ── ENQUIRY FORM ──
function submitEnquiry(e) {
  e.preventDefault();
  const name     = document.getElementById('enqName').value.trim();
  const phone    = document.getElementById('enqPhone').value.trim();
  const email    = document.getElementById('enqEmail').value.trim();
  const interest = document.getElementById('enqInterest').value;
  const time     = document.getElementById('enqTime').value;
  const message  = document.getElementById('enqMessage').value.trim();
  const msgEl    = document.getElementById('formMsg');

  if (!name || !phone) {
    msgEl.textContent = '⚠ Please fill in name and phone number.';
    msgEl.className = 'form-msg error';
    return;
  }
  const enquiries = JSON.parse(localStorage.getItem('krc_enquiries') || '[]');
  enquiries.unshift({
    id: Date.now(), name, phone, email, interest, time, message,
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New'
  });
  localStorage.setItem('krc_enquiries', JSON.stringify(enquiries));
  msgEl.textContent = "✅ Enquiry sent! We'll contact you within 24 hours.";
  msgEl.className = 'form-msg success';
  document.getElementById('enquiryForm').reset();
}


// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ── STATS COUNTER ──
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.dataset.target);
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 25);
  });
}
const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
  const statsObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObs.disconnect();
    }
  }, { threshold: 0.3 });
  statsObs.observe(statsBar);
}

// ── ENQUIRY FORM ──
function submitEnquiry(e) {
  e.preventDefault();
  const name     = document.getElementById('enqName').value.trim();
  const phone    = document.getElementById('enqPhone').value.trim();
  const email    = document.getElementById('enqEmail').value.trim();
  const interest = document.getElementById('enqInterest').value;
  const time     = document.getElementById('enqTime').value;
  const message  = document.getElementById('enqMessage').value.trim();
  const msgEl    = document.getElementById('formMsg');

  if (!name || !phone) {
    msgEl.textContent = '⚠ Please fill in name and phone number.';
    msgEl.className = 'form-msg error';
    return;
  }

  // Save enquiry to localStorage
  const enquiries = JSON.parse(localStorage.getItem('krc_enquiries') || '[]');
  enquiries.unshift({
    id: Date.now(),
    name, phone, email, interest, time, message,
    date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    status: 'New'
  });
  localStorage.setItem('krc_enquiries', JSON.stringify(enquiries));

  msgEl.textContent = '✅ Enquiry sent! We\'ll contact you within 24 hours.';
  msgEl.className = 'form-msg success';
  document.getElementById('enquiryForm').reset();
}