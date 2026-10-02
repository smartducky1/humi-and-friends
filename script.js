const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzAtDB_H8u2ngJVXNM1OO3U_oBjIuexYiEuljRBqsNZreZxwY0_XCVYiY-FuChgO9yJ/exec";


document.addEventListener("DOMContentLoaded", function () {

  // =========================
  // PAGE NAVIGATION
  // =========================

  function showPage(page) {

    document.querySelectorAll(".page").forEach(function (section) {
      section.classList.remove("active");
    });

    const target = document.getElementById(page);

    if (target) {
      target.classList.add("active");
    }

    window.scrollTo(0, 0);

    history.replaceState(null, "", "#" + page);
  }


  // =========================
  // HOME BUTTONS
  // =========================

  const applyBtn = document.getElementById("applyBtn");
  const artBtn = document.getElementById("artBtn");

  if (applyBtn) {
    applyBtn.addEventListener("click", function () {
      showPage("apply");
    });
  }

  if (artBtn) {
    artBtn.addEventListener("click", function () {
      showPage("art");
    });
  }


  // =========================
  // HAMBURGER
  // =========================

  const hamburgerButtons =
    document.querySelectorAll(".hamburger");

  const navOverlay =
    document.getElementById("navOverlay");

  hamburgerButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      if (navOverlay) {
        navOverlay.classList.toggle("hidden");
      }

    });

  });


  // =========================
  // NAVIGATION MENU
  // =========================

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


  // =========================
  // SUCCESS POPUP
  // =========================

  const successOverlay =
    document.getElementById("successOverlay");

  const closeSuccess =
    document.getElementById("closeSuccess");


  if (closeSuccess && successOverlay) {

    closeSuccess.addEventListener("click", function () {

      successOverlay.classList.add("hidden");

    });

  }


  // =========================
  // WHITELIST FORM
  // =========================

  const whitelistForm =
    document.getElementById("whitelistForm");


  if (whitelistForm) {

    whitelistForm.addEventListener("submit", async function (event) {

      event.preventDefault();


      const quoteInput =
        document.getElementById("quoteLink");

      const tagInput =
        document.getElementById("tagLink");

      const walletInput =
        document.getElementById("wallet");

      const sendButton =
        document.getElementById("sendBtn");


      const quoteLink =
        quoteInput ? quoteInput.value.trim() : "";

      const tagLink =
        tagInput ? tagInput.value.trim() : "";

      const wallet =
        walletInput ? walletInput.value.trim() : "";


      // =========================
      // WALLET VALIDATION
      // =========================

      if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {

        alert("Please enter a valid EVM wallet.");

        return;
      }


      // =========================
      // BUTTON STATE
      // =========================

      if (sendButton) {

        sendButton.disabled = true;
        sendButton.textContent = "SENDING...";

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


        // =========================
        // BACKEND REJECTED
        // =========================

        if (!result.success) {

          alert(
            result.error ||
            "Something went wrong."
          );

          return;
        }


        // =========================
        // SUCCESS
        // =========================

        whitelistForm.reset();


        if (successOverlay) {

          successOverlay.classList.remove("hidden");

        } else {

          alert(
            "Your Application to become HUMI's friend is in the Queue."
          );

        }


      } catch (error) {

        console.error(error);

        alert(
          "Unable to submit your application right now. Please try again."
        );

      } finally {

        if (sendButton) {

          sendButton.disabled = false;
          sendButton.textContent = "SEND";

        }

      }

    });

  }


  // =========================
  // OPEN PAGE FROM HASH
  // =========================

  const currentHash =
    window.location.hash.replace("#", "");


  if (
    currentHash === "apply" ||
    currentHash === "art"
  ) {

    showPage(currentHash);

  } else {

    showPage("home");

  }

});
