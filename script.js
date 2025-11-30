document.addEventListener("DOMContentLoaded", () => {
  /* --------- basics --------- */
  const CURRENT_DAY = "19";
  const statusText = document.getElementById("status-text");
  const yearEl = document.getElementById("year");
  statusText.textContent = `Day ${CURRENT_DAY}: Glassmorphic Portfolio`;
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --------- THEME (light / dark / amoled) --------- */
  const THEME_KEY = "site-theme";
  const body = document.body;
  const themeBtn = document.getElementById("theme-toggle");

  // apply a theme name to the body: theme-light | theme-dark | theme-amoled
  function applyTheme(name) {
    body.classList.remove("theme-light", "theme-dark", "theme-amoled");
    if (name === "light") {
      body.classList.add("theme-light");
      themeBtn.textContent = "🌙 Dark";
      themeBtn.setAttribute("aria-pressed", "false");
    } else if (name === "amoled") {
      body.classList.add("theme-amoled");
      themeBtn.textContent = "☀️ Light";
      themeBtn.setAttribute("aria-pressed", "true");
    } else {
      body.classList.add("theme-dark");
      themeBtn.textContent = "⚫ AMOLED";
      themeBtn.setAttribute("aria-pressed", "false");
    }
  }

  // load saved or default to dark
  const saved = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(saved);

  // cycle on click: light -> dark -> amoled -> light ...
  themeBtn.addEventListener("click", () => {
    const current = body.classList.contains("theme-light") ? "light" :
                    body.classList.contains("theme-amoled") ? "amoled" : "dark";
    const next = current === "light" ? "dark" : current === "dark" ? "amoled" : "light";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* --------- Scroll reveal (IntersectionObserver) --------- */
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  reveals.forEach(r => io.observe(r));

  /* --------- Form handling (contact) --------- */
  const contactForm = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");
  const formFeedback = document.getElementById("form-feedback");

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (ev) => {
      ev.preventDefault();

      // clear errors
      ["name-error","email-error","message-error"].forEach(id => {
        const el = document.getElementById(id); if (el) el.textContent = "";
      });
      if (formFeedback) formFeedback.textContent = "";

      const name = (document.getElementById("name") || {}).value || "";
      const email = (document.getElementById("email") || {}).value || "";
      const message = (document.getElementById("message") || {}).value || "";

      let valid = true;
      if (!name.trim()) { document.getElementById("name-error").textContent = "Enter your name"; valid = false; }
      if (!email.trim()) { document.getElementById("email-error").textContent = "Enter your email"; valid = false; }
      else if (!validateEmail(email.trim())) { document.getElementById("email-error").textContent = "Enter a valid email"; valid = false; }
      if (!message.trim()) { document.getElementById("message-error").textContent = "Enter a message"; valid = false; }

      if (!valid) {
        if (formFeedback) {
          formFeedback.style.color = "#ff6b6b";
          formFeedback.textContent = "Please fix the fields above.";
          setTimeout(() => { formFeedback.textContent = ""; }, 3500);
        }
        return;
      }

      // simulate sending
      if (sendBtn) sendBtn.disabled = true;
      if (formFeedback) { formFeedback.style.color = "var(--green)"; formFeedback.textContent = "Sending..."; }

      setTimeout(() => {
        if (formFeedback) { formFeedback.style.color = "var(--green)"; formFeedback.textContent = "Thanks — your message has been sent!"; }
        contactForm.reset();
        if (sendBtn) sendBtn.disabled = false;
        setTimeout(() => { if (formFeedback) formFeedback.textContent = ""; }, 3000);
      }, 900);
    });
  }

  /* --------- Newsletter handling (demo) --------- */
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterFeedback = document.getElementById("newsletter-feedback");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const input = document.getElementById("newsletter-email");
      if (!input || !validateEmail(input.value.trim())) {
        if (newsletterFeedback) {
          newsletterFeedback.style.color = "#ff6b6b";
          newsletterFeedback.textContent = "Enter a valid email.";
          setTimeout(() => { newsletterFeedback.textContent = ""; }, 3000);
        }
        return;
      }
      if (newsletterFeedback) {
        newsletterFeedback.style.color = "var(--green)";
        newsletterFeedback.textContent = "Subscribed — check your inbox (demo).";
        setTimeout(() => { newsletterFeedback.textContent = ""; }, 3000);
      }
      input.value = "";
    });
  }

});
