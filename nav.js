// Today's Waves — shared navigation
// To add a new country: add a new <li> to the destinations list below.
// This file is loaded by every page on the site.

(function () {
  const navHTML = `
  <header class="site-header">
    <div class="header-inner">
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Main navigation">
        <a href="index.html">Home</a>
        <div class="nav-dropdown">
          <button class="nav-dropdown__trigger" aria-expanded="false" aria-haspopup="true">Destinations</button>
          <ul class="nav-dropdown__menu" role="menu">
            <li><a href="destinations.html" role="menuitem">All Destinations</a></li>
            <li><a href="destinations.html" data-section="hawaii" role="menuitem">Hawaii</a></li>
            <li><a href="destinations.html" data-section="japan" role="menuitem">Japan</a></li>
            <li><a href="destinations.html" data-section="china" role="menuitem">China</a></li>
            <li><a href="destinations.html" data-section="southkorea" role="menuitem">South Korea</a></li>
          </ul>
        </div>
        <a href="index.html#subscribe">Subscribe</a>
        <button class="nav-search-btn" id="search-toggle" aria-label="Search">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="24" y1="24" x2="16.65" y2="16.65"/>
          </svg>
        </button>
      </nav>
    </div>
  </header>`;

  // Inject nav immediately — script tag is at top of body so DOM is ready here
  const placeholder = document.getElementById('site-header');
  if (placeholder) {
    placeholder.outerHTML = navHTML;
  }

  // Attach event listeners after full DOM is ready
  window.addEventListener('DOMContentLoaded', function () {
    // Nav toggle (mobile)
    const toggle = document.getElementById('nav-toggle');
    const siteNav = document.getElementById('site-nav');
    if (toggle && siteNav) {
      toggle.addEventListener('click', () => {
        const open = siteNav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', open);
      });
    }

    // Destinations dropdown
    const dropTrigger = document.querySelector('.nav-dropdown__trigger');
    const dropMenu = document.querySelector('.nav-dropdown__menu');
    if (dropTrigger && dropMenu) {
      dropTrigger.addEventListener('click', e => {
        e.stopPropagation();
        const open = dropMenu.classList.toggle('open');
        dropTrigger.setAttribute('aria-expanded', open);
      });

      document.addEventListener('click', e => {
        if (!e.target.closest('.nav-dropdown')) {
          dropMenu.classList.remove('open');
          dropTrigger.setAttribute('aria-expanded', false);
        }
      });

      dropMenu.querySelectorAll('a[data-section]').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();
          dropMenu.classList.remove('open');
          dropTrigger.setAttribute('aria-expanded', false);
          const section = link.getAttribute('data-section');
          const filterBtn = document.querySelector(`.dest-filter__btn[data-dest="${section}"]`);
          if (filterBtn) {
            filterBtn.click();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.location.href = 'destinations.html#' + section;
          }
        });
      });
    }
  });
})();