/* ============ render/home.js — Home page ============ */
(function () {

  function render() {
    MockRenderPage(`
      <section class="hero">
        <div class="hero__bg-shapes" aria-hidden="true">
          <div class="hero__shape hero__shape--1"></div>
          <div class="hero__shape hero__shape--2"></div>
          <div class="hero__shape hero__shape--3"></div>
        </div>
        <div class="container hero__inner">
          <div class="hero__text">
            <span class="hero__eyebrow">✨ Simulasi Belanja Premium</span>
            <h1 class="hero__title">Rasakan Sensasi<br><span class="hero__title-accent">Belanja Mewah.</span></h1>
            <p class="hero__desc">Checkout barang luxury dan makanan premium — lengkap dengan kurir, ongkir, dan invoice sungguhan. 100% gratis, 0% nyata.</p>
            <div class="hero__cta">
              <a href="#/listing/luxury" class="btn btn--primary btn--lg">✨ Luxury Goods</a>
              <a href="#/listing/food" class="btn btn--outline btn--lg">🍽 Premium Food</a>
            </div>
            <div class="hero__stats">
              <div class="hero__stat">
                <span class="hero__stat-num">35+</span>
                <span class="hero__stat-label">Produk Premium</span>
              </div>
              <div class="hero__stat-divider"></div>
              <div class="hero__stat">
                <span class="hero__stat-num">8</span>
                <span class="hero__stat-label">Voucher Gratis</span>
              </div>
              <div class="hero__stat-divider"></div>
              <div class="hero__stat">
                <span class="hero__stat-num">100%</span>
                <span class="hero__stat-label">Tanpa Bayar</span>
              </div>
            </div>
          </div>
          <div class="hero__visual" aria-hidden="true">
            <div class="hero__img-grid">
              <div class="hero__img-card hero__img-card--1">
                <img src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=280&h=280&fit=crop&q=80" alt="">
                <div class="hero__img-label">Luxury Bag</div>
              </div>
              <div class="hero__img-card hero__img-card--2">
                <img src="https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=200&h=200&fit=crop&q=80" alt="">
                <div class="hero__img-label">Premium Sashimi</div>
              </div>
              <div class="hero__img-card hero__img-card--3">
                <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=180&h=180&fit=crop&q=80" alt="">
                <div class="hero__img-label">Luxury Watch</div>
              </div>
              <div class="hero__img-card hero__img-card--4">
                <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=150&h=150&fit=crop&q=80" alt="">
                <div class="hero__img-label">Artisan Chocolate</div>
              </div>
            </div>
          </div>
        </div>
        <!-- Marquee strip -->
        <div class="hero__marquee" aria-hidden="true">
          <div class="hero__marquee-inner">
            <span>✨ Luxury Goods</span><span>🍽 Fine Dining</span><span>⌚ Premium Watch</span><span>💎 Perhiasan</span><span>🥩 Wagyu A5</span><span>☕ Specialty Coffee</span><span>👜 Designer Bag</span><span>🍱 Omakase</span><span>💻 UltraBook</span><span>🍰 Artisan Cake</span>
            <span>✨ Luxury Goods</span><span>🍽 Fine Dining</span><span>⌚ Premium Watch</span><span>💎 Perhiasan</span><span>🥩 Wagyu A5</span><span>☕ Specialty Coffee</span><span>👜 Designer Bag</span><span>🍱 Omakase</span><span>💻 UltraBook</span><span>🍰 Artisan Cake</span>
          </div>
        </div>
      </section>

      <div id="home-content" class="container">
        <div class="loading-screen" style="min-height:30vh">
          <div class="spinner"></div>
          <p>Memuat produk…</p>
        </div>
      </div>
    `);

    MockDB.onReady(() => {
      loadContent();
    });
  }

  function loadContent() {
    const categories = MockDB.getCategories();
    const featured = MockDB.getFeaturedProducts(8);

    const html = `
      <!-- KATEGORI -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Kategori</h2>
        </div>
        <div class="category-grid">
          ${categories.map(c => `
            <a href="#/listing/${c.slug}" class="category-card">
              <span class="category-card__icon">${c.icon || '🏷'}</span>
              <span class="category-card__name">${c.name}</span>
              <span class="category-card__count">${c.product_count || ''}</span>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- FEATURED PRODUCTS -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">Pilihan Unggulan</h2>
          <a href="#/listing/all" class="see-all-link">Lihat semua →</a>
        </div>
        <div class="product-grid">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
      </section>

      <!-- BANNER -->
      <section class="section">
        <div class="home-banners">
          <a href="#/listing/luxury" class="home-banner home-banner--luxury">
            <div class="home-banner__content">
              <span class="home-banner__label">Koleksi Terbaru</span>
              <h3>Luxury Goods</h3>
              <p>Tas, jam tangan, aksesori premium</p>
              <span class="btn btn--outline btn--sm">Jelajahi</span>
            </div>
          </a>
          <a href="#/listing/food" class="home-banner home-banner--food">
            <div class="home-banner__content">
              <span class="home-banner__label">Premium Food</span>
              <h3>Fine Dining & Gourmet</h3>
              <p>Makanan premium dari brand ternama</p>
              <span class="btn btn--outline btn--sm">Pesan Sekarang</span>
            </div>
          </a>
        </div>
      </section>

      <!-- FOOD SECTION -->
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">🍽 Premium Food</h2>
          <a href="#/listing/food" class="see-all-link">Lihat semua →</a>
        </div>
        <div class="product-grid">
          ${MockDB.getProducts({ categorySlug: 'food', limit: 4 }).map(p => renderProductCard(p)).join('')}
        </div>
      </section>


    `;

    document.getElementById('home-content').innerHTML = html;
    bindWishlistBtns();
  }

  function renderProductCard(p) {
    const discPct = p.original_price && p.original_price > p.price
      ? Math.round((1 - p.price / p.original_price) * 100) : 0;
    const wishlisted = MockOrders.isWishlisted(p.id);
    return `
      <article class="product-card" onclick="location.hash='#/product/${p.slug}'">
        <div class="product-card__image-wrap">
          <img src="${MockImages.getUrl(p.image_seed || p.id, 400, 400)}" alt="${p.name}" loading="lazy">
          ${discPct > 0 ? `<span class="product-card__badge">-${discPct}%</span>` : ''}
          ${p.is_featured ? `<span class="product-card__badge product-card__badge--featured" style="${discPct>0?'top:2.2rem':''}">Unggulan</span>` : ''}
          <button class="product-card__wishlist ${wishlisted ? 'active' : ''}"
            data-id="${p.id}" data-wish="true"
            aria-label="${wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}"
            onclick="event.stopPropagation()">
            ${wishlisted ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="product-card__body">
          <span class="product-card__category">${p.category_name}</span>
          <h3 class="product-card__name">${p.name}</h3>
          <div class="product-card__rating">
            <span class="stars" aria-label="${p.rating} bintang">${MockStars(p.rating)}</span>
            <span class="product-card__rating-count">(${p.review_count || 0})</span>
          </div>
          <div class="product-card__price-row">
            <span class="price">${MockFmt(p.price)}</span>
            ${p.original_price && p.original_price > p.price
              ? `<span class="price price--original">${MockFmt(p.original_price)}</span>` : ''}
          </div>
        </div>
        <div class="product-card__footer">
          <button class="btn btn--primary" onclick="event.stopPropagation(); MockCart.addItem({
            id:${p.id}, name:'${p.name.replace(/'/g, "\\'")}', price:${p.price},
            original_price:${p.original_price || p.price},
            image_url:'${MockImages.getUrl(p.image_seed || p.id, 400, 400)}',
            category_type:'${p.category_type}', slug:'${p.slug}'
          })">+ Keranjang</button>
        </div>
      </article>
    `;
  }

  function bindWishlistBtns() {
    document.querySelectorAll('[data-wish="true"]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const product = MockDB.getProductById(id);
        if (!product) return;
        const added = MockOrders.toggleWish(product);
        btn.textContent = added ? '❤️' : '🤍';
        btn.classList.toggle('active', added);
      });
    });
  }

  window.MockHome = { render, renderProductCard, bindWishlistBtns };
})();
