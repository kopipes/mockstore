/* ============ images.js — Product image mapping (Local files only) ============ */
(function () {

  const BASE = 'assets/products/';

  // All seeds mapped to local files in assets/products/
  const IMAGE_MAP = {
    // ── Tas Mewah ──────────────────────────────────────────────
    'bag-noir-1':        'bag-noir',
    'bag-camel-2':       'bag-camel',
    'bag-burgundy-3':    'bag-dark',
    'bag-rose-4':        'bag-rose-4',
    'bag-cognac-5':      'bag-cognac',
    'bag-duffle-6':      'bag-duffle-6',
    'bag-chain-7':       'bag-chain-7',
    'bag-backpack-8':    'bag-backpack-8',

    // ── Jam Tangan ─────────────────────────────────────────────
    'watch-perp-1':      'watch-1',
    'watch-rg-2':        'watch-2',
    'watch-dive-3':      'watch-3',
    'watch-avi-4':       'watch-avi-4',
    'watch-tourbillon-5':'watch-tourbillon-5',
    'watch-field-6':     'watch-field-6',

    // ── Elektronik ─────────────────────────────────────────────
    'laptop-carbon-1':   'laptop-1',
    'laptop-gaming-2':   'laptop-gaming',
    'tablet-studio-3':   'tablet',
    'headphone-anc-4':   'headphone',
    'earbuds-anc-5':     'earbuds-anc-5',
    'monitor-oled-6':    'monitor-oled-6',

    // ── Perhiasan ──────────────────────────────────────────────
    'ring-diamond-1':    'ring-diamond-1',
    'bangle-gold-2':     'bangle-gold-2',
    'necklace-pearl-3':  'necklace-pearl-3',

    // ── Aksesori ───────────────────────────────────────────────
    'sunglass-1':        'sunglasses',
    'wallet-croco-2':    'wallet',
    'belt-ostrich-3':    'belt-ostrich-3',

    // ── Sepatu Mewah ───────────────────────────────────────────
    'shoe-stiletto-1':   'shoe-stiletto-1',
    'shoe-oxford-2':     'shoe-oxford-2',
    'shoe-sneaker-3':    'shoe-sneaker-3',
    'shoe-loafer-4':     'shoe-loafer-4',
    'shoe-boot-5':       'shoe-boot-5',
    'shoe-sandal-6':     'shoe-sandal-6',

    // ── Parfum Premium ─────────────────────────────────────────
    'perfume-noir-1':    'perfume-noir-1',
    'perfume-blanc-2':   'perfume-blanc-2',
    'perfume-bois-3':    'perfume-bois-3',
    'perfume-rose-4':    'perfume-rose-4',
    'perfume-oud-5':     'perfume-oud-5',
    'perfume-aqua-6':    'perfume-aqua-6',

    // ── Pakaian Luxury ─────────────────────────────────────────
    'cloth-cashmere-1':  'cloth-cashmere-1',
    'cloth-suit-2':      'cloth-suit-2',
    'cloth-silk-3':      'cloth-silk-3',
    'cloth-trench-4':    'cloth-trench-4',
    'cloth-denim-5':     'cloth-denim-5',
    'cloth-linen-6':     'cloth-linen-6',

    // ── Fine Dining ────────────────────────────────────────────
    'dining-prestige-1': 'dining',
    'dining-omakase-2':  'omakase',
    'dining-tea-3':      'tea',
    'dining-wagyu-4':    'omakase',
    'dining-wine-5':     'dining',

    // ── Gourmet ────────────────────────────────────────────────
    'food-wagyu-1':      'wagyu',
    'food-truffle-2':    'truffle',
    'food-foiegras-3':   'foiegras',
    'food-caviar-4':     'foiegras',
    'food-iberico-5':    'wagyu',
    'food-white-truffle-6': 'truffle',

    // ── Wine & Spirits ─────────────────────────────────────────
    'wine-margaux-1':    'wine-margaux-1',
    'wine-dom-2':        'wine-dom-2',
    'whisky-yamazaki-3': 'whisky-yamazaki-3',
    'cognac-hennessy-4': 'cognac-hennessy-4',
    'wine-barolo-5':     'wine-barolo-5',
    'tequila-clase-6':   'tequila-clase-6',

    // ── Kafe Premium ───────────────────────────────────────────
    'coffee-geisha-1':   'coffee',
    'coffee-luwak-2':    'beans',
    'food-macaron-3':    'pastry',

    // ── Seafood Premium ────────────────────────────────────────
    'seafood-lobster-1': 'seafood',
    'seafood-crab-2':    'seafood-b',
    'seafood-salmon-3':  'seafood-salmon-3',
    'seafood-scallop-4': 'seafood-scallop-4',
    'seafood-prawn-5':   'seafood-prawn-5',
    'seafood-uni-6':     'seafood-uni-6',

    // ── Artisan Bread ──────────────────────────────────────────
    'bread-sourdough-1': 'bread-sourdough-1',
    'bread-croissant-2': 'bread-croissant-2',
    'bread-campagne-3':  'bread-campagne-3',
    'bread-focaccia-4':  'bread-focaccia-4',
    'bread-danish-5':    'bread-danish-5',
    'bread-bagel-6':     'bread-bagel-6',

    // ── Sushi & Omakase ────────────────────────────────────────
    'food-sashimi-1':    'sashimi',
    'food-bento-2':      'bento',
    'food-dragon-3':     'sushi-roll',
    'food-toro-4':       'sashimi',
    'food-unidon-5':     'bento',

    // ── Dessert ────────────────────────────────────────────────
    'food-choco-1':      'chocolate',
    'food-opera-2':      'cake',
    'food-mille-3':      'pastry',

    // ── Properti: Rumah Mewah ──────────────────────────────────
    'prop-rumah-1':      'prop-rumah-1',
    'prop-rumah-2':      'prop-rumah-2',
    'prop-rumah-3':      'prop-rumah-3',
    'prop-rumah-4':      'prop-rumah-5',
    'prop-rumah-5':      'prop-rumah-5',

    // ── Properti: Villa & Resort ───────────────────────────────
    'prop-villa-1':      'prop-villa-1',
    'prop-villa-2':      'prop-villa-2',
    'prop-villa-3':      'prop-villa-4',
    'prop-villa-4':      'prop-villa-4',

    // ── Properti: Apartemen ────────────────────────────────────
    'prop-apt-1':        'prop-apt-1',
    'prop-apt-2':        'prop-apt-2',
    'prop-apt-3':        'prop-apt-3',
    'prop-apt-4':        'prop-apt-4',

    // ── Properti: Tanah Kavling ────────────────────────────────
    'prop-tanah-1':      'prop-tanah-1',
    'prop-tanah-2':      'prop-tanah-2',
    'prop-tanah-3':      'prop-tanah-3',

    // ── Properti: Komersial ────────────────────────────────────
    'prop-komersial-1':  'prop-komersial-1',
    'prop-komersial-2':  'prop-komersial-2',
    'prop-komersial-3':  'prop-komersial-3',
  };

  function getUrl(seed, w = 400, h = 400) {
    const filename = IMAGE_MAP[String(seed)];
    if (filename) return `${BASE}${filename}.jpg`;
    // Fallback SVG for unknown seeds
    return generateSvg(seed);
  }

  function getGallery(seed, w = 600, h = 600) {
    const url = getUrl(seed, w, h);
    return [url, url, url, url];
  }

  function generateSvg(seed) {
    const colors = ['#2c3e50','#8b4513','#1a6b3a','#4a1a6b','#1a3a6b','#6b1a1a'];
    const icons  = ['🛍️','✨','💎','🌿','👑','🏆'];
    const idx = Math.abs(String(seed).charCodeAt(0)) % colors.length;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
      <rect width="400" height="400" fill="${colors[idx]}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-size="120" font-family="Segoe UI Emoji,sans-serif">${icons[idx]}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  window.MockImages = { getUrl, getGallery };
})();
