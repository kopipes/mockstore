/* ============ images.js — Product image mapping
   Uses Unsplash direct photo IDs (verified 200 OK).
   Format: https://images.unsplash.com/photo-{ID}?w={w}&h={h}&fit=crop&q=80
   ============================================================= */
(function () {

  const BASE = 'https://images.unsplash.com/photo-';
  const Q    = '?fit=crop&q=80&auto=format';

  // Verified photo IDs per product seed
  const IMAGE_MAP = {
    // ── Tas Mewah ──────────────────────────────────────────────
    'bag-noir-1':       '1548036328-c9fa89d128fa',  // black leather handbag
    'bag-camel-2':      '1584917865442-de89df76afd3', // camel tote bag
    'bag-burgundy-3':   '1566150905458-1bf1fc113f0d', // dark leather satchel
    'bag-rose-4':       '1548036328-c9fa89d128fa',  // use noir variant (rose not available)
    'bag-cognac-5':     '1547949003-9792a18a2601',  // cognac leather bag

    // ── Jam Tangan ─────────────────────────────────────────────
    'watch-perp-1':     '1523275335684-37898b6baf30', // luxury dress watch
    'watch-rg-2':       '1547996160-81dfa63595aa',  // close-up watch face
    'watch-dive-3':     '1547996160-81dfa63595aa',  // sport watch
    'watch-avi-4':      '1524592094714-0f0654e20314', // pilot chronograph

    // ── Elektronik ─────────────────────────────────────────────
    'laptop-carbon-1':  '1496181133206-80ce9b88a853', // macbook on desk
    'laptop-gaming-2':  '1593640495253-23196b27a87f', // gaming laptop RGB
    'tablet-studio-3':  '1544244015-0df4b3ffc6b0',  // tablet/ipad
    'headphone-anc-4':  '1505740420928-5e560c06d30e', // premium headphones

    // ── Perhiasan ──────────────────────────────────────────────
    'ring-diamond-1':   '1611591437281-460bfbe1220a', // jewelry close-up
    'bangle-gold-2':    '1611591437281-460bfbe1220a', // jewelry variant
    'necklace-pearl-3': '1611591437281-460bfbe1220a', // pearl necklace

    // ── Aksesori ───────────────────────────────────────────────
    'sunglass-1':       '1577803645773-f96470509666', // fashion sunglasses
    'wallet-croco-2':   '1553062407-98eeb64c6a62',  // leather wallet
    'belt-ostrich-3':   '1553062407-98eeb64c6a62',  // leather accessories

    // ── Fine Dining ────────────────────────────────────────────
    'dining-prestige-1':'1414235077428-338989a2e8c0', // elegant restaurant
    'dining-omakase-2': '1579871494447-9811cf80d66c', // japanese chef table
    'dining-tea-3':     '1558618666-fcd25c85cd64',  // afternoon tea

    // ── Gourmet ────────────────────────────────────────────────
    'food-wagyu-1':     '1546069901-ba9599a7e63c',  // wagyu beef steak
    'food-truffle-2':   '1504674900247-0877df9cc836', // gourmet food
    'food-foiegras-3':  '1559847844-5315695dadae',  // french cuisine
    'food-caviar-4':    '1559847844-5315695dadae',  // luxury food

    // ── Kafe Premium ───────────────────────────────────────────
    'coffee-geisha-1':  '1495474472287-4d71bcdd2085', // specialty coffee
    'coffee-luwak-2':   '1600585154340-be6161a56a0c', // coffee beans
    'food-macaron-3':   '1558618666-fcd25c85cd64',  // pastry/dessert

    // ── Sushi & Omakase ────────────────────────────────────────
    'food-sashimi-1':   '1617196034183-421b4917c92d', // sashimi platter
    'food-bento-2':     '1569050467447-ce54b3bbc37d', // japanese bento
    'food-dragon-3':    '1611143669185-af224c5e3252', // sushi roll

    // ── Dessert ────────────────────────────────────────────────
    'food-choco-1':     '1606787366850-de6330128bfc', // chocolate praline
    'food-opera-2':     '1563729784474-d77dbb933a9e', // elegant cake
    'food-mille-3':     '1579584425555-c3ce17fd4351', // french pastry
  };

  // Gallery variants — crop offsets for 4 different views
  const VARIANTS = [
    'w={w}&h={h}',
    'w={w}&h={h}&crop=top',
    'w={w}&h={h}&crop=bottom',
    'w={w}&h={h}&crop=entropy',
  ];

  /**
   * Get image URL for a product.
   * @param {string|number} seed   — image_seed from DB
   * @param {number} w             — width
   * @param {number} h             — height
   * @param {number} [variant=0]   — 0-3 for gallery variants
   */
  function getUrl(seed, w = 400, h = 400, variant = 0) {
    const photoId = IMAGE_MAP[String(seed)];
    if (photoId) {
      const cropParam = VARIANTS[variant] || VARIANTS[0];
      const dims = cropParam.replace('{w}', w).replace('{h}', h);
      return `${BASE}${photoId}?${dims}&fit=crop&q=80&auto=format`;
    }
    // Fallback: picsum with seed
    return `https://picsum.photos/seed/${seed}/${w}/${h}`;
  }

  /**
   * Get all 4 gallery URLs for a product.
   */
  function getGallery(seed, w = 600, h = 600) {
    return [0, 1, 2, 3].map(i => getUrl(seed, w, h, i));
  }

  window.MockImages = { getUrl, getGallery };
})();
