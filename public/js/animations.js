/* ============================================
   ANIMATIONS JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Nav toggle animation ──
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // ── Hover tilt effect on cards ──
  document.querySelectorAll('.service-card, .testimonial-card, .portfolio-card').forEach((card) => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      this.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  // ── Glow cursor trail ──
  let trail = [];
  const MAX_TRAIL = 12;

  document.addEventListener('mousemove', function (e) {
    trail.push({ x: e.clientX, y: e.clientY });
    if (trail.length > MAX_TRAIL) trail.shift();

    const existing = document.querySelectorAll('.cursor-dot');
    existing.forEach((d, i) => {
      if (trail[i]) {
        d.style.left = trail[i].x + 'px';
        d.style.top = trail[i].y + 'px';
        d.style.opacity = (i / MAX_TRAIL) * 0.4;
      }
    });
  });

  // Create trail dots (subtle, not intrusive)
  if (window.innerWidth > 768) {
    for (let i = 0; i < MAX_TRAIL; i++) {
      const dot = document.createElement('div');
      dot.className = 'cursor-dot';
      dot.style.cssText = `
        position: fixed;
        width: ${4 + i * 0.5}px;
        height: ${4 + i * 0.5}px;
        background: rgba(10, 125, 232, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: opacity 0.3s ease;
        transform: translate(-50%, -50%);
      `;
      document.body.appendChild(dot);
    }
  }

  // ── Hero badge bounce ──
  const badge = document.querySelector('.hero-badge');
  if (badge) {
    badge.style.animation = 'slide-up 0.6s ease both';
  }

  // ── Service card icon hover sound-wave animation ──
  document.querySelectorAll('.service-card').forEach((card) => {
    const icon = card.querySelector('.service-card-icon');
    if (icon) {
      card.addEventListener('mouseenter', function () {
        icon.style.boxShadow = '0 0 0 8px rgba(10, 125, 232, 0.1), 0 0 0 16px rgba(10, 125, 232, 0.05)';
      });
      card.addEventListener('mouseleave', function () {
        icon.style.boxShadow = '';
      });
    }
  });

});
