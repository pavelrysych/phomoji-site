(function () {
  "use strict";

  const titles = {
    home: "Phomoji",
    terms: "Terms of Service — Phomoji",
    privacy: "Privacy Policy — Phomoji",
  };

  function parseRoute() {
    const raw = (location.hash || "#").replace(/^#/, "").replace(/^\//, "") || "";
    if (raw === "terms") return "terms";
    if (raw === "privacy") return "privacy";
    return "home";
  }

  function showRoute() {
    const route = parseRoute();
    const ids = ["view-home", "view-terms", "view-privacy"];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const on = id === "view-" + route;
      el.hidden = !on;
      el.setAttribute("aria-hidden", on ? "false" : "true");
    });
    document.title = titles[route] || titles.home;
    window.scrollTo(0, 0);
    const panel = document.querySelector("#view-" + route + " .legal-panel");
    if (panel) panel.scrollTop = 0;
  }

  document.addEventListener("DOMContentLoaded", function () {
    showRoute();
    window.addEventListener("hashchange", showRoute);

    document.querySelectorAll('[data-nav="home"]').forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        location.hash = "#/";
      });
    });
  });
})();
