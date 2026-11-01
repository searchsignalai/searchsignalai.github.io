
/* ==========================================
   SearchSignal AI
   Shared Header, Footer and UI Interactions
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  loadSharedLayout();
  initializeAnimations();
  initializeTilt();
  updateCopyrightYear();
});

/* Load shared header and footer */

async function loadSharedLayout() {
  const headerContainer = document.getElementById("siteHeader");
  const footerContainer = document.getElementById("siteFooter");

  try {
    if (headerContainer) {
      const response = await fetch("/partials/header.html");

      if (!response.ok) {
        throw new Error("Header could not be loaded.");
      }

      headerContainer.innerHTML = await response.text();
      initializeNavigation();
    }

    if (footerContainer) {
      const response = await fetch("/partials/footer.html");

      if (!response.ok) {
        throw new Error("Footer could not be loaded.");
      }

      footerContainer.innerHTML = await response.text();
      updateCopyrightYear();
    }

  } catch (error) {
    console.error("Shared layout error:", error);
  }
}

/* Mobile navigation */

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "Close" : "Menu";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "Menu";
    });
  });
}

/* Scroll reveal animations */

function initializeAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => {
      element.classList.add("visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  elements.forEach(element => observer.observe(element));
}

/* 5D card tilt effect */

function initializeTilt() {
  const cards = document.querySelectorAll("[data-tilt]");

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(hover: none)").matches
  ) {
    return;
  }

  cards.forEach(card => {
    card.addEventListener("pointermove", event => {
      if (event.pointerType !== "mouse") return;

      const rect = card.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 12;

      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  });
}

/* Automatic copyright year */

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll("#year");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}
