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

applyForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const wallet =
    document
      .getElementById("wallet")
      .value
      .trim();


  /* EVM WALLET VALIDATION */

  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {

    alert("Please enter a valid EVM wallet.");

    return;

  }


  /*
    YOUR GOOGLE APPS SCRIPT SUBMISSION
    CODE GOES HERE.

    DO NOT REMOVE THE CODE ABOVE.

    After your backend successfully accepts
    the application, run:

      successOverlay.classList.remove("hidden");

    The popup text is already:

    "Your Application to become HUMI's friend is in the Queue."
  */


  successOverlay.classList.remove("hidden");

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
