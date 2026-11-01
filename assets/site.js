
async function loadPartial(name) {
  const target = document.querySelector(`[data-include="${name}"]`);
  if (!target) return;

  try {
    const response = await fetch(`/partials/${name}.html`);
    if (!response.ok) throw new Error(`Could not load ${name}`);

    target.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
  }
}

async function initializeSite() {
  await Promise.all([
    loadPartial("header"),
    loadPartial("footer")
  ]);

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  const whatsappButton = document.getElementById("whatsappButton");
  const whatsappPopup = document.getElementById("whatsappPopup");
  const whatsappClose = document.getElementById("whatsappClose");

  if (whatsappButton && whatsappPopup) {
    whatsappButton.addEventListener("click", () => {
      whatsappPopup.classList.toggle("active");
    });
  }

  if (whatsappClose && whatsappPopup) {
    whatsappClose.addEventListener("click", () => {
      whatsappPopup.classList.remove("active");
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeSite);
