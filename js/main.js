/* ════════════════════════════════════════
   KRC FITNESS WORLD — main.js
════════════════════════════════════════ */

// ★ Replace with your real WhatsApp number (91 + 10 digits, no spaces)
const KRC_WA = '918590356186';

// Navbar scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Hamburger
function toggleMenu() {
  document.getElementById('navLinks')?.classList.toggle('open');
  document.getElementById('hamburger')?.classList.toggle('open');
}
function closeNav() {
  document.getElementById('navLinks')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');
}
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  if (nav?.classList.contains('open') && !nav.contains(e.target) && !btn?.contains(e.target)) {
    nav.classList.remove('open');
    btn?.classList.remove('open');
  }
});

// Scroll reveal
const ro = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));

// Stats counter
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (!target) return;
    let n = 0;
    const step = Math.max(1, Math.floor(target / 50));
    const t = setInterval(() => { n = Math.min(n + step, target); el.textContent = n; if (n >= target) clearInterval(t); }, 28);
  });
}
const sb = document.querySelector('.stats-bar');
if (sb) {
  const so = new IntersectionObserver((e) => { if (e[0].isIntersecting) { animateCounters(); so.disconnect(); } }, { threshold: 0.3 });
  so.observe(sb);
}

// Save enquiry before WhatsApp
const enquiries = JSON.parse(localStorage.getItem('krc_enquiries') || '[]');

enquiries.unshift({
  name, phone, interest, branch, time, message,
  date: new Date().toLocaleString()
});

localStorage.setItem('krc_enquiries', JSON.stringify(enquiries));

// WhatsApp enquiry form
function sendToWhatsApp(e) {
  e.preventDefault();
  const name     = document.getElementById('enqName')?.value.trim()    || '';
  const phone    = document.getElementById('enqPhone')?.value.trim()   || '';
  const interest = document.getElementById('enqInterest')?.value       || '';
  const branch   = document.getElementById('enqBranch')?.value         || '';
  const time     = document.getElementById('enqTime')?.value           || '';
  const message  = document.getElementById('enqMessage')?.value.trim() || '';

  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const msg = [
    '🏋️ *KRC Fitness World — New Enquiry*',
    '',
    `👤 *Name:* ${name}`,
    `📞 *Phone:* ${phone}`,
    interest ? `🎯 *Interested In:* ${interest}` : '',
    branch   ? `📍 *Branch:* ${branch}`           : '',
    time     ? `🕐 *Preferred Time:* ${time}`     : '',
    message  ? `💬 *Message:* ${message}`          : '',
  ].filter(Boolean).join('\n');

  window.open(`https://wa.me/${KRC_WA}?text=${encodeURIComponent(msg)}`, '_blank');
  document.getElementById('enquiryForm')?.reset();
}