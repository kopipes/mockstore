/* ============ images.js — Product image mapping
   Uses picsum.photos with descriptive seeds for consistency.
   Same seed always returns the same image.
   ============================================================= */
(function () {

  // Map image_seed -> picsum seed string (descriptive, consistent)
  const IMAGE_MAP = {
    // Tas Mewah
    'bag-noir-1':       'leather-handbag-black',
    'bag-camel-2':      'tote-bag-camel',
    'bag-burgundy-3':   'satchel-burgundy-leather',
    'bag-rose-4':       'clutch-bag-rose',
    'bag-cognac-5':     'office-tote-cognac',

    // Jam Tangan
    'watch-perp-1':     'luxury-watch-calendar',
    'watch-rg-2':       'rose-gold-dress-watch',
    'watch-dive-3':     'titanium-diver-watch',
    'watch-avi-4':      'aviator-chronograph-watch',

    // Elektronik
    'laptop-carbon-1':  'ultrabook-carbon-laptop',
    'laptop-gaming-2':  'gaming-laptop-rgb',
    'tablet-studio-3':  'studio-tablet-creative',
    'headphone-anc-4':  'wireless-headphone-premium',

    // Perhiasan
    'ring-diamond-1':   'diamond-solitaire-ring',
    'bangle-gold-2':    'gold-bangle-bracelet',
    'necklace-pearl-3': 'pearl-necklace-akoya',

    // Aksesori
    'sunglass-1':       'titanium-sunglasses-fashion',
    'wallet-croco-2':   'crocodile-leather-wallet',
    'belt-ostrich-3':   'ostrich-leather-belt',

    // Fine Dining
    'dining-prestige-1':'fine-dining-restaurant-table',
    'dining-omakase-2': 'omakase-chef-japanese',
    'dining-tea-3':     'afternoon-tea-dessert-set',

    // Gourmet
    'food-wagyu-1':     'wagyu-beef-steak-marbling',
    'food-truffle-2':   'black-truffle-gourmet',
    'food-foiegras-3':  'foie-gras-french-cuisine',
    'food-caviar-4':    'ossetra-caviar-gourmet',

    // Kafe Premium
    'coffee-geisha-1':  'specialty-coffee-pour-over',
    'coffee-luwak-2':   'coffee-beans-premium',
    'food-macaron-3':   'macaron-pastry-colorful',

    // Sushi & Omakase
    'food-sashimi-1':   'sashimi-platter-japanese',
    'food-bento-2':     'bento-box-japanese-premium',
    'food-dragon-3':     'dragon-roll-sushi-premium',

    // Dessert
    'food-choco-1':     'chocolate-praline-valrhona',
    'food-opera-2':     'opera-cake-patisserie',
    'food-mille-3':     'millefeuille-pastry-french',
  };

  // Gallery variants — append suffix for 4 different views
  const VARIANTS = ['', '-detail', '-closeup', '-lifestyle'];

  /**
   * Get image URL for a product.
   * @param {string|number} seed  — image_seed from DB (or product id as fallback)
   * @param {number} w            — width
   * @param {number} h            — height
   * @param {number} [variant=0]  — 0-3 for gallery variants
   */
  function getUrl(seed, w = 400, h = 400, variant = 0) {
    const picsumSeed = IMAGE_MAP[seed];
    const finalSeed = picsumSeed
      ? picsumSeed + (VARIANTS[variant] || '')
      : String(seed) + (VARIANTS[variant] || '');
    return `https://picsum.photos/seed/${finalSeed}/${w}/${h}`;
  }

  /**
   * Get all 4 gallery URLs for a product.
   */
  function getGallery(seed, w = 600, h = 600) {
    return VARIANTS.map((_, i) => getUrl(seed, w, h, i));
  }

  window.MockImages = { getUrl, getGallery };
})();
