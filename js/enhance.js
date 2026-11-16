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
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (nav) nav.classList.toggle("is-scrolled", y > 8);
    if (backBtn) backBtn.classList.toggle("is-visible", y > 280);
  }

  var backBtn = document.querySelector(".back-to-top");
  if (!backBtn) {
    backBtn = document.createElement("button");
    backBtn.type = "button";
    backBtn.className = "back-to-top";
    backBtn.setAttribute("aria-label", "Back to top");
    backBtn.innerHTML =
      '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 3.21l4.65 4.65a.75.75 0 0 1-1.06 1.06L8.75 5.44V12.5a.75.75 0 0 1-1.5 0V5.44L4.41 8.92a.75.75 0 1 1-1.06-1.06L8 3.21z"/></svg>';
    document.body.appendChild(backBtn);
  }

  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var path = (location.pathname || "/").toLowerCase();
  var file = path.split("/").pop();
  var isHome = !file || file === "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    var href = (link.getAttribute("href") || "").toLowerCase();
    var linkIsHome = href === "/" || href === "index.html" || href === "./";
    if ((isHome && linkIsHome) || (!isHome && href === file)) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
    link.addEventListener("click", function () {
      var menu = document.querySelector(".navbar-collapse.show");
      if (!menu || typeof bootstrap === "undefined") return;
      var instance = bootstrap.Collapse.getInstance(menu);
      if (instance) instance.hide();
    });
  });

  document.querySelectorAll('a[href*="linkedin.com"]:not([aria-label])').forEach(function (a) {
    a.setAttribute("aria-label", "LinkedIn");
  });
  document.querySelectorAll('a[href*="github.com"]:not([aria-label])').forEach(function (a) {
    if (!a.textContent.trim()) a.setAttribute("aria-label", "GitHub");
  });
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    var rel = a.getAttribute("rel") || "";
    if (rel.indexOf("noopener") === -1) {
      a.setAttribute("rel", (rel + " noopener noreferrer").trim());
    }
  });

  var targets = document.querySelectorAll(
    ".card, .cert-card, .project-card, .chip-list li, .bg-light.rounded-4.p-3"
  );
  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("is-in");
    });
    return;
  }

  var parentCounts = [];
  function nextDelay(parent) {
    var found = parentCounts.find(function (item) {
      return item.parent === parent;
    });
    if (!found) {
      found = { parent: parent, count: 0 };
      parentCounts.push(found);
    }
    var delay = Math.min(found.count * 70, 280);
    found.count += 1;
    return delay;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach(function (el) {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", nextDelay(el.parentElement) + "ms");
    var rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add("is-in");
    } else {
      io.observe(el);
    }
  });
})();
