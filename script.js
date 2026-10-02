const pages = document.querySelectorAll(".page");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");
const wlForm = document.getElementById("wlForm");

function showPage(pageId) {
  pages.forEach(page => page.classList.remove("active"));
  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");
  history.replaceState(null, "", `#${pageId}`);
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", () => showPage(button.dataset.page));
});

function openMenu() {
  // Navigation stays simple for now. The exact hamburger menu behavior
  // can be connected to the final UI once its menu design is provided.
  showPage("home");
}

document.getElementById("applyMenu").addEventListener("click", openMenu);
document.getElementById("artMenu").addEventListener("click", openMenu);

function validEvmWallet(wallet) {
  return /^0x[a-fA-F0-9]{40}$/.test(wallet.trim());
}

wlForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const wallet = document.getElementById("wallet").value.trim();

  if (!validEvmWallet(wallet)) {
    alert("Please enter a valid EVM wallet address.");
    return;
  }

  // Frontend-only success state for the initial GitHub/Vercel build.
  // This is the exact success message requested:
  successModal.classList.add("open");
  successModal.setAttribute("aria-hidden", "false");
});

closeModal.addEventListener("click", () => {
  successModal.classList.remove("open");
  successModal.setAttribute("aria-hidden", "true");
});

successModal.addEventListener("click", (event) => {
  if (event.target === successModal) {
    successModal.classList.remove("open");
    successModal.setAttribute("aria-hidden", "true");
  }
});

function loadRoute() {
  const route = location.hash.replace("#", "");
  if (route === "apply" || route === "art") {
    showPage(route);
  } else {
    showPage("home");
  }
}

window.addEventListener("hashchange", loadRoute);
loadRoute();
