/* ============ ORDERS.JS — Orders, Wishlist, Address (localStorage) ============ */
(function () {

  /* ---- ORDERS ---- */
  const ORDERS_KEY = 'mockstore_orders';

  function getOrders() {
    try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []; }
    catch { return []; }
  }

  function saveOrder(order) {
    const orders = getOrders();
    orders.unshift(order); // newest first
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }

  function getOrderById(id) {
    return getOrders().find(o => o.id === id) || null;
  }

  /* ---- WISHLIST ---- */
  const WISH_KEY = 'mockstore_wishlist';

  function getWishlist() {
    try { return JSON.parse(localStorage.getItem(WISH_KEY)) || []; }
    catch { return []; }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISH_KEY, JSON.stringify(list));
    updateWishBadge();
    window.dispatchEvent(new CustomEvent('wishlist:updated', { detail: list }));
  }

  function toggleWish(product) {
    const list = getWishlist();
    const idx = list.findIndex(i => i.id === product.id);
    if (idx > -1) {
      list.splice(idx, 1);
      MockToast.show(`${product.name} dihapus dari wishlist`, 'info');
    } else {
      list.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        slug: product.slug,
        category_type: product.category_type || 'luxury',
        added_at: Date.now()
      });
      MockToast.show(`${product.name} ditambahkan ke wishlist ❤️`, 'success');
    }
    saveWishlist(list);
    return idx === -1; // true = added
  }

  function isWishlisted(id) {
    return getWishlist().some(i => i.id === id);
  }

  function removeFromWish(id) {
    saveWishlist(getWishlist().filter(i => i.id !== id));
  }

  function updateWishBadge() {
    const count = getWishlist().length;
    const badge = document.getElementById('wishlist-badge');
    if (badge) {
      badge.textContent = count > 99 ? '99+' : String(count);
      badge.setAttribute('data-count', count);
    }
  }

  /* ---- ADDRESS BOOK ---- */
  const ADDR_KEY = 'mockstore_addresses';

  function getAddresses() {
    try { return JSON.parse(localStorage.getItem(ADDR_KEY)) || []; }
    catch { return []; }
  }

  function saveAddresses(list) {
    localStorage.setItem(ADDR_KEY, JSON.stringify(list));
  }

  function addAddress(addr) {
    const list = getAddresses();
    addr.id = Date.now();
    if (addr.is_default || list.length === 0) {
      list.forEach(a => a.is_default = false);
      addr.is_default = true;
    }
    list.push(addr);
    saveAddresses(list);
    return addr;
  }

  function getDefaultAddress() {
    const list = getAddresses();
    return list.find(a => a.is_default) || list[0] || null;
  }

  /* ---- ACHIEVEMENT BADGES ---- */
  const BADGES_KEY = 'mockstore_badges';
  const ALL_BADGES = [
    { id: 'first_order',   icon: '🛍', name: 'Pembeli Pertama',  desc: 'Selesaikan 1 pesanan' },
    { id: 'big_spender',   icon: '💎', name: 'Big Spender',      desc: 'Total belanja > 10 juta' },
    { id: 'foodie',        icon: '🍽', name: 'Foodie',           desc: 'Beli 3 produk makanan' },
    { id: 'luxury_lover',  icon: '✨', name: 'Luxury Lover',     desc: 'Beli produk luxury pertama' },
    { id: 'wish_hoarder',  icon: '❤️', name: 'Wish Hoarder',     desc: 'Wishlist 5 produk' },
    { id: 'cart_full',     icon: '🛒', name: 'Cart Full',        desc: 'Isi keranjang 5 item berbeda' },
  ];

  function getEarnedBadges() {
    try { return JSON.parse(localStorage.getItem(BADGES_KEY)) || []; }
    catch { return []; }
  }

  function earnBadge(id) {
    const earned = getEarnedBadges();
    if (earned.includes(id)) return false;
    earned.push(id);
    localStorage.setItem(BADGES_KEY, JSON.stringify(earned));
    const badge = ALL_BADGES.find(b => b.id === id);
    if (badge) MockToast.show(`🏆 Badge baru: ${badge.name}!`, 'success');
    return true;
  }

  function checkBadges(order) {
    const orders = getOrders();
    if (orders.length >= 1) earnBadge('first_order');
    const total = orders.reduce((s, o) => s + (o.grand_total || 0), 0);
    if (total >= 10_000_000) earnBadge('big_spender');
    const foodOrders = orders.flatMap(o => o.items || []).filter(i => i.category_type === 'food');
    if (foodOrders.length >= 3) earnBadge('foodie');
    const luxOrders = orders.flatMap(o => o.items || []).filter(i => i.category_type === 'luxury');
    if (luxOrders.length >= 1) earnBadge('luxury_lover');
    if (getWishlist().length >= 5) earnBadge('wish_hoarder');
    if (MockCart.getItems().length >= 5) earnBadge('cart_full');
  }

  // Init badge on load
  document.addEventListener('DOMContentLoaded', updateWishBadge);

  window.MockOrders = {
    getOrders, saveOrder, getOrderById,
    getWishlist, toggleWish, isWishlisted, removeFromWish,
    getAddresses, addAddress, getDefaultAddress,
    getAllBadges: () => ALL_BADGES,
    getEarnedBadges, earnBadge, checkBadges
  };
})();
