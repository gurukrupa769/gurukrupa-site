
// =========================================================
// GURUKRUPA XEROX AND SOHAM MULTISERVICES
// Main JavaScript
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // -------------------------------------------------------
  // 1. MOBILE NAVIGATION
  // -------------------------------------------------------

  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");

  if (menuToggle && mainNavigation) {
    const closeMenu = () => {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");

      const menuIcon = menuToggle.querySelector("i");

      if (menuIcon) {
        menuIcon.classList.remove("bi-x-lg");
        menuIcon.classList.add("bi-list");
      }
    };

    const openMenu = () => {
      mainNavigation.classList.add("is-open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation menu");

      const menuIcon = menuToggle.querySelector("i");

      if (menuIcon) {
        menuIcon.classList.remove("bi-list");
        menuIcon.classList.add("bi-x-lg");
      }
    };

    menuToggle.addEventListener("click", () => {
      const isExpanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close the menu after selecting a navigation link.
    mainNavigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close the menu when clicking outside the navigation.
    document.addEventListener("click", (event) => {
      const clickedInsideNavigation =
        mainNavigation.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (!clickedInsideNavigation && !clickedMenuButton) {
        closeMenu();
      }
    });

    // Close the menu using the Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Close the mobile menu when returning to desktop width.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }


  // -------------------------------------------------------
  // 2. AUTOMATIC COPYRIGHT YEAR
  // -------------------------------------------------------

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // -------------------------------------------------------
  // 3. FAQ: KEEP ONLY ONE ANSWER OPEN AT A TIME
  // -------------------------------------------------------

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (!item.open) {
        return;
      }

      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.open = false;
        }
      });
    });
  });


  // -------------------------------------------------------
  // 4. SMOOTH SCROLL FOR SAME-PAGE LINKS
  // -------------------------------------------------------

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
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
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      // Update the URL hash without causing a second jump.
      if (window.location.hash !== targetId) {
        history.replaceState(null, "", targetId);
      }
    });
  });


  // -------------------------------------------------------
  // 5. BASIC EXTERNAL LINK SAFETY
  // -------------------------------------------------------

  document
    .querySelectorAll('a[target="_blank"]')
    .forEach((link) => {
      link.setAttribute("rel", "noopener noreferrer");
    });

});
