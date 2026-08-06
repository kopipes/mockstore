/* ============ THEME.JS — Theme switcher ============ */
(function () {
  const STORAGE_KEY = 'mockstore_theme';
  const VALID_THEMES = ['light', 'dark', 'gold', 'forest'];
  const DEFAULT = 'light';

  function applyTheme(theme) {
    if (!VALID_THEMES.includes(theme)) theme = DEFAULT;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // Update active button
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  function getSaved() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT;
  }

  // Apply saved theme ASAP to avoid flash
  applyTheme(getSaved());

  // Wire up buttons after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        const open = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!open));
        mobileMenu.hidden = open;
      });
      // Close on link click
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          hamburger.setAttribute('aria-expanded', 'false');
          mobileMenu.hidden = true;
        });
      });
    }
  });

  window.MockTheme = { apply: applyTheme, get: getSaved };
})();
