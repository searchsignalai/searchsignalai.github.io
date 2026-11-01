
document.addEventListener("DOMContentLoaded", async () => {
  await loadSharedLayout();

  initializeNavigation();
  initializeAnimations();
  initializeTilt();
  updateCopyrightYear();
});

/* =====================================
   LOAD SHARED HEADER AND FOOTER
===================================== */

async function loadSharedLayout() {
  const includes = document.querySelectorAll("[data-include]");

  for (const element of includes) {
    const name = element.dataset.include;

    try {
      const response = await fetch(`/partials/${name}.html`);

      if (!response.ok) {
        throw new Error(
          `Unable to load ${name}.html. Status: ${response.status}`
        );
      }

      element.innerHTML = await response.text();

    } catch (error) {
      console.error(`Layout loading error:`, error);
    }
  }
}

/* =====================================
   MOBILE NAVIGATION
===================================== */

function initializeNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (!menuToggle || !navLinks) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
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
   DYNAMIC COPYRIGHT YEAR
===================================== */

function updateCopyrightYear() {
  const yearElements = document.querySelectorAll("#currentYear");

  yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}
