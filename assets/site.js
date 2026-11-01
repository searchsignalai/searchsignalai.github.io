
document.addEventListener("DOMContentLoaded", async () => {
  await loadSharedLayout();

  initializeNavigation();
  initializeAnimations();
  initializeTilt();
  initializeWhatsApp();
  updateCopyrightYear();
});


/* =====================================
   LOAD HEADER AND FOOTER
===================================== */

async function loadSharedLayout() {
  const includes = document.querySelectorAll("[data-include]");

  for (const element of includes) {
    const name = element.dataset.include;

    try {
      const response = await fetch(`/partials/${name}.html`);

      if (!response.ok) {
        throw new Error(`${name}.html failed: ${response.status}`);
      }

      element.innerHTML = await response.text();

    } catch (error) {
      console.error("Shared layout error:", error);
    }
  }
}


/* =====================================
   MOBILE NAVIGATION
===================================== */

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".site-header .nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  document.addEventListener("click", event => {
    if (
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}


/* =====================================
   SCROLL REVEAL ANIMATIONS
===================================== */

function initializeAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  elements.forEach(element => {
    observer.observe(element);
  });
}


/* =====================================
   3D TILT EFFECT
===================================== */

function initializeTilt() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 8;
      const rotateY = (x - 0.5) * 8;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* =====================================
   WHATSAPP POPUP
===================================== */

function initializeWhatsApp() {
  const toggle = document.getElementById("whatsappToggle");
  const popup = document.getElementById("whatsappPopup");
  const close = document.getElementById("whatsappClose");
  const widget = document.getElementById("whatsappWidget");

  if (!toggle || !popup || !close || !widget) return;

  function openPopup() {
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
  }

  function closePopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = popup.classList.contains("is-open");

    if (isOpen) {
      closePopup();
    } else {
      openPopup();
    }
  });

  close.addEventListener("click", closePopup);

  document.addEventListener("click", event => {
    if (!widget.contains(event.target)) {
      closePopup();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closePopup();
    }
  });
}


/* =====================================
   COPYRIGHT YEAR
===================================== */

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll("#currentYear");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}
