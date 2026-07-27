// ============================================================
// main.js — shared behaviors loaded on every page
// (replaces: Header.jsx scroll/menu state, Reveal.jsx / whileInView
//  scroll animations, FeedLine.jsx in-view animation, Footer.jsx year)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---- Icons (lucide) ----
  if (window.lucide) {
    lucide.createIcons();
  }

  // ---- Header: scrolled state ----
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 12) {
        header.setAttribute("data-scrolled", "true");
      } else {
        header.setAttribute("data-scrolled", "false");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---- Header: mobile nav toggle ----
  var navToggle = document.querySelector(".nav-toggle");
  var navMobile = document.querySelector(".nav-mobile");
  if (navToggle && navMobile) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMobile.classList.toggle("open");
      navToggle.innerHTML = isOpen
        ? '<i data-lucide="x" class="icon" width="24" height="24"></i>'
        : '<i data-lucide="menu" class="icon" width="24" height="24"></i>';
      if (window.lucide) lucide.createIcons();
    });
    // Close mobile nav when a link inside it is clicked
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("open");
        navToggle.innerHTML = '<i data-lucide="menu" class="icon" width="24" height="24"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Scroll reveal (Reveal.jsx / whileInView replacement) ----
  var revealEls = document.querySelectorAll(".reveal, .reveal-sm");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealIO.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.01 }
    );
    revealEls.forEach(function (el) { revealIO.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  }

  // ---- Feed line draw-in (FeedLine.jsx replacement) ----
  var feedLines = document.querySelectorAll(".feed-line-wrap");
  if (feedLines.length && "IntersectionObserver" in window) {
    var feedIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            feedIO.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -40px 0px", threshold: 0.01 }
    );
    feedLines.forEach(function (el) { feedIO.observe(el); });
  } else {
    feedLines.forEach(function (el) { el.classList.add("in-view"); });
  }
});
