/* ============================================
   D BATCHELOR ENTERPRISES - MAIN JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── Navbar scroll effect ──
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('open');
      this.classList.toggle('active');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('active');
      }
    });
  }

  // ── Scroll reveal ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Counter animation ──
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + '+';
    }, 16);
  }

  // ── Typewriter effect (home page) ──
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const words = ['Mobile DJ', 'MC Services', 'Audio Hire', 'Event Hire', 'Entertainment'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWrite() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeWrite, 2000);
        return;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeWrite, 300);
        return;
      }

      setTimeout(typeWrite, isDeleting ? 80 : 120);
    }

    setTimeout(typeWrite, 1200);
  }

  // ── Music notes floating (home page) ──
  const notesContainer = document.getElementById('musicNotes');
  if (notesContainer) {
    const notes = ['♪', '♫', '♬', '♩', '🎵', '🎶'];
    function createNote() {
      const note = document.createElement('span');
      note.className = 'music-note';
      note.textContent = notes[Math.floor(Math.random() * notes.length)];
      note.style.left = Math.random() * 100 + '%';
      note.style.top = Math.random() * 100 + '%';
      note.style.fontSize = (0.8 + Math.random() * 1.5) + 'rem';
      note.style.animationDelay = Math.random() * 4 + 's';
      note.style.animationDuration = (3 + Math.random() * 4) + 's';
      notesContainer.appendChild(note);
      setTimeout(() => note.remove(), 7000);
    }
    setInterval(createNote, 800);
  }

  // ── Particle system ──
  const particlesOverlay = document.getElementById('particles-overlay');
  if (particlesOverlay) {
    for (let i = 0; i < 30; i++) {
      createParticle(particlesOverlay);
    }
  }

  function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${1 + Math.random() * 3}px;
      height: ${1 + Math.random() * 3}px;
      background: rgba(10, 125, 232, ${0.2 + Math.random() * 0.4});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particle-float ${5 + Math.random() * 10}s ease-in-out infinite;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(particle);
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.nav-link').forEach((link) => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // ── Page load entrance ──
  document.body.classList.add('page-load-enter');
});
