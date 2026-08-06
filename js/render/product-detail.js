/* ============ render/product-detail.js — Product detail page ============ */
(function () {

  function render(slug) {
    MockRenderPage(`
      <div class="container page">
        <div class="skeleton" style="height:20px;width:250px;margin-bottom:1.5rem"></div>
        <div class="product-detail-skeleton">
          <div class="skeleton" style="aspect-ratio:1;border-radius:12px;max-width:480px"></div>
          <div style="flex:1">
            <div class="skeleton" style="height:28px;margin-bottom:1rem"></div>
            <div class="skeleton" style="height:16px;width:70%;margin-bottom:2rem"></div>
            <div class="skeleton" style="height:40px;width:50%"></div>
          </div>
        </div>
      </div>
    `);

    MockDB.onReady(() => {
      const product = MockDB.getProductBySlug(slug);
      if (!product) {
        MockShowError('Produk tidak ditemukan.');
        return;
      }
      const reviews = MockDB.getReviews(product.id);
      const related = MockDB.getRelatedProducts(product.id, product.category_id, 4);
      renderProduct(product, reviews, related);
    });
  }

  function renderProduct(p, reviews, related) {
    const discPct = p.original_price && p.original_price > p.price
      ? Math.round((1 - p.price / p.original_price) * 100) : 0;
    const wishlisted = MockOrders.isWishlisted(p.id);

    // Build gallery seeds
    const gallery = MockImages.getGallery(p.image_seed || p.id, 600, 600);
    const thumbs  = MockImages.getGallery(p.image_seed || p.id, 100, 100);

    MockRenderPage(`
      <div class="container page">
        <!-- Breadcrumb -->
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <a href="#/listing/${p.category_type}">${p.category_type === 'food' ? 'Premium Food' : 'Luxury Goods'}</a>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <a href="#/listing/${p.category_slug}">${p.category_name}</a>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__current">${p.name}</span>
        </nav>

        <!-- Main layout -->
        <div class="product-detail">
          <!-- Gallery -->
          <div class="product-gallery">
            <div class="product-gallery__main">
              <img id="gallery-main" src="${gallery[0]}" alt="${p.name}" loading="eager">
              ${discPct > 0 ? `<span class="product-card__badge" style="font-size:.85rem;padding:.3rem .7rem">-${discPct}%</span>` : ''}
            </div>
            <div class="product-gallery__thumbs" role="list">
              ${gallery.map((src, i) => `
                <button class="gallery-thumb ${i === 0 ? 'active' : ''}" data-src="${src}"
                  aria-label="Gambar ${i + 1}" role="listitem">
                  <img src="${thumbs[i]}" alt="" loading="lazy">
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Info -->
          <div class="product-info">
            <span class="product-info__category">${p.category_name}</span>
            <h1 class="product-info__name">${p.name}</h1>

            <div class="product-info__rating">
              <span class="stars" aria-label="${p.rating} bintang">${MockStars(p.rating)}</span>
              <span class="text-muted" style="font-size:.9rem">${p.rating} (${p.review_count || reviews.length} ulasan)</span>
            </div>

            <div class="product-info__price">
              <span class="price" style="font-size:1.6rem">${MockFmt(p.price)}</span>
              ${p.original_price && p.original_price > p.price
                ? `<span class="price price--original" style="font-size:1rem">${MockFmt(p.original_price)}</span>
                   <span class="price price--discount" style="font-size:.9rem">Hemat ${MockFmt(p.original_price - p.price)}</span>`
                : ''}
            </div>

            <p class="product-info__desc">${p.description || 'Produk premium berkualitas tinggi.'}</p>

            ${p.specs ? `
              <div class="product-info__specs">
                <h4>Spesifikasi</h4>
                <table class="specs-table">
                  ${Object.entries(JSON.parse(p.specs || '{}')).map(([k, v]) =>
                    `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
                </table>
              </div>
            ` : ''}

            <!-- Qty + CTA -->
            <div class="product-info__actions">
              <div class="qty-control" role="group" aria-label="Jumlah">
                <button class="qty-btn" id="qty-minus" aria-label="Kurangi">−</button>
                <input class="qty-value" id="qty-val" type="number" value="1" min="1" max="99" aria-label="Jumlah produk">
                <button class="qty-btn" id="qty-plus" aria-label="Tambah">+</button>
              </div>
              <button class="btn btn--primary btn--lg" id="btn-add-cart" style="flex:1">
                🛒 Tambah ke Keranjang
              </button>
              <button class="btn btn--ghost" id="btn-wish" aria-label="${wishlisted ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}"
                style="min-width:48px;font-size:1.2rem">${wishlisted ? '❤️' : '🤍'}</button>
            </div>

            <a href="#/cart" class="btn btn--outline btn--full" style="margin-top:.5rem">Lihat Keranjang</a>

            <div class="product-info__meta">
              <span class="chip">🚚 Estimasi kirim 1-3 hari</span>
              <span class="chip">🔒 100% Aman (Simulasi)</span>
              <span class="chip">✅ Stok Tersedia</span>
            </div>
          </div>
        </div>

        <!-- Tabs: Deskripsi & Ulasan -->
        <div class="section" style="padding-top:2rem">
          <div class="tabs" role="tablist">
            <button class="tab-btn active" role="tab" aria-selected="true" data-tab="desc">Deskripsi</button>
            <button class="tab-btn" role="tab" aria-selected="false" data-tab="reviews">Ulasan (${reviews.length})</button>
          </div>

          <div id="tab-desc">
            <p>${p.long_description || p.description || 'Produk premium dengan kualitas terjamin. Cocok untuk hadiah maupun koleksi pribadi.'}</p>
          </div>

          <div id="tab-reviews" hidden>
            ${reviews.length === 0
              ? `<div class="empty-state" style="padding:2rem"><p>Belum ada ulasan.</p></div>`
              : reviews.map(r => `
                <div class="review-card">
                  <div class="review-card__header">
                    <div class="review-avatar" aria-hidden="true">${r.reviewer_name?.[0] || 'U'}</div>
                    <div>
                      <div class="review-name">${r.reviewer_name}</div>
                      <div class="stars" style="font-size:.8rem" aria-label="${r.rating} bintang">${MockStars(r.rating)}</div>
                    </div>
                    <div class="review-date" style="margin-left:auto">${r.date || ''}</div>
                  </div>
                  <p class="review-text">${r.comment}</p>
                </div>
              `).join('')}
          </div>
        </div>

        <!-- Related products -->
        ${related.length > 0 ? `
          <section class="section">
            <div class="section-header">
              <h2 class="section-title">Produk Serupa</h2>
            </div>
            <div class="product-grid">
              ${related.map(p => MockHome.renderProductCard(p)).join('')}
            </div>
          </section>
        ` : ''}
      </div>
    `);

    // Gallery interaction
    const mainImg = document.getElementById('gallery-main');
    document.querySelectorAll('.gallery-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        mainImg.src = btn.dataset.src;
        document.querySelectorAll('.gallery-thumb').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Qty controls
    const qtyVal = document.getElementById('qty-val');
    document.getElementById('qty-minus').addEventListener('click', () => {
      qtyVal.value = Math.max(1, parseInt(qtyVal.value) - 1);
    });
    document.getElementById('qty-plus').addEventListener('click', () => {
      qtyVal.value = Math.min(99, parseInt(qtyVal.value) + 1);
    });

    // Add to cart
    document.getElementById('btn-add-cart').addEventListener('click', () => {
      MockCart.addItem({
        id: p.id, name: p.name, price: p.price,
        original_price: p.original_price || p.price,
        image_url: MockImages.getUrl(p.image_seed || p.id, 400, 400),
        category_type: p.category_type, slug: p.slug
      }, parseInt(qtyVal.value) || 1);
    });

    // Wishlist
    const wishBtn = document.getElementById('btn-wish');
    wishBtn.addEventListener('click', () => {
      const added = MockOrders.toggleWish(p);
      wishBtn.textContent = MockOrders.isWishlisted(p.id) ? '❤️' : '🤍';
    });

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        document.getElementById('tab-desc').hidden = btn.dataset.tab !== 'desc';
        document.getElementById('tab-reviews').hidden = btn.dataset.tab !== 'reviews';
      });
    });

    MockHome.bindWishlistBtns();
  }

  window.MockProductDetail = { render };
})();
