/* ============ APP.JS — Router & bootstrap ============ */
(function () {

  /* ---- Helpers ---- */
  function fmt(n) {
    return 'Rp\u00A0' + Number(n).toLocaleString('id-ID');
  }

  function stars(rating) {
    const full  = Math.floor(rating);
    const half  = rating - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
  }

  function slugify(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function imgUrl(seed, w = 400, h = 400) {
    return MockImages.getUrl(seed, w, h);
  }

  function renderPage(html) {
    const app = document.getElementById('app');
    app.innerHTML = html;
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Update active nav
    updateActiveNav();
  }

  function showError(msg = 'Terjadi kesalahan.') {
    renderPage(`
      <div class="container page">
        <div class="empty-state">
          <div class="empty-state__icon">😵</div>
          <h3>Oops!</h3>
          <p>${msg}</p>
          <a href="#/" class="btn btn--primary">Kembali ke Home</a>
        </div>
      </div>
    `);
  }

  function updateActiveNav() {
    const hash = location.hash || '#/';
    document.querySelectorAll('.nav-link').forEach(a => {
      a.classList.toggle('active', hash === a.getAttribute('href'));
    });
  }

  /* ---- Router ---- */
  const routes = [
    { pattern: /^#\/?$/,                      handler: () => MockHome.render() },
    { pattern: /^#\/listing\/([^/]+)$/,        handler: m => MockListing.render(m[1]) },
    { pattern: /^#\/product\/([^/]+)$/,        handler: m => MockProductDetail.render(m[1]) },
    { pattern: /^#\/cart$/,                    handler: () => MockCartPage.render() },
    { pattern: /^#\/checkout$/,               handler: () => MockCheckoutPage.render() },
    { pattern: /^#\/invoice\/([^/]+)$/,        handler: m => MockInvoice.render(m[1]) },
    { pattern: /^#\/orders$/,                  handler: () => MockOrdersPage.render() },
    { pattern: /^#\/wishlist$/,                handler: () => MockWishlistPage.render() },
  ];

  function route() {
    const hash = location.hash || '#/';
    for (const r of routes) {
      const m = hash.match(r.pattern);
      if (m) { r.handler(m); return; }
    }
    showError('Halaman tidak ditemukan (404).');
  }

  /* ---- Init ---- */
  function init() {
    // Expose helpers globally
    window.MockFmt = fmt;
    window.MockStars = stars;
    window.MockSlugify = slugify;
    window.MockImgUrl = imgUrl;
    window.MockRenderPage = renderPage;
    window.MockShowError = showError;

    // Hash routing
    window.addEventListener('hashchange', route);

    // DB events
    window.addEventListener('db:ready', () => {
      document.getElementById('loading-screen')?.remove();
      route();
    });

    window.addEventListener('db:error', e => {
      document.getElementById('loading-screen')?.remove();
      showError(`Gagal memuat data: ${e.detail}`);
    });

    // Start DB
    MockDB.init();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
