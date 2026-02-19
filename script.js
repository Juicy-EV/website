// ========================================
// JuicyEV — Main Script
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect ----
  const navbar = document.getElementById('navbar');
  const handleScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // ---- Smooth scroll for all anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a:not(.btn)');

  const updateActiveNav = () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', updateActiveNav);

  // ---- Scroll reveal animation ----
  const revealElements = () => {
    const reveals = document.querySelectorAll(
      '.feature-card, .tech-card, .stat-card, .team-card, .mission-pillar, ' +
      '.vision-text, .vision-image, .waitlist-card, .section-title, .section-label'
    );
    reveals.forEach(el => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
      }
    });

    document.querySelectorAll('.reveal').forEach(el => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', revealElements);
  // Initial check
  setTimeout(revealElements, 100);

  // ---- Stat bar animation on scroll ----
  const statBars = document.querySelectorAll('.stat-bar-fill');
  let statAnimated = false;

  const animateStats = () => {
    if (statAnimated) return;
    const marketSection = document.getElementById('market');
    if (!marketSection) return;
    const top = marketSection.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      statBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
      statAnimated = true;
    }
  };
  window.addEventListener('scroll', animateStats);

  // ---- Toast notification helper ----
  const showToast = (message) => {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  };

  // ---- Form submissions ----
  const heroForm = document.getElementById('heroForm');
  const waitlistForm = document.getElementById('waitlistForm');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const emailInput = e.target.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (email) {
      showToast(`Thanks! We'll reach out to ${email} soon.`);
      emailInput.value = '';
    }
  };

  heroForm.addEventListener('submit', handleFormSubmit);
  waitlistForm.addEventListener('submit', handleFormSubmit);

  // ---- Parallax effect on hero orbs ----
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 12;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

});
