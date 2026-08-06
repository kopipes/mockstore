/* ============ render/listing.js — Product listing page ============ */
(function () {
  let _state = {
    categorySlug: 'all',
    search: '',
    sort: 'featured',
    page: 1,
    perPage: 20
  };

  function render(categorySlug = 'all') {
    _state = { categorySlug, search: '', sort: 'featured', page: 1, perPage: 20 };

    MockRenderPage(`
      <div class="container page">
        <div id="listing-breadcrumb"></div>
        <div class="listing-header">
          <div class="listing-title-row">
            <h1 id="listing-title" class="page-title">Semua Produk</h1>
            <span id="listing-count" class="text-muted" style="font-size:.9rem"></span>
          </div>
          <div class="listing-controls">
            <div class="search-bar">
              <span class="search-bar__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </span>
              <input type="search" id="listing-search" placeholder="Cari produk…" aria-label="Cari produk" value="">
            </div>
            <select id="listing-sort" class="form-select" style="width:auto" aria-label="Urutkan">
              <option value="featured">Unggulan</option>
              <option value="newest">Terbaru</option>
              <option value="price_asc">Harga: Termurah</option>
              <option value="price_desc">Harga: Termahal</option>
              <option value="rating">Rating Tertinggi</option>
            </select>
          </div>
        </div>

        <!-- Subcategory chips -->
        <div id="category-chips" class="chips-row"></div>

        <!-- Grid -->
        <div id="product-grid-container">
          <div class="product-grid" id="product-grid">
            ${Array(8).fill(0).map(() => `
              <div class="product-card-skeleton">
                <div class="skeleton" style="aspect-ratio:1;border-radius:var(--card-radius) var(--card-radius) 0 0"></div>
                <div style="padding:.85rem">
                  <div class="skeleton" style="height:12px;width:60%;margin-bottom:.5rem"></div>
                  <div class="skeleton" style="height:16px;margin-bottom:.5rem"></div>
                  <div class="skeleton" style="height:12px;width:40%"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Pagination -->
        <div id="listing-pagination" class="pagination"></div>
      </div>
    `);

    MockDB.onReady(() => {
      loadListing();
      bindControls();
    });
  }

  function loadListing() {
    const { categorySlug, search, sort, page, perPage } = _state;
    const offset = (page - 1) * perPage;

    // Title & breadcrumb
    let titleText = 'Semua Produk';
    if (categorySlug === 'luxury') titleText = '✨ Luxury Goods';
    else if (categorySlug === 'food') titleText = '🍽 Premium Food';
    else {
      const cat = MockDB.getCategoryBySlug(categorySlug);
      if (cat) titleText = cat.name;
    }

    const titleEl = document.getElementById('listing-title');
    if (titleEl) titleEl.textContent = titleText;

    // Breadcrumb
    const bcEl = document.getElementById('listing-breadcrumb');
    if (bcEl) {
      bcEl.innerHTML = `
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__current">${titleText}</span>
        </nav>`;
    }

    // Subcategory chips
    const allCats = MockDB.getCategories();
    const chipsEl = document.getElementById('category-chips');
    if (chipsEl) {
      const typeFilter = (categorySlug === 'luxury' || categorySlug === 'food') ? categorySlug : null;
      const filtered = typeFilter ? allCats.filter(c => c.type === typeFilter) : allCats;
      const parentSlug = categorySlug;
      chipsEl.innerHTML = `
        <div class="chips-row">
          <button class="chip ${parentSlug === categorySlug ? 'active' : ''}" data-chip="all-${parentSlug}">Semua</button>
          ${filtered.map(c => `<button class="chip ${_state.categorySlug === c.slug ? 'active' : ''}" data-chip="${c.slug}">${c.icon || ''} ${c.name}</button>`).join('')}
        </div>`;
      chipsEl.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const val = chip.dataset.chip;
          _state.categorySlug = val.startsWith('all-') ? parentSlug : val;
          _state.page = 1;
          loadListing();
        });
      });
    }

    // Products
    const products = MockDB.getProducts({ categorySlug, search, sort, limit: perPage, offset });
    const total = MockDB.countProducts({ categorySlug, search });
    const totalPages = Math.ceil(total / perPage);

    const countEl = document.getElementById('listing-count');
    if (countEl) countEl.textContent = `${total} produk`;

    const grid = document.getElementById('product-grid');
    if (!grid) return;

    if (products.length === 0) {
      grid.innerHTML = '';
      document.getElementById('product-grid-container').innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h3>Produk tidak ditemukan</h3>
          <p>Coba ubah kata kunci atau filter pencarian.</p>
          <button class="btn btn--outline" onclick="_mockListingReset()">Reset Filter</button>
        </div>`;
      window._mockListingReset = () => {
        _state.search = ''; _state.page = 1;
        document.getElementById('listing-search').value = '';
        loadListing();
      };
    } else {
      grid.innerHTML = products.map(p => MockHome.renderProductCard(p)).join('');
      MockHome.bindWishlistBtns();
    }

    // Pagination
    renderPagination(page, totalPages);
  }

  function renderPagination(current, total) {
    const el = document.getElementById('listing-pagination');
    if (!el || total <= 1) { if (el) el.innerHTML = ''; return; }

    let pages = [];
    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - 2 && i <= current + 2)) pages.push(i);
      else if (pages[pages.length - 1] !== '…') pages.push('…');
    }

    el.innerHTML = `
      <div class="pagination__inner">
        <button class="pagination__btn" ${current <= 1 ? 'disabled' : ''} onclick="_mockListingPage(${current - 1})">‹ Prev</button>
        ${pages.map(p => p === '…'
          ? `<span class="pagination__ellipsis">…</span>`
          : `<button class="pagination__btn ${p === current ? 'active' : ''}" onclick="_mockListingPage(${p})">${p}</button>`
        ).join('')}
        <button class="pagination__btn" ${current >= total ? 'disabled' : ''} onclick="_mockListingPage(${current + 1})">Next ›</button>
      </div>`;

    window._mockListingPage = (p) => {
      _state.page = p;
      loadListing();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  }

  function bindControls() {
    // Search with debounce
    let searchTimer;
    const searchEl = document.getElementById('listing-search');
    if (searchEl) {
      searchEl.addEventListener('input', () => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          _state.search = searchEl.value;
          _state.page = 1;
          loadListing();
        }, 350);
      });
    }

    // Sort
    const sortEl = document.getElementById('listing-sort');
    if (sortEl) {
      sortEl.value = _state.sort;
      sortEl.addEventListener('change', () => {
        _state.sort = sortEl.value;
        _state.page = 1;
        loadListing();
      });
    }
  }

  window.MockListing = { render };
})();
