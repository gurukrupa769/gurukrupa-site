
/* =========================================================
   GURUKRUPA XEROX & SOHAM MULTISERVICES
   Main JavaScript: script.js
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------
     1. AUTOMATIC COPYRIGHT YEAR
  ------------------------------------------------------- */

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------------
     2. HEADER SCROLL EFFECT
  ------------------------------------------------------- */

  const siteHeader = document.querySelector(".site-header");

  const updateHeader = () => {
    if (!siteHeader) return;

    if (window.scrollY > 15) {
      siteHeader.classList.add("header-scrolled");
    } else {
      siteHeader.classList.remove("header-scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  /* -------------------------------------------------------
     3. CLOSE MOBILE NAVIGATION AFTER CLICKING A LINK
  ------------------------------------------------------- */

  const navigationElement = document.getElementById("mainNavigation");

  if (navigationElement && window.bootstrap) {
    const mobileCollapse = bootstrap.Collapse.getOrCreateInstance(
      navigationElement,
      { toggle: false }
    );

    navigationElement.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (
          window.innerWidth < 992 &&
          navigationElement.classList.contains("show")
        ) {
          mobileCollapse.hide();
        }
      });
    });
  }

  /* -------------------------------------------------------
     4. ACTIVE NAVIGATION LINK
     Highlights the current page in the navigation.
  ------------------------------------------------------- */

  const currentPath = window.location.pathname;
  const currentPage = currentPath.split("/").pop() || "index.html";

  document.querySelectorAll(".site-header .navbar-nav .nav-link").forEach(
    (link) => {
      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return;

      const linkPage = href.split("#")[0].split("/").pop();

      if (linkPage && linkPage === currentPage) {
        link.classList.add("active");

        if (link.classList.contains("dropdown-toggle")) {
          link.setAttribute("aria-current", "page");
        }
      } else if (link.classList.contains("active")) {
        link.classList.remove("active");
      }
    }
  );

  /* -------------------------------------------------------
     5. SMOOTH SCROLL FOR SAME-PAGE ANCHORS
  ------------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block: "start"
      });

      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, "", href);
      }
    });
  });

  /* -------------------------------------------------------
     6. BACK-TO-TOP LINK
  ------------------------------------------------------- */

  document.querySelectorAll(".back-to-top").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"
      });
    });
  });

  /* -------------------------------------------------------
     7. IMAGE FALLBACK
     If a gallery image is missing, display a clean placeholder.
  ------------------------------------------------------- */

  document.querySelectorAll(".gallery-image-wrap img").forEach((image) => {
    image.addEventListener("error", () => {
      const wrapper = image.closest(".gallery-image-wrap");

      if (!wrapper || wrapper.dataset.fallbackShown === "true") {
        return;
      }

      wrapper.dataset.fallbackShown = "true";

      image.hidden = true;

      const placeholder = document.createElement("div");
      placeholder.className = "image-placeholder";
      placeholder.setAttribute("role", "img");
      placeholder.setAttribute(
        "aria-label",
        image.alt || "Image currently unavailable"
      );

      const icon = document.createElement("i");
      icon.className = "bi bi-image";
      icon.setAttribute("aria-hidden", "true");

      const message = document.createElement("span");
      message.textContent = "Image coming soon";

      placeholder.append(icon, message);
      wrapper.appendChild(placeholder);
    });
  });

  /* -------------------------------------------------------
     8. PREVENT ACCIDENTAL EMPTY FORM SUBMISSIONS
     Adds basic browser-side feedback to forms that opt in
     with the data-validate attribute.
  ------------------------------------------------------- */

  document.querySelectorAll("form[data-validate]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    });
  });

  /* -------------------------------------------------------
     9. PRINT FILE INPUT DISPLAY
     Optional enhancement for future online-printing forms.

     Add data-file-name to an element beside a file input
     if you want the selected filename displayed there.
  ------------------------------------------------------- */

  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener("change", () => {
      const selector = input.dataset.fileName;

      if (!selector) return;

      const output = document.querySelector(selector);

      if (!output) return;

      if (input.files && input.files.length > 0) {
        output.textContent = Array.from(input.files)
          .map((file) => file.name)
          .join(", ");
      } else {
        output.textContent = "";
      }
    });
  });

  /* -------------------------------------------------------
     10. LOGO / BRAND HOME NAVIGATION
     Standard anchor navigation is intentionally preserved.
  ------------------------------------------------------- */

  /* -------------------------------------------------------
     11. ACCESSIBILITY: ESCAPE KEY FOR OPEN MOBILE MENU
  ------------------------------------------------------- */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!navigationElement || !window.bootstrap) return;

    if (
      window.innerWidth < 992 &&
      navigationElement.classList.contains("show")
    ) {
      bootstrap.Collapse.getOrCreateInstance(
        navigationElement,
        { toggle: false }
      ).hide();
    }
  });

  /* -------------------------------------------------------
     12. READY
  ------------------------------------------------------- */

  document.documentElement.classList.add("js-ready");
});
