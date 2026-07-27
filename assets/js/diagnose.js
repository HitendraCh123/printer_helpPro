// ============================================================
// diagnose.js — Diagnose.jsx accordion behavior (diagnose.html only)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  var cards = document.querySelectorAll(".issue-card");

  function closeCard(card) {
    var body = card.querySelector(".issue-body");
    card.setAttribute("data-open", "false");
    card.querySelector(".issue-header").setAttribute("aria-expanded", "false");
    body.style.maxHeight = body.scrollHeight + "px"; // set current height first
    requestAnimationFrame(function () {
      body.style.maxHeight = "0px";
    });
  }

  function openCard(card) {
    var body = card.querySelector(".issue-body");
    card.setAttribute("data-open", "true");
    card.querySelector(".issue-header").setAttribute("aria-expanded", "true");
    body.style.maxHeight = body.scrollHeight + "px";
    body.addEventListener("transitionend", function handler(e) {
      if (e.propertyName === "max-height") {
        body.style.maxHeight = "none"; // allow natural resize afterwards
        body.removeEventListener("transitionend", handler);
      }
    });
  }

  cards.forEach(function (card) {
    var header = card.querySelector(".issue-header");
    header.addEventListener("click", function () {
      var isOpen = card.getAttribute("data-open") === "true";
      cards.forEach(function (c) {
        if (c !== card && c.getAttribute("data-open") === "true") {
          // if it was set to "none", reset to px before collapsing
          var b = c.querySelector(".issue-body");
          if (b.style.maxHeight === "none") b.style.maxHeight = b.scrollHeight + "px";
          closeCard(c);
        }
      });
      if (isOpen) {
        var body = card.querySelector(".issue-body");
        if (body.style.maxHeight === "none") body.style.maxHeight = body.scrollHeight + "px";
        closeCard(card);
      } else {
        openCard(card);
      }
    });
  });
});
