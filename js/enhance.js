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

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
