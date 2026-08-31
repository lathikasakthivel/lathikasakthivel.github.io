(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  var data = window.PORTFOLIO || { projects: [], systems: [] };

  var loader = document.getElementById("loader");
  var nav = document.getElementById("nav");
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var cursor = document.querySelector(".cursor");
  var cursorLabel = document.querySelector(".cursor-label");
  var modal = document.getElementById("modal");
  var modalContent = document.getElementById("modal-content");
  var lastFocus = null;

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function greeting() {
    var hour = new Date().getHours();
    var text = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
    var el = document.getElementById("greeting");
    if (el) el.textContent = text;
  }

  function year() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function hideLoader() {
    if (loader) {
      if (loader.classList.contains("is-done")) {
        goHash();
        return;
      }
      loader.classList.add("is-done");
      loader.setAttribute("aria-hidden", "true");
      window.setTimeout(function () {
        loader.style.display = "none";
        goHash();
      }, reduce ? 0 : 850);
      return;
    }
    goHash();
  }

  function initLoader() {
    if (reduce) {
      hideLoader();
      return;
    }
    var start = Date.now();
    function finish() {
      var wait = Math.max(0, 1100 - (Date.now() - start));
      window.setTimeout(hideLoader, wait);
    }
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);
    window.setTimeout(hideLoader, 1800);
  }

  function goHash() {
    var id = (location.hash || "").replace("#", "");
    if (!id || id === "top") return;
    var el = document.getElementById(id);
    if (!el) return;
    window.setTimeout(function () {
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    }, reduce ? 0 : 200);
  }

  function initNav() {
    if (!nav) return;
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
    var sections = ["about", "skills", "work", "journey", "contact"]
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    function onScroll() {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
      var current = sections[0] && sections[0].id;
      var probe = window.scrollY + 120;
      sections.forEach(function (sec) {
        if (sec.offsetTop <= probe) current = sec.id;
      });
      links.forEach(function (link) {
        var href = link.getAttribute("href") || "";
        link.classList.toggle("is-active", href === "#" + current);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  function closeMenu() {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.remove("is-open");
    mobileMenu.hidden = true;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  }

  function openMenu() {
    mobileMenu.hidden = false;
    mobileMenu.classList.add("is-open");
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
    var first = mobileMenu.querySelector("a");
    if (first) first.focus();
  }

  function initMenu() {
    if (!menuBtn || !mobileMenu) return;
    menuBtn.addEventListener("click", function () {
      if (mobileMenu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });
    mobileMenu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  function initCursor() {
    if (!cursor || coarse || reduce) return;
    document.body.classList.add("has-cursor");
    var x = -100;
    var y = -100;
    var tx = x;
    var ty = y;
    var raf = 0;

    function loop() {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      cursor.style.transform = "translate3d(" + x + "px," + y + "px,0)";
      if (cursorLabel) cursorLabel.style.transform = "translate3d(" + (tx - 18) + "px," + (ty - 8) + "px,0)";
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
    }, { passive: true });

    document.addEventListener("mouseover", function (e) {
      var view = e.target.closest("[data-cursor='view']");
      var link = e.target.closest("a, button, summary, [data-cursor='link']");
      cursor.classList.toggle("is-view", Boolean(view));
      cursor.classList.toggle("is-hover", Boolean(link) && !view);
      if (cursorLabel) cursorLabel.classList.toggle("is-on", Boolean(view));
    });

    raf = requestAnimationFrame(loop);
    window.addEventListener("pagehide", function () { cancelAnimationFrame(raf); });
  }

  function initReveal() {
    var nodes = document.querySelectorAll(".reveal, .stagger");
    if (!nodes.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach(function (n) { n.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    nodes.forEach(function (n) { io.observe(n); });
  }

  function chips(list) {
    return (list || []).map(function (item) {
      return '<span class="chip">' + escapeHtml(item) + "</span>";
    }).join("");
  }

  function flowBits(list) {
    var out = [];
    (list || []).forEach(function (item, i) {
      if (i) out.push('<span class="arrow">→</span>');
      out.push("<span>" + escapeHtml(item) + "</span>");
    });
    return out.join("");
  }

  function renderProjects() {
    var root = document.getElementById("projects");
    if (!root) return;
    root.innerHTML = data.projects.map(function (p, i) {
      var n = String(i + 1).padStart(2, "0");
      return (
        '<button class="project" type="button" data-id="' + escapeHtml(p.id) + '" data-cursor="view" aria-haspopup="dialog">' +
          '<div class="project-visual" aria-hidden="true"><span class="wm">' + n + '</span><div class="flow">' +
            (p.flow || []).map(function (s) { return "<span>" + escapeHtml(s) + "</span>"; }).join("") +
          "</div></div>" +
          '<div class="project-body">' +
            '<p class="project-kind">' + escapeHtml(p.kind) + "</p>" +
            "<h3>" + escapeHtml(p.title) + "</h3>" +
            "<p>" + escapeHtml(p.blurb) + "</p>" +
            '<div class="chips">' + chips((p.stack || []).slice(0, 4)) + "</div>" +
            '<div class="project-foot"><span class="more">Open case study →</span></div>' +
          "</div>" +
        "</button>"
      );
    }).join("");

    root.addEventListener("click", function (e) {
      var btn = e.target.closest(".project");
      if (!btn) return;
      openProject(btn.getAttribute("data-id"));
    });
  }

  function renderSystems() {
    var root = document.getElementById("systems-grid");
    if (!root) return;
    root.innerHTML = data.systems.map(function (s) {
      return (
        '<article class="system">' +
          "<h3>" + escapeHtml(s.title) + "</h3>" +
          "<p>" + escapeHtml(s.text) + "</p>" +
          '<div class="arch">' + flowBits(s.flow) + "</div>" +
        "</article>"
      );
    }).join("");
  }

  function openProject(id) {
    var p = data.projects.filter(function (x) { return x.id === id; })[0];
    if (!p || !modal || !modalContent) return;
    lastFocus = document.activeElement;
    var link = p.github
      ? '<a class="btn btn-ghost" href="' + escapeHtml(p.github) + '" target="_blank" rel="noopener noreferrer">View on GitHub</a>'
      : "";
    modalContent.innerHTML =
      '<p class="project-kind">' + escapeHtml(p.kind) + "</p>" +
      '<h2 id="modal-title">' + escapeHtml(p.title) + "</h2>" +
      '<div class="arch">' + flowBits(p.flow) + "</div>" +
      '<div class="case-grid">' +
        '<div class="case-block"><h3>Problem</h3><p>' + escapeHtml(p.problem) + "</p></div>" +
        '<div class="case-block"><h3>My role</h3><p>' + escapeHtml(p.role) + "</p></div>" +
        '<div class="case-block"><h3>What I learned</h3><p>' + escapeHtml(p.learned) + "</p></div>" +
        '<div class="case-block"><h3>Result</h3><p>' + escapeHtml(p.result) + "</p></div>" +
        '<div class="case-block"><h3>Interesting challenge</h3><p>' + escapeHtml(p.challenge) + "</p></div>" +
        '<div class="case-block"><h3>Key features</h3><ul>' +
          (p.features || []).map(function (f) { return "<li>" + escapeHtml(f) + "</li>"; }).join("") +
        "</ul></div>" +
      "</div>" +
      '<div class="case-block case-extra"><h3>Technologies</h3><div class="chips">' + chips(p.stack) + "</div></div>" +
      '<div class="modal-links">' + link +
        '<button class="btn btn-primary" type="button" data-close="modal">Close</button>' +
      "</div>";

    modal.hidden = false;
    modal.classList.add("is-open");
    document.body.classList.add("modal-open");
    var closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function initModal() {
    if (!modal) return;
    modal.addEventListener("click", function (e) {
      if (e.target.getAttribute("data-close") === "modal") closeModal();
    });
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      var list = Array.prototype.slice.call(modal.querySelectorAll("a, button"));
      if (!list.length) return;
      var first = list[0];
      var last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  function initThink() {
    var root = document.getElementById("think");
    if (!root) return;
    root.addEventListener("toggle", function (e) {
      if (!e.target.open) return;
      Array.prototype.forEach.call(root.querySelectorAll("details"), function (d) {
        if (d !== e.target) d.open = false;
      });
    }, true);
  }

  function initTabs() {
    var tabs = document.querySelectorAll('.skill-switch [role="tab"]');
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        var id = tab.getAttribute("data-panel");
        tabs.forEach(function (t) { t.setAttribute("aria-selected", t === tab ? "true" : "false"); });
        var building = document.getElementById("panel-building");
        var exploring = document.getElementById("panel-exploring");
        if (building) building.hidden = id !== "building";
        if (exploring) exploring.hidden = id !== "exploring";
        var panel = document.getElementById("panel-" + id);
        if (panel) {
          var stagger = panel.querySelector(".stagger");
          if (stagger) stagger.classList.add("is-in");
        }
      });
    });
  }

  function initImages() {
    document.querySelectorAll("img").forEach(function (img) {
      img.addEventListener("error", function () {
        img.classList.add("broken");
        img.alt = img.alt || "Image unavailable";
      });
    });
  }

  function initSmooth() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href").slice(1);
      if (!id) return;
      var target = document.getElementById(id) || (id === "top" ? document.body : null);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", "#" + id);
    });
  }

  function initLightbox() {
    if (!modal || !modalContent) return;
    document.addEventListener("click", function (e) {
      var card = e.target.closest("[data-lightbox]");
      if (!card) return;
      e.preventDefault();
      var src = card.getAttribute("data-lightbox");
      var caption = card.getAttribute("data-caption") || "";
      if (!src) return;
      lastFocus = document.activeElement;
      modalContent.innerHTML =
        '<h2 id="modal-title" class="lightbox-title">' + escapeHtml(caption) + "</h2>" +
        '<img class="lightbox-frame" src="' + escapeHtml(src) + '" alt="' + escapeHtml(caption) + '" />';
      modal.hidden = false;
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
      var closeBtn = modal.querySelector(".modal-close");
      if (closeBtn) closeBtn.focus();
    });
  }

  function initEgg() {
    var terminal = document.querySelector(".terminal");
    if (!terminal) return;
    var taps = 0;
    terminal.addEventListener("click", function () {
      taps += 1;
      if (taps !== 5) return;
      var pre = terminal.querySelector("pre");
      if (!pre || pre.getAttribute("data-egg")) return;
      pre.setAttribute("data-egg", "1");
      pre.insertAdjacentHTML("beforeend", "\n\n<span class=\"cmd\">$ hint</span>\n<span class=\"out\">the interesting bugs are the ones that almost work</span>");
    });
  }

  ready(function () {
    greeting();
    year();
    initLoader();
    initNav();
    initMenu();
    initCursor();
    renderProjects();
    renderSystems();
    initModal();
    initThink();
    initTabs();
    initReveal();
    initImages();
    initSmooth();
    initLightbox();
    initEgg();
  });
})();
