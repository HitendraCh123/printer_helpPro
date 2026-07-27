// ============================================================
// manuals.js — Manuals.jsx live search behavior (manuals.html only)
// ============================================================

document.addEventListener("DOMContentLoaded", function () {
  var input = document.getElementById("manual-search-input");
  var grid = document.getElementById("manual-grid");
  var noResults = document.getElementById("no-results");
  var noResultsQuery = document.getElementById("no-results-query");
  if (!input || !grid) return;

  var cards = grid.querySelectorAll("[data-brand-name]");

  input.addEventListener("input", function () {
    var q = input.value.toLowerCase();
    var anyVisible = false;
    cards.forEach(function (card) {
      var name = card.getAttribute("data-brand-name").toLowerCase();
      var match = name.indexOf(q) !== -1;
      card.style.display = match ? "" : "none";
      if (match) anyVisible = true;
    });
    noResults.style.display = anyVisible ? "none" : "flex";
    if (noResultsQuery) noResultsQuery.textContent = input.value;
  });
});
