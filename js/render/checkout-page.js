/* ============ render/checkout-page.js — Multi-step checkout ============ */
(function () {
  let _step = 1; // 1=alamat, 2=kurir, 3=pembayaran, 4=ringkasan
  let _data = {
    address: null,
    courier: null,
    payment: 'dummy',
    voucher: null,
    voucherDiscount: 0
  };

  const STEPS = ['Alamat', 'Kurir', 'Pembayaran', 'Ringkasan'];

  function render() {
    if (MockCart.getItems().length === 0) {
      location.hash = '#/cart';
      return;
    }
    _step = 1;
    _data = { address: null, courier: null, payment: 'dummy', voucher: null, voucherDiscount: 0 };
    renderStep();
  }

  function renderStep() {
    MockRenderPage(`
      <div class="container page" style="max-width:860px">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumb__sep">›</span>
          <a href="#/cart">Keranjang</a>
          <span class="breadcrumb__sep">›</span>
          <span class="breadcrumb__current">Checkout</span>
        </nav>
        <h1 class="page-title">Checkout</h1>

        <!-- Stepper -->
        <div class="stepper" role="list" aria-label="Langkah checkout">
          ${STEPS.map((s, i) => {
            const n = i + 1;
            const state = n < _step ? 'completed' : n === _step ? 'active' : '';
            return `
              <div class="stepper__step ${state}" role="listitem">
                <div class="stepper__dot">${n < _step ? '✓' : n}</div>
                <span class="stepper__label">${s}</span>
              </div>`;
          }).join('')}
        </div>

        <div class="checkout-layout">
          <div class="checkout-main" id="checkout-step-content">
            ${renderStepContent()}
          </div>
          <aside class="checkout-sidebar">
            ${renderOrderSummary()}
          </aside>
        </div>
      </div>
    `);
    bindStepEvents();
  }

  function renderStepContent() {
    if (_step === 1) return renderAddressStep();
    if (_step === 2) return renderCourierStep();
    if (_step === 3) return renderPaymentStep();
    if (_step === 4) return renderSummaryStep();
    return '';
  }

  /* ---- Step 1: Alamat ---- */
  function renderAddressStep() {
    const saved = MockOrders.getAddresses();
    const def = MockOrders.getDefaultAddress();
    return `
      <div class="checkout-step" id="step-address">
        <h2 class="checkout-step__title">Alamat Pengiriman</h2>

        ${saved.length > 0 ? `
          <div class="saved-addresses" style="margin-bottom:1.5rem">
            <h4 style="margin-bottom:.75rem">Alamat tersimpan</h4>
            ${saved.map(a => `
              <label class="courier-card ${_data.address?.id === a.id || (!_data.address && a.is_default) ? 'selected' : ''}">
                <input type="radio" name="saved-addr" value="${a.id}" ${a.is_default && !_data.address ? 'checked' : ''}>
                <div class="courier-card__info">
                  <div class="courier-card__name">${a.name} · ${a.phone}</div>
                  <div class="courier-card__eta">${a.address}, ${a.kelurahan}, ${a.kecamatan}, ${a.city} ${a.zip}</div>
                </div>
              </label>
            `).join('')}
          </div>
          <details>
            <summary style="cursor:pointer;font-weight:600;margin-bottom:1rem;color:var(--color-primary)">+ Tambah alamat baru</summary>
            ${renderAddressForm()}
          </details>
        ` : renderAddressForm()}

        <div style="margin-top:1.5rem">
          <button class="btn btn--primary btn--lg" id="btn-next-courier">Pilih Kurir →</button>
        </div>
      </div>`;
  }

  function renderAddressForm() {
    return `
      <form id="address-form" novalidate>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="addr-name">Nama Penerima <span class="required">*</span></label>
            <input class="form-input" id="addr-name" type="text" placeholder="Nama lengkap" autocomplete="name" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="addr-phone">No. HP <span class="required">*</span></label>
            <input class="form-input" id="addr-phone" type="tel" placeholder="08xxxxxxxxxx" autocomplete="tel" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="addr-address">Alamat Lengkap <span class="required">*</span></label>
          <textarea class="form-textarea" id="addr-address" placeholder="Nama jalan, nomor rumah, RT/RW" required></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="addr-kelurahan">Kelurahan</label>
            <input class="form-input" id="addr-kelurahan" type="text" placeholder="Kelurahan">
          </div>
          <div class="form-group">
            <label class="form-label" for="addr-kecamatan">Kecamatan</label>
            <input class="form-input" id="addr-kecamatan" type="text" placeholder="Kecamatan">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="addr-city">Kota <span class="required">*</span></label>
            <input class="form-input" id="addr-city" type="text" placeholder="Kota / Kabupaten" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="addr-zip">Kode Pos</label>
            <input class="form-input" id="addr-zip" type="text" placeholder="12345" maxlength="5" inputmode="numeric">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="addr-notes">Catatan (opsional)</label>
          <input class="form-input" id="addr-notes" type="text" placeholder="Patokan, instruksi khusus, dll.">
        </div>
        <label style="display:flex;align-items:center;gap:.5rem;font-size:.9rem;cursor:pointer">
          <input type="checkbox" id="addr-default" checked> Jadikan alamat default
        </label>
      </form>`;
  }

  /* ---- Step 2: Kurir ---- */
  function renderCourierStep() {
    const hasFood = MockCart.hasType('food');
    const type = hasFood ? 'food' : 'luxury';
    const couriers = MockDB.getCouriers(type);
    return `
      <div class="checkout-step" id="step-courier">
        <h2 class="checkout-step__title">Pilih Kurir</h2>
        <div class="address-recap" style="margin-bottom:1.5rem">
          <strong>Dikirim ke:</strong> ${_data.address ? `${_data.address.name} — ${_data.address.city}` : '—'}
        </div>
        <div id="courier-list">
          ${couriers.map((c, i) => `
            <label class="courier-card ${i === 0 ? 'selected' : ''}" id="courier-${c.id}">
              <input type="radio" name="courier" value="${c.id}" data-price="${c.price}" data-eta="${c.eta}" data-name="${c.name}" ${i === 0 ? 'checked' : ''}>
              <div class="courier-card__info">
                <div class="courier-card__name">${c.name}</div>
                <div class="courier-card__eta">Estimasi ${c.eta}</div>
              </div>
              <div class="courier-card__price">${MockFmt(c.price)}</div>
            </label>
          `).join('')}
        </div>
        <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn--ghost" id="btn-back-address">← Kembali</button>
          <button class="btn btn--primary btn--lg" id="btn-next-payment">Pilih Pembayaran →</button>
        </div>
      </div>`;
  }

  /* ---- Step 3: Pembayaran ---- */
  function renderPaymentStep() {
    const subtotal = MockCart.getSubtotal();
    const shipping = _data.courier ? _data.courier.price : 0;
    const disc = _data.voucherDiscount || 0;
    const total = subtotal + shipping - disc;

    const PAYMENT_METHODS = [
      { id: 'dummy_transfer', label: 'Transfer Bank (Simulasi)', icon: '🏦', desc: 'BCA, Mandiri, BNI, BRI' },
      { id: 'dummy_ewallet', label: 'E-Wallet (Simulasi)', icon: '📱', desc: 'GoPay, OVO, Dana, ShopeePay' },
      { id: 'dummy_cod',     label: 'Bayar di Tempat (COD)', icon: '💵', desc: 'Bayar saat barang tiba' },
      { id: 'dummy_cc',      label: 'Kartu Kredit (Simulasi)', icon: '💳', desc: 'Visa, Mastercard, JCB' },
    ];

    return `
      <div class="checkout-step" id="step-payment">
        <h2 class="checkout-step__title">Metode Pembayaran</h2>
        <div style="margin-bottom:1.25rem">
          ${PAYMENT_METHODS.map((m, i) => `
            <label class="courier-card ${i === 0 ? 'selected' : ''}">
              <input type="radio" name="payment" value="${m.id}" ${i === 0 ? 'checked' : ''}>
              <span style="font-size:1.3rem">${m.icon}</span>
              <div class="courier-card__info">
                <div class="courier-card__name">${m.label}</div>
                <div class="courier-card__eta">${m.desc}</div>
              </div>
            </label>
          `).join('')}
        </div>

        <!-- Voucher -->
        <div class="form-group">
          <label class="form-label" for="voucher-input">Kode Voucher</label>
          <div class="voucher-row">
            <input class="form-input" id="voucher-input" type="text" placeholder="MOCKFREE / HEMAT50K / LUXURY20"
              style="text-transform:uppercase" value="${_data.voucher?.code || ''}">
            <button class="btn btn--outline" id="btn-apply-voucher">Pakai</button>
          </div>
          <div id="voucher-status"></div>
        </div>

        <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn--ghost" id="btn-back-courier">← Kembali</button>
          <button class="btn btn--primary btn--lg" id="btn-next-summary">Lihat Ringkasan →</button>
        </div>
      </div>`;
  }

  /* ---- Step 4: Ringkasan ---- */
  function renderSummaryStep() {
    const items = MockCart.getItems();
    const subtotal = MockCart.getSubtotal();
    const shipping = _data.courier?.price || 0;
    const disc = _data.voucherDiscount || 0;
    const total = subtotal + shipping - disc;
    const savings = items.reduce((s, i) =>
      s + Math.max(0, (i.original_price - i.price) * i.qty), 0) + disc;

    return `
      <div class="checkout-step" id="step-summary">
        <h2 class="checkout-step__title">Ringkasan Pesanan</h2>

        <div class="summary-section">
          <h4>Produk</h4>
          ${items.map(i => `
            <div class="summary-item">
              <img src="${i.image_url || MockImages.getUrl(i.id, 60, 60)}" alt="${i.name}" class="summary-item__img">
              <div class="summary-item__info">
                <div class="summary-item__name">${i.name}</div>
                <div class="summary-item__qty text-muted">x${i.qty}</div>
              </div>
              <div class="summary-item__price">${MockFmt(i.price * i.qty)}</div>
            </div>
          `).join('')}
        </div>

        <div class="summary-section">
          <h4>Pengiriman</h4>
          <div class="price-row">
            <span class="price-row__label">Alamat</span>
            <span>${_data.address?.name} — ${_data.address?.city}</span>
          </div>
          <div class="price-row">
            <span class="price-row__label">Kurir</span>
            <span>${_data.courier?.name} (${_data.courier?.eta})</span>
          </div>
        </div>

        <div class="price-box" style="margin-top:1rem">
          <h3 class="price-box__title">Rincian Biaya</h3>
          <div class="price-row">
            <span class="price-row__label">Subtotal produk</span>
            <span>${MockFmt(subtotal)}</span>
          </div>
          <div class="price-row">
            <span class="price-row__label">Ongkos kirim</span>
            <span>${MockFmt(shipping)}</span>
          </div>
          ${disc > 0 ? `
            <div class="price-row price-row--discount">
              <span class="price-row__label">Diskon voucher (${_data.voucher?.code})</span>
              <span>−${MockFmt(disc)}</span>
            </div>` : ''}
          <div class="price-row price-row--total">
            <span>Total Pembayaran</span>
            <span class="price" style="font-size:1.15rem">${MockFmt(total)}</span>
          </div>
          ${savings > 0 ? `
            <div class="price-row price-row--savings" style="font-size:.85rem">
              <span>Kamu hemat 🎉</span>
              <span>${MockFmt(savings)}</span>
            </div>` : ''}
        </div>

        <div style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <button class="btn btn--ghost" id="btn-back-payment">← Kembali</button>
          <button class="btn btn--primary btn--lg" id="btn-place-order">🎉 Pesan Sekarang (Simulasi)</button>
        </div>
      </div>`;
  }

  /* ---- Order Summary Sidebar ---- */
  function renderOrderSummary() {
    const items = MockCart.getItems();
    const subtotal = MockCart.getSubtotal();
    const shipping = _data.courier?.price || 0;
    const disc = _data.voucherDiscount || 0;
    const total = subtotal + shipping - disc;
    return `
      <div class="price-box">
        <h3 class="price-box__title">Pesanan (${items.length} item)</h3>
        ${items.slice(0, 3).map(i => `
          <div class="price-row" style="align-items:flex-start;gap:.5rem">
            <img src="${i.image_url || MockImages.getUrl(i.id, 40, 40)}" alt="" style="width:36px;height:36px;object-fit:cover;border-radius:6px;flex-shrink:0">
            <span style="flex:1;font-size:.82rem;line-height:1.3">${i.name} x${i.qty}</span>
            <span style="font-size:.82rem;font-weight:600;white-space:nowrap">${MockFmt(i.price * i.qty)}</span>
          </div>
        `).join('')}
        ${items.length > 3 ? `<p class="text-muted" style="font-size:.8rem">+${items.length - 3} produk lainnya</p>` : ''}
        <hr style="border:none;border-top:1px solid var(--color-border);margin:.75rem 0">
        <div class="price-row">
          <span class="price-row__label">Subtotal</span>
          <span>${MockFmt(subtotal)}</span>
        </div>
        ${shipping ? `<div class="price-row"><span class="price-row__label">Ongkir</span><span>${MockFmt(shipping)}</span></div>` : ''}
        ${disc ? `<div class="price-row price-row--discount"><span class="price-row__label">Diskon</span><span>−${MockFmt(disc)}</span></div>` : ''}
        <div class="price-row price-row--total">
          <span>Total</span>
          <span class="price">${MockFmt(total)}</span>
        </div>
      </div>`;
  }

  /* ---- Event binding per step ---- */
  function bindStepEvents() {
    // Courier card selection highlight
    document.querySelectorAll('.courier-card input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', () => {
        const group = radio.closest('.checkout-step, .saved-addresses, #courier-list');
        if (group) group.querySelectorAll('.courier-card').forEach(c => c.classList.remove('selected'));
        radio.closest('.courier-card')?.classList.add('selected');
      });
    });

    if (_step === 1) {
      document.getElementById('btn-next-courier')?.addEventListener('click', () => {
        // Check saved address selection
        const savedRadio = document.querySelector('input[name="saved-addr"]:checked');
        if (savedRadio) {
          const addr = MockOrders.getAddresses().find(a => a.id === parseInt(savedRadio.value));
          if (addr) { _data.address = addr; nextStep(); return; }
        }
        // Validate new form
        const name    = document.getElementById('addr-name')?.value.trim();
        const phone   = document.getElementById('addr-phone')?.value.trim();
        const address = document.getElementById('addr-address')?.value.trim();
        const city    = document.getElementById('addr-city')?.value.trim();
        if (!name || !phone || !address || !city) {
          MockToast.show('Lengkapi nama, HP, alamat, dan kota.', 'error');
          return;
        }
        const newAddr = MockOrders.addAddress({
          name, phone, address,
          kelurahan: document.getElementById('addr-kelurahan')?.value.trim() || '',
          kecamatan: document.getElementById('addr-kecamatan')?.value.trim() || '',
          city,
          zip: document.getElementById('addr-zip')?.value.trim() || '',
          notes: document.getElementById('addr-notes')?.value.trim() || '',
          is_default: document.getElementById('addr-default')?.checked || false
        });
        _data.address = newAddr;
        nextStep();
      });
    }

    if (_step === 2) {
      document.getElementById('btn-back-address')?.addEventListener('click', prevStep);
      document.getElementById('btn-next-payment')?.addEventListener('click', () => {
        const sel = document.querySelector('input[name="courier"]:checked');
        if (!sel) { MockToast.show('Pilih kurir terlebih dahulu.', 'error'); return; }
        _data.courier = { id: sel.value, price: parseInt(sel.dataset.price), eta: sel.dataset.eta, name: sel.dataset.name };
        nextStep();
      });
    }

    if (_step === 3) {
      document.getElementById('btn-back-courier')?.addEventListener('click', prevStep);

      // Voucher
      document.getElementById('btn-apply-voucher')?.addEventListener('click', () => {
        const code = document.getElementById('voucher-input')?.value.trim().toUpperCase();
        if (!code) return;
        const voucher = MockDB.getVoucher(code);
        const statusEl = document.getElementById('voucher-status');
        if (!voucher) {
          if (statusEl) statusEl.innerHTML = `<div class="form-error">❌ Kode voucher tidak valid.</div>`;
          _data.voucher = null; _data.voucherDiscount = 0;
          return;
        }
        const subtotal = MockCart.getSubtotal();
        let disc = 0;
        if (voucher.type === 'percent') disc = Math.round(subtotal * voucher.value / 100);
        else if (voucher.type === 'flat') disc = voucher.value;
        if (voucher.max_discount) disc = Math.min(disc, voucher.max_discount);
        _data.voucher = voucher;
        _data.voucherDiscount = disc;
        if (statusEl) statusEl.innerHTML = `<div class="voucher-badge">✓ Hemat ${MockFmt(disc)} dengan kode ${code}</div>`;
        MockToast.show(`Voucher ${code} berhasil dipakai! Hemat ${MockFmt(disc)}`, 'success');
        // Refresh sidebar
        document.querySelector('.checkout-sidebar').innerHTML = renderOrderSummary();
      });

      document.getElementById('btn-next-summary')?.addEventListener('click', () => {
        const sel = document.querySelector('input[name="payment"]:checked');
        _data.payment = sel ? sel.value : 'dummy_transfer';
        nextStep();
      });
    }

    if (_step === 4) {
      document.getElementById('btn-back-payment')?.addEventListener('click', prevStep);
      document.getElementById('btn-place-order')?.addEventListener('click', placeOrder);
    }
  }

  function nextStep() {
    _step++;
    renderStep();
  }

  function prevStep() {
    _step--;
    renderStep();
  }

  function placeOrder() {
    const btn = document.getElementById('btn-place-order');
    if (btn) { btn.classList.add('btn--loading'); btn.disabled = true; }

    setTimeout(() => {
      const items = MockCart.getItems();
      const subtotal = MockCart.getSubtotal();
      const shipping = _data.courier?.price || 0;
      const disc = _data.voucherDiscount || 0;
      const total = subtotal + shipping - disc;
      const savings = items.reduce((s, i) =>
        s + Math.max(0, (i.original_price - i.price) * i.qty), 0) + disc;

      const orderId = 'MSK-' + Date.now().toString(36).toUpperCase();
      const order = {
        id: orderId,
        created_at: new Date().toISOString(),
        items,
        address: _data.address,
        courier: _data.courier,
        payment: _data.payment,
        voucher: _data.voucher,
        subtotal,
        shipping,
        discount: disc,
        grand_total: total,
        savings
      };

      MockOrders.saveOrder(order);
      MockOrders.checkBadges(order);
      MockCart.clear();

      location.hash = `#/invoice/${orderId}`;
    }, 1200);
  }

  window.MockCheckoutPage = { render };
})();
