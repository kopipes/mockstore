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
    'bag-rose-4':       '1548036328-c9fa89d128fa',  // rose clutch
    'bag-cognac-5':     '1547949003-9792a18a2601',  // cognac leather bag
    'bag-duffle-6':     '1547949003-9792a18a2601',  // duffle travel bag
    'bag-chain-7':      '1548036328-c9fa89d128fa',  // chain wallet bag
    'bag-backpack-8':   '1584917865442-de89df76afd3', // premium backpack

    // ── Jam Tangan ─────────────────────────────────────────────
    'watch-perp-1':     '1523275335684-37898b6baf30', // luxury dress watch
    'watch-rg-2':       '1547996160-81dfa63595aa',  // rose gold watch
    'watch-dive-3':     '1547996160-81dfa63595aa',  // diver watch
    'watch-avi-4':      '1524592094714-0f0654e20314', // pilot chronograph
    'watch-tourbillon-5':'1523275335684-37898b6baf30', // tourbillon grande complication
    'watch-field-6':    '1524592094714-0f0654e20314', // field watch military

    // ── Elektronik ─────────────────────────────────────────────
    'laptop-carbon-1':  '1496181133206-80ce9b88a853', // macbook on desk
    'laptop-gaming-2':  '1593640495253-23196b27a87f', // gaming laptop RGB
    'tablet-studio-3':  '1544244015-0df4b3ffc6b0',  // tablet/ipad
    'headphone-anc-4':  '1505740420928-5e560c06d30e', // premium headphones
    'earbuds-anc-5':    '1505740420928-5e560c06d30e', // TWS earbuds
    'monitor-oled-6':   '1496181133206-80ce9b88a853', // OLED monitor

    // ── Perhiasan ──────────────────────────────────────────────
    'ring-diamond-1':   '1611591437281-460bfbe1220a', // diamond ring
    'bangle-gold-2':    '1611591437281-460bfbe1220a', // gold bangle
    'necklace-pearl-3': '1611591437281-460bfbe1220a', // pearl necklace

    // ── Aksesori ───────────────────────────────────────────────
    'sunglass-1':       '1577803645773-f96470509666', // fashion sunglasses
    'wallet-croco-2':   '1553062407-98eeb64c6a62',  // leather wallet
    'belt-ostrich-3':   '1553062407-98eeb64c6a62',  // ostrich belt

    // ── Wine & Spirits ─────────────────────────────────────────
    'wine-margaux-1':   '1546069901-ba9599a7e63c',  // wine/drinks
    'wine-dom-2':       '1495474472287-4d71bcdd2085', // champagne/drinks
    'whisky-yamazaki-3':'1546069901-ba9599a7e63c',  // whisky
    'cognac-hennessy-4':'1546069901-ba9599a7e63c',  // cognac
    'wine-barolo-5':    '1546069901-ba9599a7e63c',  // red wine
    'tequila-clase-6':  '1495474472287-4d71bcdd2085', // spirits

    // ── Seafood Premium ────────────────────────────────────────
    'seafood-lobster-1':'1559847844-5315695dadae',  // seafood
    'seafood-crab-2':   '1559847844-5315695dadae',  // crab
    'seafood-salmon-3': '1617196034183-421b4917c92d', // salmon
    'seafood-scallop-4':'1617196034183-421b4917c92d', // scallop
    'seafood-prawn-5':  '1617196034183-421b4917c92d', // prawn
    'seafood-uni-6':    '1617196034183-421b4917c92d', // uni

    // ── Artisan Bread ──────────────────────────────────────────
    'bread-sourdough-1':'1504674900247-0877df9cc836', // bread/food
    'bread-croissant-2':'1558618666-fcd25c85cd64',  // pastry
    'bread-campagne-3': '1504674900247-0877df9cc836', // rustic bread
    'bread-focaccia-4': '1504674900247-0877df9cc836', // focaccia
    'bread-danish-5':   '1579584425555-c3ce17fd4351', // danish pastry
    'bread-bagel-6':    '1558618666-fcd25c85cd64',  // bagel

    // ── Parfum Premium ─────────────────────────────────────────
    'perfume-noir-1':   '1547996160-81dfa63595aa',  // dark bottle
    'perfume-blanc-2':  '1547996160-81dfa63595aa',  // white perfume
    'perfume-bois-3':   '1547996160-81dfa63595aa',  // woody
    'perfume-rose-4':   '1547996160-81dfa63595aa',  // rose
    'perfume-oud-5':    '1547996160-81dfa63595aa',  // oud
    'perfume-aqua-6':   '1547996160-81dfa63595aa',  // fresh cologne

    // ── Pakaian Luxury ─────────────────────────────────────────
    'cloth-cashmere-1': '1548036328-c9fa89d128fa',  // luxury fashion
    'cloth-suit-2':     '1566150905458-1bf1fc113f0d', // suit/jacket
    'cloth-silk-3':     '1548036328-c9fa89d128fa',  // silk
    'cloth-trench-4':   '1566150905458-1bf1fc113f0d', // coat
    'cloth-denim-5':    '1566150905458-1bf1fc113f0d', // denim
    'cloth-linen-6':    '1548036328-c9fa89d128fa',  // linen shirt
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
