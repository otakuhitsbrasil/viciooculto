// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 0);

    let diff = midnight - now;
    if (diff < 0) diff = 0;

    const hours   = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const pad = (n) => String(n).padStart(2, '0');

    // Main timer
    const h = document.getElementById('hours');
    const m = document.getElementById('minutes');
    const s = document.getElementById('seconds');
    if (h) h.textContent = pad(hours);
    if (m) m.textContent = pad(minutes);
    if (s) s.textContent = pad(seconds);

    // Urgency bar timer
    const uh = document.getElementById('urg-hours');
    const um = document.getElementById('urg-mins');
    const us = document.getElementById('urg-secs');
    if (uh) uh.textContent = pad(hours);
    if (um) um.textContent = pad(minutes);
    if (us) us.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== SCROLL REVEAL =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 80) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });

document.addEventListener('DOMContentLoaded', () => {
    revealOnScroll();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ===== GOOGLE ADS CONVERSION TRACKING on CTA click =====
document.addEventListener('DOMContentLoaded', () => {
    const ctaLinks = document.querySelectorAll('a[href*="cakto.com.br"]');
    ctaLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'conversion', {
                    'send_to': 'AW-18162933655',
                    'value': 97.0,
                    'currency': 'BRL'
                });
            }
        });
    });
});

// ===== ACTIVE VIEWERS SOCIAL PROOF =====
(function () {
    const label = document.createElement('div');
    label.id = 'viewers-label';
    label.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(10,10,10,0.95);
        border: 1px solid rgba(212,175,55,0.25);
        color: #D4AF37;
        font-family: 'Inter', sans-serif;
        font-size: 0.78rem;
        padding: 8px 18px;
        border-radius: 100px;
        z-index: 9998;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(label);

    function randomViewers() {
        return Math.floor(Math.random() * 12) + 18; // 18–30
    }

    let viewers = randomViewers();
    function updateLabel() {
        label.textContent = `👁 ${viewers} pessoas estão vendo esta página agora`;
        // Subtle drift
        viewers += Math.random() < 0.5 ? 1 : -1;
        viewers = Math.max(12, Math.min(40, viewers));
    }

    updateLabel();
    setInterval(updateLabel, 5000);
})();
