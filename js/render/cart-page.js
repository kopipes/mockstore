/* ============ render/cart-page.js — Cart page ============ */
(function () {

  function render() {
    const items = MockCart.getItems();

    if (items.length === 0) {
      MockRenderPage(`
        <div class="container page">
          <h1 class="page-title">Keranjang Belanja</h1>
          <div class="empty-state">
            <div class="empty-state__icon">🛒</div>
            <h3>Keranjang kosong</h3>
            <p>Belum ada produk di keranjang. Yuk mulai belanja!</p>
            <a href="#/" class="btn btn--primary">Mulai Belanja</a>
          </div>
        </div>
      `);
      return;
    }

    const subtotal = MockCart.getSubtotal();

    MockRenderPage(`
      <div class="container page">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep" aria-hidden="true">›</span>
          <span class="breadcrumb__current">Keranjang</span>
        </nav>
        <h1 class="page-title">Keranjang Belanja <span class="text-muted" style="font-size:1rem;font-weight:400">(${items.length} item)</span></h1>

        <div class="cart-layout">
          <!-- Items -->
          <div class="cart-items" id="cart-items-list" role="list">
            ${items.map(item => renderCartItem(item)).join('')}
          </div>

          <!-- Summary -->
          <aside class="cart-summary">
            <div class="price-box">
              <h2 class="price-box__title">Ringkasan Belanja</h2>
              <div class="price-row">
                <span class="price-row__label">Subtotal (${items.reduce((s,i)=>s+i.qty,0)} produk)</span>
                <span class="price-row__value">${MockFmt(subtotal)}</span>
              </div>
              <div class="price-row">
                <span class="price-row__label">Ongkos kirim</span>
                <span class="price-row__value text-muted">Dihitung di checkout</span>
              </div>
              <div class="price-row price-row--total">
                <span>Total Sementara</span>
                <span class="price">${MockFmt(subtotal)}</span>
              </div>

              <div style="margin-top:1rem;display:flex;flex-direction:column;gap:.5rem">
                <a href="#/checkout" class="btn btn--primary btn--full btn--lg">Lanjut ke Checkout →</a>
                <a href="#/" class="btn btn--ghost btn--full">Lanjut Belanja</a>
              </div>


            </div>
          </aside>
        </div>
      </div>
    `);

    bindCartEvents();
  }

  function renderCartItem(item) {
    return `
      <div class="cart-item" data-id="${item.id}" role="listitem">
        <a href="#/product/${item.slug}" class="cart-item__image">
          <img src="${item.image_url || MockImages.getUrl(item.id, 120, 120)}" alt="${item.name}" loading="lazy">
        </a>
        <div class="cart-item__info">
          <a href="#/product/${item.slug}" class="cart-item__name">${item.name}</a>
          <div class="cart-item__price-row">
            <span class="price">${MockFmt(item.price)}</span>
            ${item.original_price && item.original_price > item.price
              ? `<span class="price price--original">${MockFmt(item.original_price)}</span>` : ''}
          </div>
        </div>
        <div class="cart-item__actions">
          <div class="qty-control" role="group" aria-label="Jumlah ${item.name}">
            <button class="qty-btn cart-qty-minus" data-id="${item.id}" aria-label="Kurangi">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn cart-qty-plus" data-id="${item.id}" aria-label="Tambah">+</button>
          </div>
          <div class="cart-item__subtotal">${MockFmt(item.price * item.qty)}</div>
          <button class="cart-item__remove" data-id="${item.id}" aria-label="Hapus ${item.name} dari keranjang">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }

  function bindCartEvents() {
    // Minus
    document.querySelectorAll('.cart-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const items = MockCart.getItems();
        const item = items.find(i => i.id === id);
        if (item) MockCart.updateQty(id, item.qty - 1);
        render();
      });
    });

    // Plus
    document.querySelectorAll('.cart-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const items = MockCart.getItems();
        const item = items.find(i => i.id === id);
        if (item) MockCart.updateQty(id, item.qty + 1);
        render();
      });
    });

    // Remove
    document.querySelectorAll('.cart-item__remove').forEach(btn => {
      btn.addEventListener('click', () => {
        MockCart.removeItem(parseInt(btn.dataset.id));
        render();
      });
    });
  }

  window.MockCartPage = { render };
})();
