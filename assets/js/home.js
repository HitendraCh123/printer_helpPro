// ============================================================
// home.js — Home.jsx behavior (index.html only)
// ============================================================

function detectOS() {
  var ua = window.navigator.userAgent;
  if (ua.indexOf("Win") !== -1) return "Windows";
  if (ua.indexOf("Mac") !== -1) return "macOS";
  if (ua.indexOf("Linux") !== -1) return "Linux";
  if (ua.indexOf("Android") !== -1) return "Android";
  if (ua.indexOf("like Mac") !== -1) return "iOS";
  return "your device";
}

document.addEventListener("DOMContentLoaded", function () {
  var os = detectOS();
  var osValueEls = document.querySelectorAll("[data-os-value]");
  osValueEls.forEach(function (el) { el.textContent = os; });

  var modalOverlay = document.getElementById("os-modal-overlay");
  var openBtn = document.getElementById("open-os-modal");
  var closeBtn = document.getElementById("os-modal-close");
  var modalCard = document.getElementById("os-modal-card");
  var yesBtn = document.getElementById("os-yes-continue");
  var noBtn = document.getElementById("os-choose-manually");

  function openModal() {
    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
    // next frame so the "open" (display) change registers before transition
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        modalOverlay.classList.add("show");
      });
    });
  }

  function closeModal() {
    modalOverlay.classList.remove("show");
    document.body.style.overflow = "";
    setTimeout(function () {
      modalOverlay.classList.remove("open");
    }, 220);
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", function (e) {
      if (e.target === modalOverlay) closeModal();
    });
  }
  if (modalCard) {
    modalCard.addEventListener("click", function (e) { e.stopPropagation(); });
  }
  if (yesBtn) {
    yesBtn.addEventListener("click", function () {
      closeModal();
      window.location.href = "setup.html?os=" + encodeURIComponent(os);
    });
  }
  if (noBtn) {
    noBtn.addEventListener("click", function () {
      closeModal();
      window.location.href = "setup.html";
    });
  }
});
