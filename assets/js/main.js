/**
 * Lin Htet Paing - Modern Portfolio Interaction & Animation Script
 * Senior Frontend Craftsmanship: Scroll Progress, Reveal Animations, Count-Up, and Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Scroll Progress Bar
  const scrollProgress = document.getElementById('scrollProgress');
  const siteHeader = document.getElementById('header');

  const handleScrollEffects = () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.pageYOffset / totalHeight) * 100 : 0;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    // Dynamic Header Elevation
    if (siteHeader) {
      if (window.pageYOffset > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScrollEffects, { passive: true });
  handleScrollEffects();

  // 2. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bi-list');
        icon.classList.toggle('bi-x');
      }
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('bi-list');
          icon.classList.remove('bi-x');
        }
      });
    });
  }

  // 3. Scrollspy for active nav links
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // 4. Scroll-Driven Reveal System (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 5. Senior Animated Metric Counters (Count-Up with Easing)
  const countUpElements = document.querySelectorAll('.count-up');
  let hasAnimatedCounters = false;

  const animateCountUp = () => {
    countUpElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
      const duration = 1800; // ms
      const startTime = performance.now();

      const easeOutQuad = t => t * (2 - t);

      const updateCounter = currentTime => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuad(progress);
        const currentValue = easedProgress * target;

        el.textContent = `${currentValue.toFixed(decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = `${target.toFixed(decimals)}${suffix}`;
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection && 'IntersectionObserver' in window) {
    const metricsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          hasAnimatedCounters = true;
          animateCountUp();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    metricsObserver.observe(metricsSection);
  } else {
    animateCountUp();
  }

  // 6. Project Case Study Details Data
  const projectData = {
    mobile_wallet: {
      client: "Onenex",
      role: "Software Engineer & Backend Lead",
      title: "Mobile Wallet Payment & Microservices Platform",
      stack: ["NestJS", "Strapi CMS", "PostgreSQL", "Microservices", "Docker", "REST APIs"],
      problem: "Enterprise client required a regulated, high-throughput mobile wallet payment system with sub-second API latency and rock-solid ledger consistency.",
      solution: "Engineered distributed microservices using NestJS and PostgreSQL, integrated Strapi CMS for flexible product administration, and built resilient payment gateways.",
      outcomes: ["Sub-500ms Transaction Latency", "Regulated Payment Compliance", "Zero-Loss Transaction Ledger"]
    },
    ims_ai: {
      client: "Enterprise Certification & AI Initiative",
      role: "Full Stack Engineer & AI Pipeline Integrator",
      title: "IMS – AI Face Recognition (InsightFace) & RAG System",
      stack: ["FilamentPHP", "Laravel", "Python 3", "InsightFace", "RAG Pipeline", "MySQL"],
      problem: "Enterprise project and product certification required automated identity verification and semantic search across technical documentation.",
      solution: "Engineered an administrative certification portal in FilamentPHP, integrated Python 3 biometric verification (InsightFace), and built a Retrieval-Augmented Generation (RAG) assistant.",
      outcomes: ["Automated Biometric Matching", "Sub-second Semantic RAG Queries", "Streamlined Certification Lifecycle"]
    },
    ocr_timesheet: {
      client: "Enterprise Operations",
      role: "Full Stack Developer",
      title: "HR Timesheet & Automated Passport OCR System",
      stack: ["FilamentPHP", "Laravel", "Python OCR", "MySQL", "Tailwind CSS"],
      problem: "Manual transcription of passport credentials and time records caused data errors and onboarding delays.",
      solution: "Integrated Optical Character Recognition (OCR) into FilamentPHP forms, enabling automatic parsing, validation, and auto-filling of structured passport data.",
      outcomes: ["95%+ OCR Field Accuracy", "80% Reduction in Onboarding Time", "Real-Time Input Validation"]
    },
    servd_stripe: {
      client: "Alpha Sirius, Singapore",
      role: "Full Stack Developer",
      title: "Servd & ServdOG Digital Commerce with Stripe",
      stack: ["Laravel", "React", "Stripe", "FilamentPHP", "AWS EC2", "PostgreSQL"],
      problem: "Multi-merchant digital food ordering platform required PCI-compliant credit card processing, split payouts, and multi-tenant administrative control.",
      solution: "Integrated Stripe payment gateway with automated webhooks and built clean, maintainable administrative tooling using FilamentPHP following SOLID principles.",
      outcomes: ["Scaled to 50+ Live Merchants", "PCI-Compliant Stripe Checkout", "Extensible Filament Admin"]
    },
    insurance_migration: {
      client: "Meta Team Myanmar / Japan Enterprise",
      role: "Senior Web Developer",
      title: "7 Core Insurance Sub-systems Migration & SQL Optimization",
      stack: ["Laravel", "FuelPHP", "MySQL Schema Optimization", "REST APIs"],
      problem: "High-volume legacy insurance systems written in FuelPHP faced performance bottlenecks and high maintenance overhead.",
      solution: "Led the end-to-end migration of 7 critical insurance sub-systems from FuelPHP to modern Laravel, refactoring schemas and indexing key queries for rapid retrieval.",
      outcomes: ["7 Core Sub-Systems Migrated", "35% Faster SQL Query Response", "Maintained across 3+ Years in Production"]
    },
    social_hrm_nx: {
      client: "Onenex",
      role: "Software Engineer",
      title: "Enterprise HRM & Social Web Monorepo Migration",
      stack: ["NestJS", "Nx Monorepo", "Vue.js", "Laravel", "Jest", "CI/CD"],
      problem: "Growing corporate userbase created architectural friction between monolithic PHP/Vue modules.",
      solution: "Spearheaded the architectural migration to a modern NestJS backend within an Nx monorepo, instituting strict Jest unit testing and automated CI/CD pipelines.",
      outcomes: ["Decoupled Microservice Architecture", "High Test Coverage with Jest", "Frictionless Multi-team CI/CD"]
    }
  };

  // 7. Modal Handlers with Smooth Transitions
  window.openProjectModal = function(key) {
    const data = projectData[key];
    if (!data) return;

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalDetails');
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
      <div style="margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem;">
        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-emerald); font-weight: 700; text-transform: uppercase;">
          ${data.client} • ${data.role}
        </span>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 0.35rem; color: var(--text-primary);">
          ${data.title}
        </h3>
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.25rem;">
        ${data.stack.map(s => `<span class="tech-tag" style="color: var(--accent-emerald);">${s}</span>`).join('')}
      </div>

      <div style="font-size: 0.85rem; line-height: 1.6; display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <strong style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.25rem;">
            Challenge & Context
          </strong>
          <p style="color: var(--text-secondary); margin: 0;">${data.problem}</p>
        </div>

        <div>
          <strong style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.25rem;">
            Engineering Architecture
          </strong>
          <p style="color: var(--text-secondary); margin: 0;">${data.solution}</p>
        </div>

        <div>
          <strong style="color: var(--text-primary); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem;">
            Key Verified Outcomes
          </strong>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.5rem;">
            ${data.outcomes.map(o => `
              <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.6rem; text-align: center; font-weight: 700; font-size: 0.75rem; color: var(--text-primary);">
                ${o}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function() {
    const modal = document.getElementById('projectModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  // Close modal on click outside
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeProjectModal();
      }
    });
  }

  // 8. Filter projects by category with smooth fade/scale
  window.filterProjects = function(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      if (btn.getAttribute('data-filter') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    cards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInCard 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      } else {
        card.style.display = 'none';
      }
    });
  };

  // 9. Copy email to clipboard
  window.copyEmail = function() {
    const email = 'painglynn181@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const btn = document.getElementById('copyEmailBtn');
      if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = `<i class="bi bi-check2"></i> Copied!`;
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2200);
      }
    });
  };

  // 10. Live Timezone Clock (Bangkok UTC+7)
  function updateTimezone() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Bangkok',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    clockEl.textContent = `Bangkok Time: ${timeString} (Active Working Hours)`;
  }
  setInterval(updateTimezone, 1000);
  updateTimezone();

  // 11. Contact Form Feedback Simulator
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('contactStatus');
      if (status) {
        status.style.display = 'block';
        status.innerHTML = `<i class="bi bi-check-circle" style="color: var(--accent-emerald);"></i> Message dispatch simulated! Lynn will reply to your email promptly.`;
        contactForm.reset();
        setTimeout(() => {
          status.style.display = 'none';
        }, 5000);
      }
    });
  }
});

// Card Fade-In Animation Keyframe
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeInCard {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }
`;
document.head.appendChild(styleSheet);