(function () {
  "use strict";

  const titles = {
    home: "Phomoji — Your forgotten photos, rediscovered.",
    terms: "Terms of Service — Phomoji",
    privacy: "Privacy Policy — Phomoji",
  };

  function parseRoute() {
    const raw = (location.hash || "#").replace(/^#/, "").replace(/^\//, "") || "";
    if (raw === "terms") return "terms";
    if (raw === "privacy") return "privacy";
    return "home";
  }

  function closeSheets() {
    location.hash = "#/";
  }

  function showRoute() {
    const route = parseRoute();
    const termsOpen = route === "terms";
    const privacyOpen = route === "privacy";
    const anyOpen = termsOpen || privacyOpen;

    const sheetTerms = document.getElementById("sheet-terms");
    const sheetPrivacy = document.getElementById("sheet-privacy");
    const backdrop = document.getElementById("sheet-backdrop");

    if (sheetTerms) {
      sheetTerms.classList.toggle("is-open", termsOpen);
      sheetTerms.setAttribute("aria-hidden", termsOpen ? "false" : "true");
    }
    if (sheetPrivacy) {
      sheetPrivacy.classList.toggle("is-open", privacyOpen);
      sheetPrivacy.setAttribute("aria-hidden", privacyOpen ? "false" : "true");
    }
    if (backdrop) {
      backdrop.classList.toggle("is-visible", anyOpen);
      backdrop.setAttribute("aria-hidden", anyOpen ? "false" : "true");
    }

    document.body.classList.toggle("sheet-open", anyOpen);
    document.title = titles[route] || titles.home;
    window.scrollTo(0, 0);

    const activePanel = termsOpen
      ? document.querySelector("#sheet-terms .legal-panel")
      : privacyOpen
        ? document.querySelector("#sheet-privacy .legal-panel")
        : null;
    if (activePanel) activePanel.scrollTop = 0;
  }

  document.addEventListener("DOMContentLoaded", function () {
    /* Пауза без рамки, затем плавное появление «паспарту» */
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.setTimeout(function () {
        document.documentElement.classList.add("frame-ready");
      }, 550);
    }

    showRoute();
    window.addEventListener("hashchange", showRoute);

    document.querySelectorAll('[data-nav="home"]').forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        closeSheets();
      });
    });

    document.querySelectorAll("[data-close-sheet]").forEach(function (el) {
      el.addEventListener("click", function () {
        if (document.body.classList.contains("sheet-open")) {
          closeSheets();
        }
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && document.body.classList.contains("sheet-open")) {
        closeSheets();
      }
    });
  });
})();
