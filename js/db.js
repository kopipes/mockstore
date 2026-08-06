/* ============ DB.JS — sql.js initialization + query helpers ============
   Loads mockstore.sqlite via fetch, initializes sql.js WASM,
   exposes query helpers used by all render modules.
   ============================================================= */
(function () {
  let _db = null;
  let _ready = false;
  const _queue = [];

  const SQLJS_VERSION = '1.10.3';
  const SQLJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/sql.js/${SQLJS_VERSION}`;

  /* ---- Bootstrap ---- */
  async function init() {
    // Timeout safety — if DB not ready in 20s, show error
    const timeout = setTimeout(() => {
      if (!_ready) {
        window.dispatchEvent(new CustomEvent('db:error', {
          detail: 'Timeout memuat database (20 detik). Coba refresh halaman.'
        }));
      }
    }, 20000);

    try {
      // Load sql.js from CDN
      await loadScript(`${SQLJS_CDN}/sql-wasm.min.js`);

      const SQL = await initSqlJs({
        locateFile: file => `${SQLJS_CDN}/${file}`
      });

      const resp = await fetch('data/mockstore.sqlite?v=3');
      if (!resp.ok) throw new Error('Gagal memuat database produk. Status: ' + resp.status);
      const buf = await resp.arrayBuffer();
      _db = new SQL.Database(new Uint8Array(buf));
      _ready = true;
      clearTimeout(timeout);

      // Flush queue
      _queue.forEach(fn => fn(_db));
      _queue.length = 0;

      window.dispatchEvent(new Event('db:ready'));
    } catch (err) {
      clearTimeout(timeout);
      console.error('[MockDB]', err);
      window.dispatchEvent(new CustomEvent('db:error', { detail: err.message }));
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // Check by partial src match to handle query string differences
      const existing = Array.from(document.querySelectorAll('script')).find(s =>
        s.src && s.src.includes('sql-wasm.min.js')
      );
      if (existing) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error(`Gagal load sql.js dari CDN. Periksa koneksi internet.`));
      document.head.appendChild(s);
    });
  }

  /* ---- Core query helper ---- */
  function query(sql, params = []) {
    if (!_db) throw new Error('DB belum siap');
    const stmt = _db.prepare(sql);
    stmt.bind(params);
    const rows = [];
    while (stmt.step()) rows.push(stmt.getAsObject());
    stmt.free();
    return rows;
  }

  function queryOne(sql, params = []) {
    const rows = query(sql, params);
    return rows[0] || null;
  }

  /* ---- Public API ---- */

  // Categories
  function getCategories() {
    return query(`SELECT * FROM categories ORDER BY sort_order ASC`);
  }

  function getCategoryBySlug(slug) {
    return queryOne(`SELECT * FROM categories WHERE slug = ?`, [slug]);
  }

  // Products
  function getProducts({ categorySlug, search, sort = 'featured', limit = 40, offset = 0 } = {}) {
    let sql = `
      SELECT p.*, c.name AS category_name, c.type AS category_type, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (categorySlug && categorySlug !== 'all') {
      // Support type filter (luxury / food) or exact slug
      if (categorySlug === 'luxury' || categorySlug === 'food') {
        sql += ` AND c.type = ?`;
        params.push(categorySlug);
      } else {
        sql += ` AND c.slug = ?`;
        params.push(categorySlug);
      }
    }

    if (search && search.trim()) {
      sql += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      const q = `%${search.trim()}%`;
      params.push(q, q);
    }

    switch (sort) {
      case 'price_asc':  sql += ` ORDER BY p.price ASC`;  break;
      case 'price_desc': sql += ` ORDER BY p.price DESC`; break;
      case 'rating':     sql += ` ORDER BY p.rating DESC`; break;
      case 'newest':     sql += ` ORDER BY p.id DESC`;     break;
      default:           sql += ` ORDER BY p.is_featured DESC, p.rating DESC`; break;
    }

    sql += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    return query(sql, params);
  }

  function getFeaturedProducts(limit = 8) {
    return query(`
      SELECT p.*, c.name AS category_name, c.type AS category_type, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.is_featured = 1
      ORDER BY p.rating DESC
      LIMIT ?
    `, [limit]);
  }

  function getProductBySlug(slug) {
    return queryOne(`
      SELECT p.*, c.name AS category_name, c.type AS category_type, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `, [slug]);
  }

  function getProductById(id) {
    return queryOne(`
      SELECT p.*, c.name AS category_name, c.type AS category_type, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);
  }

  function getRelatedProducts(productId, categoryId, limit = 4) {
    return query(`
      SELECT p.*, c.name AS category_name, c.type AS category_type, c.slug AS category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.category_id = ? AND p.id != ?
      ORDER BY p.rating DESC
      LIMIT ?
    `, [categoryId, productId, limit]);
  }

  function countProducts({ categorySlug, search } = {}) {
    let sql = `SELECT COUNT(*) AS total FROM products p JOIN categories c ON p.category_id = c.id WHERE 1=1`;
    const params = [];
    if (categorySlug && categorySlug !== 'all') {
      if (categorySlug === 'luxury' || categorySlug === 'food') {
        sql += ` AND c.type = ?`; params.push(categorySlug);
      } else {
        sql += ` AND c.slug = ?`; params.push(categorySlug);
      }
    }
    if (search && search.trim()) {
      sql += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      const q = `%${search.trim()}%`;
      params.push(q, q);
    }
    const row = queryOne(sql, params);
    return row ? row.total : 0;
  }

  // Reviews
  function getReviews(productId) {
    return query(`SELECT * FROM reviews WHERE product_id = ? ORDER BY helpful DESC LIMIT 10`, [productId]);
  }

  // Couriers
  function getCouriers(type = null) {
    if (type) return query(`SELECT * FROM couriers WHERE type = ? OR type = 'all' ORDER BY price ASC`, [type]);
    return query(`SELECT * FROM couriers ORDER BY price ASC`);
  }

  // Vouchers
  function getVoucher(code) {
    return queryOne(`SELECT * FROM vouchers WHERE UPPER(code) = UPPER(?) AND active = 1`, [code]);
  }

  // Ready check
  function onReady(fn) {
    if (_ready) fn(_db);
    else _queue.push(fn);
  }

  function isReady() { return _ready; }

  window.MockDB = {
    init, onReady, isReady, query, queryOne,
    getCategories, getCategoryBySlug,
    getProducts, getFeaturedProducts, getProductBySlug, getProductById,
    getRelatedProducts, countProducts,
    getReviews, getCouriers, getVoucher
  };
})();
