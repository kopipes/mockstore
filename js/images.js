/* ============ images.js — Product image mapping (Hybrid Local + Online Fallback) ============ */
(function () {

  const BASE = 'assets/products/';

  // Realistic online Unsplash photo IDs for products
  const FALLBACK_MAP = {
    'bangle-gold-2':     '1611591437268-301c67a4b3e2', // Gold bangle
    'bread-bagel-6':     '1585478246843-7f386ee37d7b', // Bagels
    'bread-focaccia-4':  '1573140249602-d73b22b1a03a', // Focaccia
    'food-bento-2':      '1628169979504-7669d0d47348', // Bento box
    'food-choco-1':      '1548907040-5e1e24126a01', // Chocolate box
    'food-foiegras-3':   '1600891964599-7b13d585087a', // Foie gras
    'food-unidon-5':     '1628169979504-7669d0d47348', // Uni Don bowl
    'laptop-gaming-2':   '1603302576837-37561b2fe53b', // Gaming laptop
    'perfume-noir-1':    '1547887535-c1e1507f30de', // Noir perfume
    'perfume-bois-3':    '1547887535-c1e1507f30de', // Bois perfume
    'perfume-oud-5':     '1547887535-c1e1507f30de', // Oud perfume
    'prop-apt-1':        '1502672260266-0a15844107ef', // Penthouse
    'prop-komersial-2':  '1497250681960-0a168f47e24b', // Office space
    'prop-rumah-3':      '1613490493576-4d0d0d9c35a9', // BSD house
    'prop-villa-1':      '1540555700-4786de136d41', // Cliff villa
    'prop-villa-3':      '1439066615861-20a782b136ef', // Overwater villa
    'seafood-lobster-1': '1553618551-f768da530d73', // Lobster
    'seafood-scallop-4': '1532550900-c8f08679d7bc', // Scallop
    'wallet-croco-2':    '1627123424574-f67f2702e14a', // Croco wallet
    'prop-komersial-3':  '1566073771279-6a58a6f40b2a'  // Hotel
  };

  const EMPTY_SEEDS = new Set(Object.keys(FALLBACK_MAP));

  function getUrl(seed, w = 400, h = 400) {
    if (EMPTY_SEEDS.has(seed)) {
      const id = FALLBACK_MAP[seed];
      return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;
    }
    return `${BASE}${seed}.jpg`;
  }

  function getGallery(seed, w = 600, h = 600) {
    const url = getUrl(seed, w, h);
    return [url, url, url, url];
  }

  window.MockImages = { getUrl, getGallery };
})();
