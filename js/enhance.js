(function () {
  var main = document.querySelector("main");
  if (main && !main.id) main.id = "main";
  if (!document.querySelector(".skip-link")) {
    var skip = document.createElement("a");
    skip.className = "skip-link";
    skip.href = "#main";
    skip.textContent = "Skip to content";
    document.body.insertBefore(skip, document.body.firstChild);
  }

  var nav = document.querySelector(".navbar");
  function onScroll() {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!file) file = "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    var href = (link.getAttribute("href") || "").toLowerCase();
    if (href === file) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  document.querySelectorAll('a[href*="linkedin.com"]:not([aria-label])').forEach(function (a) {
    a.setAttribute("aria-label", "LinkedIn");
  });
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    var rel = a.getAttribute("rel") || "";
    if (rel.indexOf("noopener") === -1) {
      a.setAttribute("rel", (rel + " noopener noreferrer").trim());
    }
  });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var targets = document.querySelectorAll(".card, .cert-card, .project-card");
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-in"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });

  targets.forEach(function (el) {
    el.classList.add("reveal");
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 24 && rect.bottom > 0) {
      el.classList.add("is-in");
    } else {
      io.observe(el);
    }
  });
})();
