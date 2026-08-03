// nav.js — single source of truth for the "Destinations" dropdown menu
// and the filter bar on destinations.html.
//
// TO ADD A NEW COUNTRY/DESTINATION:
//   1. Add one line to the DESTINATIONS array below (slug + label).
//   2. Add a matching filter button... actually you don't have to — it's generated automatically.
//   3. On destinations.html, add a new <section class="dest-group" id="SLUG" data-dest="SLUG"> block
//      with that destination's posts (this is the only manual step left).
//
// This file is loaded by every page, so the dropdown updates everywhere automatically —
// no need to edit index.html or any individual post page ever again.

const DESTINATIONS = [
  { slug: 'southkorea', label: 'South Korea' },
  { slug: 'china',      label: 'China' },
  { slug: 'japan',      label: 'Japan' },
  { slug: 'hawaii',     label: 'Hawaii' },
];

// Build the "Destinations" dropdown in the header nav (present on every page)
(function buildDestinationsDropdown() {
  const menu = document.querySelector('.nav-dropdown__menu');
  if (!menu) return;
  const items = ['<li><a href="destinations.html" role="menuitem">All Destinations</a></li>']
    .concat(DESTINATIONS.map(d => `<li><a href="destinations.html#${d.slug}" role="menuitem">${d.label}</a></li>`));
  menu.innerHTML = items.join('');
})();

// Build the filter bar at the top of destinations.html (only present on that page)
(function buildFilterBar() {
  const bar = document.getElementById('dest-filter');
  if (!bar) return;
  const allBtn = '<button class="dest-filter__btn active" data-dest="all">All</button>';
  const destBtns = DESTINATIONS
    .map(d => `<button class="dest-filter__btn" data-dest="${d.slug}">${d.label}</button>`)
    .join('');
  bar.innerHTML = allBtn + destBtns;
})();
