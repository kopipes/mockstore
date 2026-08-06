/* ============ images.js — Product image generator
   Generates inline SVG placeholders per product category.
   No external dependencies, no 404s, always relevant.
   ============================================================= */
(function () {

  // Category visual config: gradient colors + emoji icon
  const CATEGORY_STYLE = {
    // Luxury bags
    'bag-noir-1':       { from: '#1a1a2e', to: '#16213e', icon: '👜', label: 'Luxury Bag' },
    'bag-camel-2':      { from: '#c8a882', to: '#a0785a', icon: '👜', label: 'Tote Bag' },
    'bag-burgundy-3':   { from: '#6b2737', to: '#4a1520', icon: '👜', label: 'Satchel' },
    'bag-rose-4':       { from: '#e8a0b4', to: '#c4728a', icon: '👛', label: 'Clutch Bag' },
    'bag-cognac-5':     { from: '#8b5e3c', to: '#6b3f22', icon: '💼', label: 'Office Bag' },
    'bag-duffle-6':     { from: '#5c4033', to: '#3e2a1e', icon: '🎒', label: 'Duffle Bag' },
    'bag-chain-7':      { from: '#2c2c2c', to: '#1a1a1a', icon: '👜', label: 'Chain Bag' },
    'bag-backpack-8':   { from: '#3d5a80', to: '#2c3e6b', icon: '🎒', label: 'Backpack' },

    // Watches
    'watch-perp-1':     { from: '#1c1c1e', to: '#2c2c2e', icon: '⌚', label: 'Perpetual' },
    'watch-rg-2':       { from: '#b8860b', to: '#8b6508', icon: '⌚', label: 'Rose Gold' },
    'watch-dive-3':     { from: '#0f3460', to: '#0a2540', icon: '🤿', label: 'Diver' },
    'watch-avi-4':      { from: '#2d2d2d', to: '#1a1a1a', icon: '✈️', label: 'Aviator' },
    'watch-tourbillon-5':{ from: '#silver', to: '#888', icon: '⌚', label: 'Tourbillon' },
    'watch-field-6':    { from: '#3b4a3f', to: '#2a3530', icon: '🪖', label: 'Field Watch' },

    // Electronics
    'laptop-carbon-1':  { from: '#1d1d1f', to: '#2d2d2f', icon: '💻', label: 'UltraBook' },
    'laptop-gaming-2':  { from: '#0f0f23', to: '#1a0a3e', icon: '🎮', label: 'Gaming' },
    'tablet-studio-3':  { from: '#f5f5f7', to: '#e5e5e7', icon: '📱', label: 'Tablet' },
    'headphone-anc-4':  { from: '#1c1c1e', to: '#2c2c2e', icon: '🎧', label: 'Headphone' },
    'earbuds-anc-5':    { from: '#f5f5f7', to: '#e0e0e2', icon: '🎵', label: 'Earbuds' },
    'monitor-oled-6':   { from: '#0a0a0a', to: '#1a1a1a', icon: '🖥️', label: '8K Monitor' },

    // Jewelry
    'ring-diamond-1':   { from: '#e8e8f0', to: '#c8c8d8', icon: '💍', label: 'Diamond Ring' },
    'bangle-gold-2':    { from: '#d4af37', to: '#b8960b', icon: '📿', label: 'Gold Bangle' },
    'necklace-pearl-3': { from: '#f8f0e8', to: '#e8d8c8', icon: '📿', label: 'Pearl' },

    // Accessories
    'sunglass-1':       { from: '#1a1a2e', to: '#0f0f1e', icon: '🕶️', label: 'Sunglasses' },
    'wallet-croco-2':   { from: '#3d2b1f', to: '#2a1c10', icon: '👛', label: 'Wallet' },
    'belt-ostrich-3':   { from: '#2c1810', to: '#1a0e08', icon: '👔', label: 'Belt' },

    // Shoes
    'shoe-stiletto-1':  { from: '#1a1a1a', to: '#2c2c2c', icon: '👠', label: 'Stiletto' },
    'shoe-oxford-2':    { from: '#3b2a1a', to: '#2a1c10', icon: '👞', label: 'Oxford' },
    'shoe-sneaker-3':   { from: '#f5f5f5', to: '#e0e0e0', icon: '👟', label: 'Sneaker' },
    'shoe-loafer-4':    { from: '#4a2c1a', to: '#3a1c0a', icon: '🥿', label: 'Loafer' },
    'shoe-boot-5':      { from: '#2c1a0a', to: '#1a0e04', icon: '👢', label: 'Ankle Boot' },
    'shoe-sandal-6':    { from: '#d4af37', to: '#b8960b', icon: '👡', label: 'Sandal' },

    // Perfume
    'perfume-noir-1':   { from: '#1a1a2e', to: '#0f0f1e', icon: '🧴', label: 'Noir Absolu' },
    'perfume-blanc-2':  { from: '#f8f8ff', to: '#e8e8f0', icon: '🌸', label: 'Blanc' },
    'perfume-bois-3':   { from: '#5c4033', to: '#3e2a1e', icon: '🌲', label: 'Bois' },
    'perfume-rose-4':   { from: '#e8a0b4', to: '#c4728a', icon: '🌹', label: 'Rose' },
    'perfume-oud-5':    { from: '#3d2b0a', to: '#2a1c04', icon: '🌿', label: 'Oud Royal' },
    'perfume-aqua-6':   { from: '#1a6b8a', to: '#0f4a6b', icon: '💧', label: 'Aqua' },

    // Clothes
    'cloth-cashmere-1': { from: '#c8a882', to: '#a08060', icon: '🧥', label: 'Cashmere' },
    'cloth-suit-2':     { from: '#1a2a3a', to: '#0f1e2e', icon: '👔', label: 'Suit' },
    'cloth-silk-3':     { from: '#e8d5c4', to: '#c8b5a4', icon: '👗', label: 'Silk' },
    'cloth-trench-4':   { from: '#c8a860', to: '#a08840', icon: '🧥', label: 'Trench' },
    'cloth-denim-5':    { from: '#2d4a6b', to: '#1e3450', icon: '👖', label: 'Denim' },
    'cloth-linen-6':    { from: '#e8e0d0', to: '#c8c0b0', icon: '👕', label: 'Linen' },

    // Fine Dining
    'dining-prestige-1':{ from: '#1a0f08', to: '#2a1f18', icon: '🍽️', label: 'Fine Dining' },
    'dining-omakase-2': { from: '#0f1a0f', to: '#1f2a1f', icon: '🍱', label: 'Omakase' },
    'dining-tea-3':     { from: '#f5e6d0', to: '#e5d0b8', icon: '☕', label: 'Afternoon Tea' },
    'dining-wagyu-4':   { from: '#2a0f0f', to: '#1a0808', icon: '🥩', label: 'Wagyu Omakase' },
    'dining-wine-5':    { from: '#3d0a1a', to: '#2a0510', icon: '🍷', label: 'Wine Degustation' },

    // Gourmet
    'food-wagyu-1':     { from: '#8b1a1a', to: '#6b0f0f', icon: '🥩', label: 'Wagyu A5' },
    'food-truffle-2':   { from: '#2a1a0a', to: '#1a0f04', icon: '🍄', label: 'Black Truffle' },
    'food-foiegras-3':  { from: '#c8a060', to: '#a08040', icon: '🦆', label: 'Foie Gras' },
    'food-caviar-4':    { from: '#0f0f1a', to: '#1a1a2a', icon: '🫧', label: 'Caviar' },
    'food-iberico-5':   { from: '#8b3a2a', to: '#6b2a1a', icon: '🥩', label: 'Iberico Ham' },
    'food-white-truffle-6':{ from: '#e8d5b0', to: '#c8b590', icon: '🍄', label: 'White Truffle' },

    // Wine & Spirits
    'wine-margaux-1':   { from: '#4a0a1a', to: '#2a0510', icon: '🍷', label: 'Château Margaux' },
    'wine-dom-2':       { from: '#f5e6c8', to: '#e0c898', icon: '🥂', label: 'Dom Pérignon' },
    'whisky-yamazaki-3':{ from: '#8b5a1a', to: '#6b400a', icon: '🥃', label: 'Yamazaki 18' },
    'cognac-hennessy-4':{ from: '#7a4010', to: '#5a2808', icon: '🥃', label: 'Hennessy' },
    'wine-barolo-5':    { from: '#5a0a1a', to: '#3a0510', icon: '🍷', label: 'Barolo' },
    'tequila-clase-6':  { from: '#1a6b3a', to: '#0f4a28', icon: '🥃', label: 'Clase Azul' },

    // Coffee & Pastry
    'coffee-geisha-1':  { from: '#3d2010', to: '#2a1408', icon: '☕', label: 'Geisha Coffee' },
    'coffee-luwak-2':   { from: '#2a1a0a', to: '#1a0f04', icon: '☕', label: 'Kopi Luwak' },
    'food-macaron-3':   { from: '#f0c0d0', to: '#e0a0b8', icon: '🍬', label: 'Macaron' },

    // Seafood
    'seafood-lobster-1':{ from: '#c83a1a', to: '#a02a0a', icon: '🦞', label: 'Boston Lobster' },
    'seafood-crab-2':   { from: '#e05a2a', to: '#c03a10', icon: '🦀', label: 'Snow Crab' },
    'seafood-salmon-3': { from: '#f08060', to: '#d06040', icon: '🐟', label: 'King Salmon' },
    'seafood-scallop-4':{ from: '#f5e8d0', to: '#e0c8a8', icon: '🐚', label: 'Scallop' },
    'seafood-prawn-5':  { from: '#e87850', to: '#c85830', icon: '🦐', label: 'Tiger Prawn' },
    'seafood-uni-6':    { from: '#e8a830', to: '#c88810', icon: '🌊', label: 'Sea Urchin Uni' },

    // Sushi
    'food-sashimi-1':   { from: '#1a0f0f', to: '#2a1a1a', icon: '🍣', label: 'Sashimi Platter' },
    'food-bento-2':     { from: '#1a2a1a', to: '#0f1a0f', icon: '🍱', label: 'Omakase Bento' },
    'food-dragon-3':    { from: '#1a1a0f', to: '#2a2a1a', icon: '🍣', label: 'Dragon Roll' },
    'food-toro-4':      { from: '#c83030', to: '#a01818', icon: '🐟', label: 'Toro Nigiri' },
    'food-unidon-5':    { from: '#e8a020', to: '#c88000', icon: '🍚', label: 'Uni Don' },

    // Artisan Bread
    'bread-sourdough-1':{ from: '#c8903a', to: '#a8701a', icon: '🍞', label: 'Sourdough' },
    'bread-croissant-2':{ from: '#d4a050', to: '#b48030', icon: '🥐', label: 'Croissant' },
    'bread-campagne-3': { from: '#b87840', to: '#986020', icon: '🍞', label: 'Campagne' },
    'bread-focaccia-4': { from: '#c89050', to: '#a87030', icon: '🫓', label: 'Focaccia' },
    'bread-danish-5':   { from: '#e8b870', to: '#c89850', icon: '🥐', label: 'Danish' },
    'bread-bagel-6':    { from: '#c8784a', to: '#a8582a', icon: '🥯', label: 'Bagel' },

    // Dessert
    'food-choco-1':     { from: '#2a1508', to: '#1a0d04', icon: '🍫', label: 'Praline' },
    'food-opera-2':     { from: '#1a0a0f', to: '#2a1020', icon: '🎂', label: 'Opera Cake' },
    'food-mille-3':     { from: '#f5e8c8', to: '#e0c8a0', icon: '🍰', label: 'Millefeuille' },
  };

  const DEFAULT_STYLES = [
    { from: '#2c3e50', to: '#1a252f', icon: '🛍️', label: 'Premium' },
    { from: '#8b4513', to: '#6b2f0d', icon: '✨', label: 'Luxury' },
    { from: '#1a6b3a', to: '#0f4a28', icon: '🌿', label: 'Premium' },
    { from: '#4a1a6b', to: '#2a0a4a', icon: '💎', label: 'Exclusive' },
  ];

  function getSvgUrl(seed, w, h, variant) {
    const key = String(seed);
    const style = CATEGORY_STYLE[key] || DEFAULT_STYLES[Math.abs(hashCode(key)) % DEFAULT_STYLES.length];

    // Vary gradient direction per variant
    const angles = ['135deg', '160deg', '110deg', '45deg'];
    const angle = angles[variant] || angles[0];

    // SVG with gradient background + large icon + label
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${style.from}"/>
      <stop offset="100%" style="stop-color:${style.to}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <text x="50%" y="44%" dominant-baseline="middle" text-anchor="middle"
    font-size="${Math.round(w * 0.28)}" font-family="Segoe UI Emoji,Apple Color Emoji,sans-serif">${style.icon}</text>
  <text x="50%" y="74%" dominant-baseline="middle" text-anchor="middle"
    font-size="${Math.round(w * 0.07)}" font-family="system-ui,sans-serif" fill="rgba(255,255,255,0.7)"
    font-weight="600" letter-spacing="1">${style.label}</text>
</svg>`;

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  }

  function hashCode(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(31, h) + str.charCodeAt(i) | 0;
    }
    return h;
  }

  function getUrl(seed, w = 400, h = 400, variant = 0) {
    return getSvgUrl(seed, w, h, variant);
  }

  function getGallery(seed, w = 600, h = 600) {
    return [0, 1, 2, 3].map(i => getUrl(seed, w, h, i));
  }

  window.MockImages = { getUrl, getGallery };
})();
