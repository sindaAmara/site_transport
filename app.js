/* ===========================
   CargoLux — app.js
   =========================== */

// ─── NAVBAR: scroll effect + mobile menu ───
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
})();


// ─── SMOOTH REVEAL ON SCROLL ───
(function () {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // stagger siblings in same container
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const idx = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();


// ─── NEXT AVAILABLE SLOT (dynamic) ───
(function () {
  const el = document.getElementById('nextSlot');
  if (!el) return;

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // skip Sunday
  if (tomorrow.getDay() === 0) tomorrow.setDate(tomorrow.getDate() + 1);

  el.textContent = `${days[tomorrow.getDay()]}, ${months[tomorrow.getMonth()]} ${tomorrow.getDate()}`;
})();


// ─── QR CODES ───
// QR codes are now real images: /qrcode1.png (Venmo) and /qrcode2.png (Zelle)
// No JS needed — images are loaded directly in the HTML.


// ─── CONTACT FORM ───
(function () {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fname || !lname || !email) {
      alert('Please fill in the required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    fetch('https://formspree.io/f/xyklbdlv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        'First Name': fname,
        'Last Name': lname,
        'Email': email,
        'Phone': phone,
        'Service': service,
        'Message': message
      })
    })
    .then(r => {
      if (r.ok) {
        showSuccess();
      } else {
        alert('Something went wrong. Please call us at +1 (445) 444-1515.');
      }
    })
    .catch(() => {
      alert('Connection error. Please call us at +1 (445) 444-1515.');
    })
    .finally(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    });
  });

  function showSuccess() {
    form.reset();
    successMsg.style.display = 'block';
    setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
  }
})();


// ─── ACTIVE NAV LINK (scroll spy) ───
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach(s => observer.observe(s));
})();