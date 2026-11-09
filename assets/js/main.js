/**
 * Lin Htet Paing - Modern Portfolio Interaction Script
 * Senior Frontend Craftsmanship
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
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

  // Scrollspy for active nav links
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

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Project Case Study Details Data
  const projectData = {
    fintech: {
      client: "Onenex Fintech Solutions",
      role: "Lead Backend & Integration Engineer",
      title: "2C2P Payment Gateway & Settlement Engine",
      stack: ["Laravel", "2C2P REST API", "React", "MySQL", "Redis", "Docker"],
      problem: "Enterprise merchant clients needed seamless card and local QR payment processing with sub-second response times, automated transaction ledgering, and PCI-compliant token handling.",
      solution: "Engineered secure backend webhooks, transactional idempotency tokens, and real-time reconciliation dashboards using Laravel queues and Redis cache.",
      outcomes: ["99.98% Transaction Uptime", "Zero-loss Settlement Ledger", "Under 600ms Checkout Latency"]
    },
    servd: {
      client: "Alpha Sirius, Singapore",
      role: "Senior Full-Stack Engineer",
      title: "ServdOG & ServdMM Digital Commerce",
      stack: ["React", "Redux", "PHP", "AWS EC2", "Git Workflow", "PostgreSQL"],
      problem: "Scaling digital menu ordering and omni-channel customer accounts across multiple food and retail merchants in Singapore and Myanmar.",
      solution: "Spearheaded front-to-back architecture, modular state management with Redux, dynamic restaurant catalog filters, and automated EC2 deployment workflows.",
      outcomes: ["Scaled across 50+ merchants", "60% faster checkout funnel", "Multi-currency support"]
    },
    pos: {
      client: "Hospitality & Retail Clients",
      role: "System Architect",
      title: "Restaurant & Retail Multi-Tenant POS Platform",
      stack: ["Laravel", "Vue.js", "WebSockets", "PostgreSQL", "IndexedDB"],
      problem: "F&B environments require reliable table order routing, bill splitting, and offline resiliency during intermittent internet outages.",
      solution: "Designed local browser storage synchronization with backend WebSocket event broadcasting, real-time kitchen display units, and inventory decrements.",
      outcomes: ["Offline order queuing", "Sub-100ms kitchen routing", "Multi-tax & tip calculation"]
    },
    lms: {
      client: "Onenex & International Enterprise Clients",
      role: "Full-Stack Software Engineer",
      title: "Enterprise LMS & Employee Recognition Platform",
      stack: ["Next.js", "Laravel", "Zustand", "Docker", "Tailwind CSS"],
      problem: "Companies required a unified platform for corporate compliance training, employee milestone tracking, and custom badge rewards.",
      solution: "Built a reactive Next.js client with modular course progression trackers, automated certificate generators, and internal social badge awards.",
      outcomes: ["1,000+ Active learners", "Gamified peer recognition", "Automated compliance audits"]
    },
    insurance: {
      client: "Seattle Consulting / Japanese Enterprise",
      role: "Senior Web Developer",
      title: "Japan Enterprise Insurance & Microservices System",
      stack: ["Java Spring Boot", "FuelPHP", "Laravel", "MySQL", "AWS"],
      problem: "Legacy insurance policy processing system needed consolidation into high-security microservices complying with strict Japanese insurance regulations.",
      solution: "Refactored legacy FuelPHP modules into structured Laravel and Spring services with automated validation rules and comprehensive unit testing.",
      outcomes: ["Strict regulatory compliance", "40% reduction in policy processing errors", "Maintained across 3+ years"]
    },
    shipping: {
      client: "Seattle Consulting / Maritime Logistics",
      role: "Software Engineer",
      title: "Automated Shipping & Freight Logistics Platform",
      stack: ["Java (Spring MVC, Struts2)", "Oracle / MySQL", "Jenkins"],
      problem: "High-volume container shipment tracking required synchronized billing, port manifests, and scheduled customs notifications.",
      solution: "Engineered core batch processing routines, EDI interface parsers, and transactional customs status pipelines.",
      outcomes: ["Automated manifest generation", "Zero container data mismatch", "Production stability"]
    }
  };

  // Modal handlers
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

  // Filter projects by category
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
      } else {
        card.style.display = 'none';
      }
    });
  };

  // Copy email to clipboard
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

  // Live Timezone Clock (Bangkok / Yangon UTC+7)
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
    clockEl.textContent = `Bangkok / Yangon: ${timeString} (Active Working Hours)`;
  }
  setInterval(updateTimezone, 1000);
  updateTimezone();

  // Contact Form Feedback Simulator
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