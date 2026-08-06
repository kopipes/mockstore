/* ============ render/orders-page.js — Order history page ============ */
(function () {

  function render() {
    const orders = MockOrders.getOrders();

    if (orders.length === 0) {
      MockRenderPage(`
        <div class="container page">
          <h1 class="page-title">Riwayat Pesanan</h1>
          <div class="empty-state">
            <div class="empty-state__icon">📦</div>
            <h3>Belum ada pesanan</h3>
            <p>Selesaikan checkout pertamamu untuk melihat riwayat pesanan di sini.</p>
            <a href="#/" class="btn btn--primary">Mulai Belanja</a>
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
          <span class="breadcrumb__current">Riwayat Pesanan</span>
        </nav>
        <div class="section-header">
          <h1 class="page-title">Riwayat Pesanan</h1>
          <button class="btn btn--ghost btn--sm" id="btn-clear-orders" style="color:var(--color-danger)">Hapus Semua</button>
        </div>

        <div class="orders-list">
          ${orders.map(o => renderOrderCard(o)).join('')}
        </div>
      </div>
    `);

    document.getElementById('btn-clear-orders')?.addEventListener('click', () => {
      if (confirm('Hapus semua riwayat pesanan? Aksi ini tidak dapat dibatalkan.')) {
        localStorage.removeItem('mockstore_orders');
        render();
      }
    });

    document.querySelectorAll('.order-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const detail = document.getElementById(`order-detail-${btn.dataset.id}`);
        if (detail) {
          const hidden = detail.hidden;
          detail.hidden = !hidden;
          btn.textContent = hidden ? 'Sembunyikan ▲' : 'Lihat Detail ▼';
        }
      });
    });
  }

  function renderOrderCard(o) {
    const date = new Date(o.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' });
    return `
      <div class="order-card">
        <div class="order-card__header">
          <div>
            <div class="order-card__id">${o.id}</div>
            <div class="order-card__date text-muted" style="font-size:.82rem">${date}</div>
          </div>
          <div class="order-card__total">
            <span class="price">${MockFmt(o.grand_total)}</span>
            <span class="chip" style="margin-left:.5rem">✓ Selesai</span>
          </div>
        </div>

        <div class="order-card__items-preview">
          ${o.items.slice(0, 3).map(i => `
            <img src="${i.image_url || MockImages.getUrl(i.id, 50, 50)}"
              alt="${i.name}" title="${i.name} x${i.qty}"
              style="width:44px;height:44px;object-fit:cover;border-radius:6px;border:1px solid var(--color-border)">
          `).join('')}
          ${o.items.length > 3 ? `<span class="text-muted" style="font-size:.85rem;align-self:center">+${o.items.length - 3} lagi</span>` : ''}
        </div>

        <div class="order-card__footer">
          <button class="btn btn--ghost btn--sm order-toggle" data-id="${o.id}">Lihat Detail ▼</button>
          <a href="#/invoice/${o.id}" class="btn btn--outline btn--sm">Lihat Invoice</a>
        </div>

        <div id="order-detail-${o.id}" hidden>
          <hr style="border:none;border-top:1px solid var(--color-border);margin:.75rem 0">
          <div style="font-size:.88rem">
            <div class="price-row"><span class="price-row__label">Alamat</span><span>${o.address?.name} — ${o.address?.city}</span></div>
            <div class="price-row"><span class="price-row__label">Kurir</span><span>${o.courier?.name} (${o.courier?.eta})</span></div>
            <div class="price-row"><span class="price-row__label">Subtotal</span><span>${MockFmt(o.subtotal)}</span></div>
            <div class="price-row"><span class="price-row__label">Ongkir</span><span>${MockFmt(o.shipping)}</span></div>
            ${o.discount > 0 ? `<div class="price-row price-row--discount"><span class="price-row__label">Diskon</span><span>−${MockFmt(o.discount)}</span></div>` : ''}
            <div class="price-row price-row--total"><span>Total</span><span class="price">${MockFmt(o.grand_total)}</span></div>
          </div>
          <div style="margin-top:.75rem">
            ${o.items.map(i => `
              <div class="summary-item" style="padding:.4rem 0">
                <img src="${i.image_url || MockImages.getUrl(i.id, 50, 50)}" alt="${i.name}" class="summary-item__img">
                <div class="summary-item__info">
                  <div class="summary-item__name" style="font-size:.88rem">${i.name}</div>
                  <div class="text-muted" style="font-size:.78rem">x${i.qty} · ${MockFmt(i.price)}/item</div>
                </div>
                <div class="summary-item__price" style="font-size:.88rem">${MockFmt(i.price * i.qty)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  window.MockOrdersPage = { render };
})();
