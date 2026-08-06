/* ============ render/invoice.js — Invoice/confirmation page ============ */
(function () {

  function render(orderId) {
    const order = MockOrders.getOrderById(orderId);
    if (!order) {
      MockShowError('Invoice tidak ditemukan.');
      return;
    }

    MockRenderPage(`
      <div class="container page" style="max-width:720px">
        <div class="invoice-card">
          <!-- Header -->
          <div class="invoice-header">
            <div class="invoice-success-icon" aria-hidden="true">🎉</div>
            <h1>Pesanan Berhasil! (Simulasi)</h1>
            <p class="text-muted">Order ID: <strong>${order.id}</strong></p>
            <p class="text-muted" style="font-size:.85rem">${new Date(order.created_at).toLocaleString('id-ID', { dateStyle:'long', timeStyle:'short' })}</p>
          </div>

          <!-- Fun messages -->
          <div class="invoice-fun-msg">
            ${getFunMessage(order)}
          </div>

          <!-- Address & Courier -->
          <div class="invoice-section">
            <h3>Pengiriman</h3>
            <div class="invoice-detail-row">
              <span class="text-muted">Penerima</span>
              <span>${order.address?.name} · ${order.address?.phone}</span>
            </div>
            <div class="invoice-detail-row">
              <span class="text-muted">Alamat</span>
              <span>${order.address?.address}, ${order.address?.city}</span>
            </div>
            <div class="invoice-detail-row">
              <span class="text-muted">Kurir</span>
              <span>${order.courier?.name} — estimasi ${order.courier?.eta}</span>
            </div>
            <div class="invoice-detail-row">
              <span class="text-muted">Pembayaran</span>
              <span>${formatPayment(order.payment)}</span>
            </div>
          </div>

          <!-- Items -->
          <div class="invoice-section">
            <h3>Produk Dipesan</h3>
            ${order.items.map(i => `
              <div class="summary-item">
                <img src="${i.image_url || MockImages.getUrl(i.id, 60, 60)}" alt="${i.name}" class="summary-item__img">
                <div class="summary-item__info">
                  <div class="summary-item__name">${i.name}</div>
                  <div class="summary-item__qty text-muted">x${i.qty} · ${MockFmt(i.price)}/item</div>
                </div>
                <div class="summary-item__price">${MockFmt(i.price * i.qty)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Cost breakdown -->
          <div class="invoice-section">
            <h3>Rincian Biaya</h3>
            <div class="price-row">
              <span class="price-row__label">Subtotal produk</span>
              <span>${MockFmt(order.subtotal)}</span>
            </div>
            <div class="price-row">
              <span class="price-row__label">Ongkos kirim (${order.courier?.name})</span>
              <span>${MockFmt(order.shipping)}</span>
            </div>
            ${order.discount > 0 ? `
              <div class="price-row price-row--discount">
                <span class="price-row__label">Diskon voucher${order.voucher ? ` (${order.voucher.code})` : ''}</span>
                <span>−${MockFmt(order.discount)}</span>
              </div>` : ''}
            <div class="price-row price-row--total">
              <span>Total Pembayaran</span>
              <span class="price" style="font-size:1.2rem">${MockFmt(order.grand_total)}</span>
            </div>
            ${order.savings > 0 ? `
              <div class="invoice-savings">
                🎊 Kamu hemat <strong>${MockFmt(order.savings)}</strong> dari belanja ini!
              </div>` : ''}
          </div>

          <!-- Actions -->
          <div class="invoice-actions">
            <a href="#/" class="btn btn--primary btn--lg">🛍 Belanja Lagi</a>
            <a href="#/orders" class="btn btn--outline">Lihat Riwayat Pesanan</a>
          </div>
        </div>
      </div>
    `);

    // Fire confetti
    setTimeout(() => launchConfetti(), 300);
  }

  function getFunMessage(order) {
    const msgs = [
      `Kalau ini beneran, kamu baru saja menguras tabungan sebesar <strong>${MockFmt(order.grand_total)}</strong> 😅`,
      `Dompet (simulasi) kamu berkurang <strong>${MockFmt(order.grand_total)}</strong> — tapi santai, ini cuma pura-pura! 😄`,
      `Selamat! Kamu baru "menghabiskan" <strong>${MockFmt(order.grand_total)}</strong> tanpa rasa bersalah. 🎊`,
      `Kurir imajiner sedang dalam perjalanan membawa pesananmu senilai <strong>${MockFmt(order.grand_total)}</strong>. 🚚✨`,
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    return `<p>${msg}</p>`;
  }

  function formatPayment(p) {
    const map = {
      dummy_transfer: 'Transfer Bank (Simulasi)',
      dummy_ewallet:  'E-Wallet (Simulasi)',
      dummy_cod:      'Bayar di Tempat / COD',
      dummy_cc:       'Kartu Kredit (Simulasi)',
    };
    return map[p] || p;
  }

  /* ---- Confetti ---- */
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9998';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#7C3AED','#F59E0B','#10B981','#EF4444','#3B82F6','#EC4899'];
    const pieces = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 10 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 3 + 2,
      spin: (Math.random() - 0.5) * 0.2,
      drift: (Math.random() - 0.5) * 1.5,
    }));

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
      });
      frame++;
      if (frame < 200) requestAnimationFrame(draw);
      else canvas.remove();
    }
    draw();
  }

  window.MockInvoice = { render };
})();
