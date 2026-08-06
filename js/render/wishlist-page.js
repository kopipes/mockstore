/* ============ render/wishlist-page.js — Wishlist page ============ */
(function () {

  function render() {
    const list = MockOrders.getWishlist();

    if (list.length === 0) {
      MockRenderPage(`
        <div class="container page">
          <h1 class="page-title">Wishlist</h1>
          <div class="empty-state">
            <div class="empty-state__icon">🤍</div>
            <h3>Wishlist masih kosong</h3>
            <p>Tambahkan produk favoritmu ke wishlist dari halaman produk.</p>
            <a href="#/" class="btn btn--primary">Jelajahi Produk</a>
          </div>
        </div>
      `);
      return;
    }

    MockRenderPage(`
      <div class="container page">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">Wishlist</span>
        </nav>
        <div class="section-header">
          <h1 class="page-title">Wishlist <span class="text-muted" style="font-size:1rem;font-weight:400">(${list.length} produk)</span></h1>
          <button class="btn btn--ghost btn--sm" id="btn-add-all-to-cart">+ Semua ke Keranjang</button>
        </div>

        <div class="product-grid" id="wishlist-grid">
          ${list.map(item => renderWishCard(item)).join('')}
        </div>

        <!-- Achievement Badges -->
        <section class="section" style="padding-top:2.5rem">
          <div class="section-header">
            <h2 class="section-title">🏆 Badge Pencapaian</h2>
          </div>
          <div class="badges-grid">
            ${MockOrders.getAllBadges().map(b => {
              const earned = MockOrders.getEarnedBadges().includes(b.id);
              return `
                <div class="achievement-badge ${earned ? '' : 'achievement-badge--locked'}" title="${earned ? 'Sudah diraih!' : 'Belum diraih'}">
                  <span class="achievement-badge__icon">${b.icon}</span>
                  <span class="achievement-badge__name">${b.name}</span>
                  <span class="achievement-badge__desc">${b.desc}</span>
                  ${earned ? '<span style="font-size:.65rem;color:var(--color-success);font-weight:700">✓ Diraih</span>' : ''}
                </div>`;
            }).join('')}
          </div>
        </section>
      </div>
    `);

    bindEvents();
  }

  function renderWishCard(item) {
    return `
      <article class="product-card" onclick="location.hash='#/product/${item.slug}'">
        <div class="product-card__image-wrap">
          <img src="${item.image_url || MockImages.getUrl(item.id, 400, 400)}" alt="${item.name}" loading="lazy">
          <button class="product-card__wishlist active" data-wish-id="${item.id}"
            aria-label="Hapus dari wishlist" onclick="event.stopPropagation()">❤️</button>
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${item.category_type === 'food' ? 'Premium Food' : 'Luxury'}</span>
          <h3 class="product-card__name">${item.name}</h3>
          <div class="product-card__price-row">
            <span class="price">${MockFmt(item.price)}</span>
          </div>
        </div>
        <div class="product-card__footer">
          <button class="btn btn--primary" data-cart-id="${item.id}"
            onclick="event.stopPropagation()">+ Keranjang</button>
        </div>
      </article>
    `;
  }

  function bindEvents() {
    // Remove from wishlist
    document.querySelectorAll('[data-wish-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.wishId);
        MockOrders.removeFromWish(id);
        render();
      });
    });

    // Add to cart from wishlist
    document.querySelectorAll('[data-cart-id]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.cartId);
        const item = MockOrders.getWishlist().find(i => i.id === id);
        if (item) MockCart.addItem(item);
      });
    });

    // Add all to cart
    document.getElementById('btn-add-all-to-cart')?.addEventListener('click', () => {
      MockOrders.getWishlist().forEach(item => MockCart.addItem(item, 1));
      MockToast.show('Semua item wishlist ditambahkan ke keranjang 🛒', 'success');
    });
  }

  window.MockWishlistPage = { render };
})();
