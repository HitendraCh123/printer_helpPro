// ============================================================
// setupheader.js — SetupHeader.jsx behavior (setup.html only)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  var strip = document.querySelector(".sh-strip");
  if (strip) {
    var onScroll = function () {
      strip.setAttribute("data-scrolled", window.scrollY > 10 ? "true" : "false");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var toggle = document.querySelector(".sh-toggle");
  var mobileNav = document.querySelector(".sh-mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      toggle.innerHTML = isOpen
        ? '<i data-lucide="x" class="icon" width="22" height="22"></i>'
        : '<i data-lucide="menu" class="icon" width="22" height="22"></i>';
      if (window.lucide) lucide.createIcons();
    });
    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-label", "Open menu");
        toggle.innerHTML = '<i data-lucide="menu" class="icon" width="22" height="22"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  var chatToggle = document.querySelector(".sh-chat-toggle");
  var chatBubble = document.querySelector(".sh-chat-bubble");
  if (chatToggle && chatBubble) {
    chatToggle.addEventListener("click", function () {
      var isOpen = chatBubble.classList.toggle("show");
      chatToggle.setAttribute("aria-label", isOpen ? "Close chat" : "Chat with us");
    });
  }
});
