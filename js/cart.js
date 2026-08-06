/* ============ CART.JS — Cart logic (localStorage) ============ */
(function () {
  const KEY = 'mockstore_cart';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    updateBadge();
    window.dispatchEvent(new CustomEvent('cart:updated', { detail: items }));
  }

  function getItems() { return load(); }

  function addItem(product, qty = 1) {
    const items = load();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) {
      items[idx].qty = Math.min(items[idx].qty + qty, 99);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        original_price: product.original_price || product.price,
        image_url: product.image_url,
        category_type: product.category_type || 'luxury',
        slug: product.slug,
        qty: Math.min(qty, 99)
      });
    }
    save(items);
    MockToast.show(`${product.name} ditambahkan ke keranjang 🛒`, 'success');
  }

  function removeItem(id) {
    save(load().filter(i => i.id !== id));
  }

  function updateQty(id, qty) {
    const items = load();
    const idx = items.findIndex(i => i.id === id);
    if (idx > -1) {
      if (qty <= 0) { items.splice(idx, 1); }
      else { items[idx].qty = Math.min(qty, 99); }
    }
    save(items);
  }

  function clear() { save([]); }

  function getCount() {
    return load().reduce((s, i) => s + i.qty, 0);
  }

  function getSubtotal() {
    return load().reduce((s, i) => s + i.price * i.qty, 0);
  }

  function hasType(type) {
    return load().some(i => i.category_type === type);
  }

  function updateBadge() {
    const count = getCount();
    const badge = document.getElementById('cart-badge');
    if (badge) {
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.setAttribute('data-count', count);
    }
  }

  // Init badge on load
  document.addEventListener('DOMContentLoaded', updateBadge);

  window.MockCart = { getItems, addItem, removeItem, updateQty, clear, getCount, getSubtotal, hasType };
})();
