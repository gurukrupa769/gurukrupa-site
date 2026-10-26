
/* =========================================================
   GURUKRUPA XEROX AND SOHAM MULTISERVICES
   Main JavaScript
========================================================= */

"use strict";

/* =========================
   1. MOBILE NAVIGATION
========================= */

function initMobileNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");

  if (!menuToggle || !mainNavigation) {
    return;
  }

  const menuIcon = menuToggle.querySelector("i");

  function closeMenu() {
    mainNavigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    if (menuIcon) {
      menuIcon.classList.remove("bi-x-lg");
      menuIcon.classList.add("bi-list");
    }
  }

  function openMenu() {
    mainNavigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    if (menuIcon) {
      menuIcon.classList.remove("bi-list");
      menuIcon.classList.add("bi-x-lg");
    }
  }

  menuToggle.addEventListener("click", function () {
    const isOpen =
      mainNavigation.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close the mobile menu after a navigation link is selected.
  mainNavigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when the user clicks outside it.
  document.addEventListener("click", function (event) {
    const clickedInsideMenu =
      mainNavigation.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // Close the menu when Escape is pressed.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Reset the menu when switching back to desktop layout.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });
}


/* =========================
   2. AUTOMATIC COPYRIGHT YEAR
========================= */

function initCopyrightYear() {
  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}


/* =========================
   3. ACTIVE NAVIGATION LINK
========================= */

function initActiveNavigation() {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const navigationLinks =
    document.querySelectorAll(".main-navigation .nav-link");

  navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    } else {
      link.classList.remove("active");
      link.removeAttribute("aria-current");
    }
  });
}


/* =========================
   4. SMOOTH INTERNAL LINKS
========================= */

function initInternalAnchorLinks() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (!targetElement) {
        return;
      }

      event.preventDefault();

      targetElement.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches ? "auto" : "smooth",
        block: "start"
      });

      // Update the URL fragment without reloading the page.
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", targetId);
      }
    });
  });
}


/* =========================
   5. PRESELECT SERVICE
   ON THE REQUEST PAGE
========================= */

/*
  Example:
  service-request.html?service=income-tax

  The request page must contain a select element with
  id="serviceType" and options whose values match the
  supported service identifiers.

  This only selects an option. It does not submit a request.
*/

function initServicePreselection() {
  const serviceSelect = document.getElementById("serviceType");

  if (!serviceSelect) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service");

  if (!requestedService) {
    return;
  }

  const allowedServices = [
    "government",
    "form-filling",
    "income-tax",
    "data-entry",
    "documentation",
    "xerox-printing"
  ];

  if (!allowedServices.includes(requestedService)) {
    return;
  }

  const matchingOption = Array.from(serviceSelect.options).find(
    function (option) {
      return option.value === requestedService;
    }
  );

  if (matchingOption) {
    serviceSelect.value = requestedService;
  }
}


/* =========================
   6. FAQ ACCESSIBILITY
========================= */

/*
  The FAQ uses native HTML <details> and <summary> elements.
  The browser already provides keyboard interaction, so no
  extra JavaScript is needed to open or close the answers.
*/


/* =========================
   7. INITIALIZE WEBSITE
========================= */

document.addEventListener("DOMContentLoaded", function () {
  initMobileNavigation();
  initCopyrightYear();
  initActiveNavigation();
  initInternalAnchorLinks();
  initServicePreselection();
});
