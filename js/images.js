/* ============ images.js — Product image mapping
   Uses locally hosted images at /assets/products/
   Downloaded from Unsplash, self-hosted on VPS.
   ============================================================= */
(function () {

  const BASE = '/assets/products/';

  // Map image_seed -> local filename (without .jpg)
  const IMAGE_MAP = {
    // ── Tas Mewah ──────────────────────────────────────────────
    'bag-noir-1':        'bag-noir',
    'bag-camel-2':       'bag-camel',
    'bag-burgundy-3':    'bag-dark',
    'bag-rose-4':        'bag-noir',
    'bag-cognac-5':      'bag-cognac',
    'bag-duffle-6':      'bag-cognac',
    'bag-chain-7':       'bag-noir',
    'bag-backpack-8':    'bag-camel',

    // ── Jam Tangan ─────────────────────────────────────────────
    'watch-perp-1':      'watch-1',
    'watch-rg-2':        'watch-2',
    'watch-dive-3':      'watch-3',
    'watch-avi-4':       'watch-1',
    'watch-tourbillon-5':'watch-2',
    'watch-field-6':     'watch-3',

    // ── Elektronik ─────────────────────────────────────────────
    'laptop-carbon-1':   'laptop-1',
    'laptop-gaming-2':   'laptop-gaming',
    'tablet-studio-3':   'tablet',
    'headphone-anc-4':   'headphone',
    'earbuds-anc-5':     'headphone',
    'monitor-oled-6':    'laptop-1',

    // ── Perhiasan ──────────────────────────────────────────────
    'ring-diamond-1':    'jewelry',
    'bangle-gold-2':     'jewelry',
    'necklace-pearl-3':  'jewelry',

    // ── Aksesori ───────────────────────────────────────────────
    'sunglass-1':        'sunglasses',
    'wallet-croco-2':    'wallet',
    'belt-ostrich-3':    'wallet',

    // ── Sepatu Mewah ───────────────────────────────────────────
    'shoe-stiletto-1':   'shoes',
    'shoe-oxford-2':     'shoe-a',
    'shoe-sneaker-3':    'shoes',
    'shoe-loafer-4':     'shoe-a',
    'shoe-boot-5':       'shoes',
    'shoe-sandal-6':     'shoe-a',

    // ── Parfum Premium ─────────────────────────────────────────
    'perfume-noir-1':    'jewelry',
    'perfume-blanc-2':   'jewelry',
    'perfume-bois-3':    'jewelry',
    'perfume-rose-4':    'jewelry',
    'perfume-oud-5':     'jewelry',
    'perfume-aqua-6':    'jewelry',

    // ── Pakaian Luxury ─────────────────────────────────────────
    'cloth-cashmere-1':  'clothes',
    'cloth-suit-2':      'clothes-a',
    'cloth-silk-3':      'clothes',
    'cloth-trench-4':    'clothes-a',
    'cloth-denim-5':     'clothes',
    'cloth-linen-6':     'clothes-a',

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
    'wine-margaux-1':    'dining',
    'wine-dom-2':        'tea',
    'whisky-yamazaki-3': 'coffee',
    'cognac-hennessy-4': 'coffee',
    'wine-barolo-5':     'dining',
    'tequila-clase-6':   'coffee',

    // ── Kafe Premium ───────────────────────────────────────────
    'coffee-geisha-1':   'coffee',
    'coffee-luwak-2':    'beans',
    'food-macaron-3':    'pastry',

    // ── Seafood Premium ────────────────────────────────────────
    'seafood-lobster-1': 'seafood',
    'seafood-crab-2':    'seafood-b',
    'seafood-salmon-3':  'seafood',
    'seafood-scallop-4': 'seafood-b',
    'seafood-prawn-5':   'seafood',
    'seafood-uni-6':     'seafood-b',

    // ── Artisan Bread ──────────────────────────────────────────
    'bread-sourdough-1': 'pastry',
    'bread-croissant-2': 'pastry',
    'bread-campagne-3':  'pastry',
    'bread-focaccia-4':  'pastry',
    'bread-danish-5':    'pastry',
    'bread-bagel-6':     'pastry',

    // ── Sushi & Omakase ────────────────────────────────────────
    'food-sashimi-1':    'sashimi',
    'food-bento-2':      'bento',
    'food-dragon-3':     'sushi-roll',
    'food-toro-4':       'sashimi',
    'food-unidon-5':     'bento',

    // ── Properti: Rumah Mewah ──────────────────────────────────
    'prop-rumah-1':      'prop-rumah-1',
    'prop-rumah-2':      'prop-rumah-1',
    'prop-rumah-3':      'prop-rumah-1',
    'prop-rumah-4':      'prop-rumah-1',
    'prop-rumah-5':      'prop-rumah-5',

    // ── Properti: Villa & Resort ───────────────────────────────
    'prop-villa-1':      'prop-villa-1',
    'prop-villa-2':      'prop-villa-1',
    'prop-villa-3':      'prop-villa-4',
    'prop-villa-4':      'prop-villa-4',

    // ── Properti: Apartemen ────────────────────────────────────
    'prop-apt-1':        'prop-apt-1',
    'prop-apt-2':        'prop-apt-2',
    'prop-apt-3':        'prop-apt-3',
    'prop-apt-4':        'prop-apt-4',

    // ── Properti: Tanah Kavling ────────────────────────────────
    'prop-tanah-1':      'prop-tanah-1',
    'prop-tanah-2':      'prop-tanah-1',
    'prop-tanah-3':      'prop-tanah-1',

    // ── Properti: Komersial ────────────────────────────────────
    'prop-komersial-1':  'prop-komersial-1',
    'prop-komersial-2':  'prop-apt-1',
    'prop-komersial-3':  'prop-villa-1',

    // ── Dessert ────────────────────────────────────────────────
    'food-choco-1':      'chocolate',
    'food-opera-2':      'cake',
    'food-mille-3':      'pastry',
  };

  // Gallery crop params — use CSS object-position to simulate different views
  const CROP_PARAMS = [
    '?w={w}&h={h}&fit=crop&q=80',
    '?w={w}&h={h}&fit=crop&q=80&crop=top',
    '?w={w}&h={h}&fit=crop&q=80&crop=center',
    '?w={w}&h={h}&fit=crop&q=80&crop=bottom',
  ];

  function getUrl(seed, w = 400, h = 400, variant = 0) {
    const filename = IMAGE_MAP[String(seed)];
    if (filename) {
      return `${BASE}${filename}.jpg`;
    }
    // Fallback SVG for unknown seeds
    return generateSvg(seed, w, h);
  }

  function getGallery(seed, w = 600, h = 600) {
    // Return same image for all gallery slots (different crop handled by CSS)
    const url = getUrl(seed, w, h, 0);
    return [url, url, url, url];
  }

  function generateSvg(seed, w, h) {
    const colors = ['#2c3e50','#8b4513','#1a6b3a','#4a1a6b','#1a3a6b','#6b1a1a'];
    const icons  = ['🛍️','✨','💎','🌿','👑','🏆'];
    const idx = Math.abs(String(seed).charCodeAt(0)) % colors.length;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <rect width="${w}" height="${h}" fill="${colors[idx]}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-size="${Math.round(w*0.3)}" font-family="Segoe UI Emoji,sans-serif">${icons[idx]}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  window.MockImages = { getUrl, getGallery };
})();
