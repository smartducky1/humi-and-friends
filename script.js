const pages = {
  home: document.getElementById("home"),
  apply: document.getElementById("apply"),
  art: document.getElementById("art")
};

const navOverlay = document.getElementById("navOverlay");

const applyBtn = document.getElementById("applyBtn");
const artBtn = document.getElementById("artBtn");

const menuApply = document.getElementById("menuApply");
const menuArt = document.getElementById("menuArt");

const successOverlay = document.getElementById("successOverlay");
const closeSuccess = document.getElementById("closeSuccess");

const applyForm = document.getElementById("applyForm");


/* ================= PAGE NAVIGATION ================= */

function showPage(pageName) {

  Object.values(pages).forEach(page => {
    page.classList.add("hidden");
  });

  pages[pageName].classList.remove("hidden");

  navOverlay.classList.add("hidden");

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  history.replaceState(
    null,
    "",
    `#${pageName}`
  );
}


/* ================= OPEN MENU ================= */

function openMenu() {
  navOverlay.classList.remove("hidden");
}


/* ================= CLOSE MENU ================= */

function closeMenu() {
  navOverlay.classList.add("hidden");
}


/* ================= HOME BUTTONS ================= */

applyBtn.addEventListener("click", () => {
  showPage("apply");
});


artBtn.addEventListener("click", () => {
  showPage("art");
});


/* ================= HAMBURGER ================= */

menuApply.addEventListener("click", () => {
  openMenu();
});


menuArt.addEventListener("click", () => {
  openMenu();
});


/* ================= CLOSE MENU OUTSIDE ================= */

navOverlay.addEventListener("click", (event) => {

  if (event.target === navOverlay) {
    closeMenu();
  }

});


/* ================= NAV MENU ================= */

document
  .querySelectorAll(".nav-menu button")
  .forEach(button => {

    button.addEventListener("click", () => {

      const page = button.dataset.page;

      /*
        HOME      -> landing page
        APPLY WL  -> whitelist page
        ART       -> art page
      */

      showPage(page);

    });

  });


/* ================= SUCCESS POPUP ================= */

closeSuccess.addEventListener("click", () => {

  successOverlay.classList.add("hidden");

});


/* ================= APPLY FORM ================= */

const APPS_SCRIPT_URL = "/api/submit";

applyForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const wallet =
    document
      .getElementById("wallet")
      .value
      .trim();

  console.log("WALLET READ BY SCRIPT:", wallet);
  console.log("WALLET LENGTH:", wallet.length);
  console.log("WALLET VALID:", /^0x[a-fA-F0-9]{40}$/.test(wallet));

  const quoteLink =
    document
      .getElementById("quoteLink")
      .value
      .trim();

  const tagLink =
    document
      .getElementById("tagLink")
      .value
      .trim();


  /* EVM WALLET VALIDATION */

  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {

    alert("Please enter a valid EVM wallet.");

    return;

  }


  try {

    const response = await fetch(APPS_SCRIPT_URL, {

      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },

      body: JSON.stringify({
        quoteLink: quoteLink,
        tagLink: tagLink,
        wallet: wallet
      })

    });


    const result = await response.json();


    /* BACKEND ERROR */

    if (!result.success) {

      alert(result.error || "Submission failed.");

      return;

    }


    /* SUCCESS */

    successOverlay.classList.remove("hidden");


    /* Clear the form */

    applyForm.reset();


  } catch (error) {

    console.error("Submission error:", error);

    alert("Unable to submit your application. Please try again.");

  }

});


/* ================= LOAD PAGE FROM URL ================= */

function loadPageFromHash() {

  const hash =
    window.location.hash
      .replace("#", "")
      .toLowerCase();


  if (hash === "apply") {

    showPage("apply");

  }

  else if (hash === "art") {

    showPage("art");

  }

  else {

    showPage("home");

  }

}

window.addEventListener(
  "hashchange",
  loadPageFromHash
);


loadPageFromHash();
