const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzAtDB_H8u2ngJVXNM1OO3U_oBjIuexYiEuljRBqsNZreZxwY0_XCVYiY-FuChgO9yJ/exec";


// ===============================
// PAGE NAVIGATION
// ===============================

function showPage(page) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((section) => {
    section.classList.remove("active");
  });

  const target = document.getElementById(page);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  history.replaceState(null, "", "#" + page);
}


// ===============================
// HOME BUTTONS
// ===============================

document.addEventListener("DOMContentLoaded", function () {

  const applyButton = document.getElementById("applyBtn");
  const artButton = document.getElementById("artBtn");

  if (applyButton) {
    applyButton.addEventListener("click", function () {
      showPage("apply");
    });
  }

  if (artButton) {
    artButton.addEventListener("click", function () {
      showPage("art");
    });
  }


  // ===============================
  // HAMBURGER MENU
  // ===============================

  const menuButton = document.querySelector(".hamburger");
  const navOverlay = document.getElementById("navOverlay");

  if (menuButton && navOverlay) {
    menuButton.addEventListener("click", function () {
      navOverlay.classList.toggle("hidden");
    });
  }


  // ===============================
  // NAVIGATION LINKS
  // ===============================

  const navHome = document.getElementById("navHome");
  const navApply = document.getElementById("navApply");
  const navArt = document.getElementById("navArt");

  if (navHome) {
    navHome.addEventListener("click", function () {
      showPage("home");

      if (navOverlay) {
        navOverlay.classList.add("hidden");
      }
    });
  }

  if (navApply) {
    navApply.addEventListener("click", function () {
      showPage("apply");

      if (navOverlay) {
        navOverlay.classList.add("hidden");
      }
    });
  }

  if (navArt) {
    navArt.addEventListener("click", function () {
      showPage("art");

      if (navOverlay) {
        navOverlay.classList.add("hidden");
      }
    });
  }


  // ===============================
  // SUCCESS POPUP
  // ===============================

  const successOverlay = document.getElementById("successOverlay");
  const closeSuccess = document.getElementById("closeSuccess");

  if (closeSuccess && successOverlay) {
    closeSuccess.addEventListener("click", function () {
      successOverlay.classList.add("hidden");
    });
  }


  // ===============================
  // WHITELIST FORM
  // ===============================

  const whitelistForm = document.getElementById("whitelistForm");

  if (whitelistForm) {

    whitelistForm.addEventListener("submit", async function (event) {

      event.preventDefault();


      // Get form inputs
      const quoteInput =
        document.querySelector('input[name="quoteLink"]') ||
        document.getElementById("quoteLink");

      const tagInput =
        document.querySelector('input[name="tagLink"]') ||
        document.getElementById("tagLink");

      const walletInput =
        document.querySelector('input[name="wallet"]') ||
        document.getElementById("wallet");


      const quoteLink = quoteInput
        ? quoteInput.value.trim()
        : "";

      const tagLink = tagInput
        ? tagInput.value.trim()
        : "";

      const wallet = walletInput
        ? walletInput.value.trim()
        : "";


      // ===============================
      // WALLET VALIDATION
      // ===============================

      if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {

        alert("Please enter a valid EVM wallet.");

        return;
      }


      // ===============================
      // SUBMIT TO GOOGLE APPS SCRIPT
      // ===============================

      const submitButton =
        whitelistForm.querySelector('button[type="submit"]') ||
        document.getElementById("sendBtn");


      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "SENDING...";
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


        // ===============================
        // BACKEND ERROR
        // ===============================

        if (!result.success) {

          alert(result.error || "Something went wrong.");

          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "SEND";
          }

          return;
        }


        // ===============================
        // SUCCESS
        // ===============================

        if (successOverlay) {

          successOverlay.classList.remove("hidden");

        } else {

          alert(
            "Your Application to become HUMI's friend is in the Queue."
          );

        }


        // Clear form
        whitelistForm.reset();


      } catch (error) {

        console.error("Submission error:", error);

        alert(
          "Unable to submit your application right now. Please try again."
        );

      }


      // Restore button
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "SEND";
      }

    });
  }


  // ===============================
  // LOAD PAGE FROM URL
  // ===============================

  const hash = window.location.hash.replace("#", "");

  if (hash === "apply") {
    showPage("apply");
  } else if (hash === "art") {
    showPage("art");
  } else {
    showPage("home");
  }

});
