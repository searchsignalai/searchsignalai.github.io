
document.addEventListener("DOMContentLoaded", async () => {
  // Load shared header and footer
  const includeElements = document.querySelectorAll("[data-include]");

  for (const element of includeElements) {
    const name = element.dataset.include;

    try {
      const response = await fetch(`/partials/${name}.html`);

      if (!response.ok) {
        throw new Error(`Could not load ${name}: ${response.status}`);
      }

      element.innerHTML = await response.text();
    } catch (error) {
      console.error(error);
    }
  }

  // Mobile navigation
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      if (
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Interactive SEO, AEO and GEO nodes
  const topicData = {
    seo: {
      label: "01 / DISCOVER",
      title: "Search Engine Optimization",
      description:
        "Help search engines discover, crawl and understand your content.",
      link: "/seo.html",
      linkText: "Explore SEO"
    },
    aeo: {
      label: "02 / ANSWER",
      title: "Answer Engine Optimization",
      description:
        "Structure useful information so answer engines can identify clear responses.",
      link: "/aeo.html",
      linkText: "Explore AEO"
    },
    geo: {
      label: "03 / RECOMMEND",
      title: "Generative Engine Optimization",
      description:
        "Make information clear, verifiable and useful in generative search experiences.",
      link: "/geo.html",
      linkText: "Explore GEO"
    }
  };

  const nodes = document.querySelectorAll(".orbit-node");
  const infoLabel = document.getElementById("infoLabel");
  const infoTitle = document.getElementById("infoTitle");
  const infoText = document.getElementById("infoText");
  const infoLink = document.getElementById("infoLink");

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      const topic = topicData[node.dataset.topic];

      if (!topic) return;

      nodes.forEach((item) => item.classList.remove("active"));
      node.classList.add("active");

      const label = document.querySelector(".info-label");

      if (label) label.textContent = topic.label;
      if (infoTitle) infoTitle.textContent = topic.title;
      if (infoText) infoText.textContent = topic.description;

      if (infoLink) {
        infoLink.href = topic.link;
        infoLink.innerHTML = `${topic.linkText} <span>↗</span>`;
      }
    });
  });

  // Subtle 3D movement with pointer
  const scene = document.querySelector(".universe-scene");

  if (scene && window.matchMedia("(pointer: fine)").matches) {
    scene.addEventListener("pointermove", (event) => {
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 12;
      const rotateX = (0.5 - y) * 10;

      scene.style.setProperty("--mx", `${rotateY}deg`);
      scene.style.setProperty("--my", `${rotateX}deg`);
    });

    scene.addEventListener("pointerleave", () => {
      scene.style.setProperty("--mx", "0deg");
      scene.style.setProperty("--my", "0deg");
    });
  }

  // WhatsApp popup, if present in the shared footer
  const whatsappButton = document.getElementById("whatsappButton");
  const whatsappPopup = document.getElementById("whatsappPopup");

  if (whatsappButton && whatsappPopup) {
    whatsappButton.addEventListener("click", () => {
      const isOpen = whatsappPopup.classList.toggle("active");
      whatsappButton.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Current year
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
});
