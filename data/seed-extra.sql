-- ============================================================
-- seed-extra.sql — Tambahan data MockStore (~50 produk baru)
-- Run AFTER seed.sql:
--   sqlite3 data/mockstore.sqlite < data/seed-extra.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============ KATEGORI BARU ============
INSERT INTO categories (name, slug, type, icon, description, sort_order) VALUES
  ('Sepatu Mewah',    'sepatu-mewah',    'luxury', '👠', 'Sepatu premium dari brand luxury dunia',         11),
  ('Parfum Premium',  'parfum-premium',  'luxury', '🧴', 'Parfum eksklusif dari rumah parfum ternama',     12),
  ('Pakaian Luxury',  'pakaian-luxury',  'luxury', '👔', 'Busana premium dari desainer internasional',     13),
  ('Wine & Spirits',  'wine-spirits',    'food',   '🍷', 'Wine vintage, champagne, dan spirits premium',   14),
  ('Seafood Premium', 'seafood-premium', 'food',   '🦞', 'Lobster, kepiting, dan seafood premium segar',   15),
  ('Artisan Bread',   'artisan-bread',   'food',   '🥐', 'Croissant, sourdough, dan roti artisan premium', 16);

-- ============ SEPATU MEWAH (category_id=11) ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured) VALUES
(11, 'Maison Louvre Stiletto Python 100mm', 'maison-louvre-stiletto-python',
 'Stiletto 100mm dari kulit python asli, finishing glossy, sol karet Italia.',
 'Dibuat dari kulit python bersertifikat CITES. Hak 100mm tapered, platform tersembunyi 10mm. Sol anti-slip Goodyear welt. Tersedia black, nude, emerald.',
 28500000, 32000000, 'shoe-stiletto-1', 4.9, 187, 1),

(11, 'Prestige Derby Brogue Oxford', 'prestige-derby-brogue-oxford',
 'Oxford brogue pria full-grain calf leather, Goodyear welted, made in England.',
 'Kulit sapi full-grain tanned alami 18 bulan. Brogue detailing tangan, sol leather double, last klasik English.',
 18500000, NULL, 'shoe-oxford-2', 4.8, 134, 1),

(11, 'Velour Sneaker Luxury Suede Low', 'velour-sneaker-luxury-suede',
 'Sneaker kasual suede premium Italia, sole crepe, insole kulit lamb.',
 'Dibuat di workshop Florence. Suede calfskin premium, outsole crepe natural, insole lambskin empuk. Limited 500 pasang per season.',
 12800000, 14500000, 'shoe-sneaker-3', 4.7, 298, 1),

(11, 'Élite Loafer Crocodile Penny', 'elite-loafer-crocodile-penny',
 'Penny loafer kulit buaya Hornback, hardware emas 18k, lining suede.',
 'Kulit buaya Hornback pilihan, dijahit tangan. Hardware penny strap berlapis emas 18k. Insole suede ultra-soft.',
 35000000, NULL, 'shoe-loafer-4', 5.0, 56, 1),

(11, 'Lumière Ankle Boot Nappa 50mm', 'lumiere-ankle-boot-nappa',
 'Ankle boot wanita kulit nappa Italia, hak 50mm block, zipper YKK tersembunyi.',
 'Kulit nappa lembut dari Italia. Hak block 50mm stabil, zipper YKK premium di sisi dalam, lapisan suede.',
 22000000, 25000000, 'shoe-boot-5', 4.6, 112, 0),

(11, 'Aurore Sandal Gold Leather Flat', 'aurore-sandal-gold-leather-flat',
 'Sandal flat kulit emas dengan strap adjustable, sol cork wrapped leather.',
 'Kulit sapi metallic gold, strap triple adjustable, sol cork dibungkus leather. Ringan dan breathable.',
 8900000, 10500000, 'shoe-sandal-6', 4.5, 223, 0),

-- ============ PARFUM PREMIUM (category_id=12) ============
(12, 'Noir Absolu Extrait de Parfum 100ml', 'noir-absolu-extrait-parfum',
 'Ekstrait parfum eksklusif: oud Arabia, rose de Mai, ambergris, bergamot Calabria.',
 'Konsentrasi parfum 35%. Top bergamot & lemon; heart rose, iris, jasmine; base oud, ambergris, sandalwood. Botol kristal Baccarat.',
 4500000, NULL, 'perfume-noir-1', 4.9, 234, 1),

(12, 'Lumière Blanche Eau de Parfum 75ml', 'lumiere-blanche-edp-75ml',
 'Parfum feminin: aldehydes, jasmine absolute, musk blanc, vanilla Tahiti.',
 'Terinspirasi parfum klasik Prancis era 1920an. Aldehydic opening, floral heart jasmine & ylang, dry down creamy musk.',
 2800000, 3200000, 'perfume-blanc-2', 4.7, 312, 1),

(12, 'Bois Sacré Eau de Toilette 100ml', 'bois-sacre-edt-100ml',
 'Parfum unisex kayu sakral: cedarwood, vetiver Haiti, leather, iris pallida.',
 'Karakter woody-aromatic. Cedar Atlas, vetiver Haiti smoke, leather Cuir de Russie, powdery iris. Konsentrasi 15%.',
 2200000, NULL, 'perfume-bois-3', 4.6, 189, 0),

(12, 'Rose Impériale Parfum 50ml', 'rose-imperiale-parfum-50ml',
 'Parfum rose mewah: rose absolute Bulgaria 30%, peony, litchi, white musk.',
 'Rose absolute Bulgaria dikombinasikan dengan peony, litchi segar, dan white musk halus. Parfum rumah eksklusif Paris.',
 3600000, 4000000, 'perfume-rose-4', 4.8, 156, 1),

(12, 'Oud Royal Arabian Concentrated 15ml', 'oud-royal-arabian-15ml',
 'Concentrated parfum oil Arabian oud terbaik: oud Laos, saffron, rose, musk.',
 'Oil parfum tanpa alkohol, konsentrasi tinggi. Oud Laos premium, saffron Iran, rose oil, amber.',
 3200000, NULL, 'perfume-oud-5', 5.0, 98, 1),

(12, 'Aqua Meridiana Cologne 200ml', 'aqua-meridiana-cologne-200ml',
 'Cologne segar mediterania: petitgrain, neroli, sea spray, driftwood, musk.',
 'Ringan untuk daily wear. Petitgrain Bigarade, neroli, sea mineral accord, driftwood base. Botol kaca besar.',
 1800000, 2100000, 'perfume-aqua-6', 4.4, 445, 0),

-- ============ PAKAIAN LUXURY (category_id=13) ============
(13, 'Maison Cashmere Turtleneck Grade A', 'maison-cashmere-turtleneck',
 'Turtleneck cashmere grade A Mongolia, 2-ply, warna musim gugur.',
 'Cashmere grade A dari Inner Mongolia. Benang 2-ply ultra-soft, jahitan rib turtleneck, warna natural undyed.',
 8500000, 9800000, 'cloth-cashmere-1', 4.9, 234, 1),

(13, 'Prestige Suit Wool Super 150s Navy', 'prestige-suit-wool-150s',
 'Setelan jas wol Super 150s dari Vitale Barberis Canonico, lapel notch.',
 'Kain wol Super 150s VBC Italia. Konstruksi half-canvas, lapel notch, 2-button. Tersedia slim dan regular fit.',
 32000000, 36000000, 'cloth-suit-2', 4.8, 87, 1),

(13, 'Élite Silk Blouse Habotai 100%', 'elite-silk-blouse-habotai',
 'Blus sutra Habotai 100% Tiongkok, French seam, kancing mutiara.',
 'Sutra Habotai grade 6A dari Suzhou. Jahitan French seam, kancing mutiara freshwater, detail pintuck.',
 6800000, 7500000, 'cloth-silk-3', 4.7, 312, 1),

(13, 'Aurore Trench Coat Gabardine Wool', 'aurore-trench-coat-gabardine',
 'Trench coat klasik gabardine wol, double-breasted, furing sutra.',
 'Gabardine wol tahan air dari Inggris. Double-breasted, epaulet, storm flap, furing sutra. Warna camel, navy, khaki.',
 45000000, 52000000, 'cloth-trench-4', 4.9, 145, 1),

(13, 'Velour Denim Premium Selvedge Japan', 'velour-denim-selvedge-japan',
 'Jeans selvedge denim 14oz dari pabrik Kojima Jepang, straight cut.',
 'Denim selvedge 14oz dari Kojima. Unwashed/raw denim, develop fade alami. Chain stitch, rivets copper.',
 4800000, NULL, 'cloth-denim-5', 4.6, 198, 0),

(13, 'Maison Linen Resort Shirt Luxury', 'maison-linen-resort-shirt',
 'Kemeja linen Irish premium, garment-washed, kancing tanduk alami.',
 'Linen 100% dari Irlandia, thread count tinggi. Garment-washed, lembut. Kancing tanduk alami, collar spread.',
 3200000, 3800000, 'cloth-linen-6', 4.5, 267, 0),

-- ============ WINE & SPIRITS (category_id=14) ============
(14, 'Château Margaux Premier Grand Cru 2018', 'chateau-margaux-2018',
 'Wine merah Bordeaux Premier Grand Cru Classé vintage 2018.',
 'Dari château Margaux, vintage 2018 luar biasa. Tasting notes: blackcurrant, cedar, violet, tobacco. Potensi aging 30+ tahun.',
 8500000, NULL, 'wine-margaux-1', 5.0, 45, 1),

(14, 'Dom Pérignon Vintage Champagne 2013', 'dom-perignon-vintage-2013',
 'Champagne prestige vintage 2013, blend Chardonnay & Pinot Noir.',
 'Dom Pérignon vintage terbaik dekade ini. Toasty, mineral, creamy. Disimpan 8+ tahun en cave.',
 5800000, NULL, 'wine-dom-2', 4.9, 67, 1),

(14, 'Yamazaki 18 Year Single Malt Whisky', 'yamazaki-18-year-whisky',
 'Single malt Jepang 18 tahun dari Yamazaki Distillery.',
 'Berumur 18 tahun di barrel Mizunara oak, American oak, Sherry cask. Tasting notes: dark chocolate, toffee, dried mango.',
 7200000, NULL, 'whisky-yamazaki-3', 4.9, 89, 1),

(14, 'Hennessy Paradis Rare Cognac 700ml', 'hennessy-paradis-cognac',
 'Cognac Hennessy Paradis blend 100 eaux-de-vie terpilih, ultra-smooth.',
 'Blend 100+ eaux-de-vie aged 25-130 tahun. Tasting notes: jasmine, honey, candied orange, vanilla toffee.',
 6500000, NULL, 'cognac-hennessy-4', 4.8, 56, 1),

(14, 'Barolo DOCG Riserva Piedmont 2016', 'barolo-docg-riserva-2016',
 'Raja wine Italia Barolo DOCG Riserva vintage 2016, Nebbiolo 100%.',
 'Dari Langhe, Piedmont. Aged 5 tahun. Tasting notes: rose, tar, cherry, leather, anise.',
 2800000, 3200000, 'wine-barolo-5', 4.7, 123, 0),

(14, 'Clase Azul Reposado Tequila 750ml', 'clase-azul-reposado-tequila',
 'Tequila reposado premium Meksiko, botol handcrafted keramik artisan.',
 '100% Blue Weber Agave dari Jalisco. Aged 8 bulan. Vanilla, cinnamon, honey. Botol keramik handpainted unik.',
 3500000, NULL, 'tequila-clase-6', 4.8, 178, 1),

-- ============ SEAFOOD PREMIUM (category_id=15) ============
(15, 'Boston Lobster Live 800-900g', 'boston-lobster-live-800g',
 'Lobster hidup Boston langsung dari Kanada, berat 800-900g per ekor.',
 'Dikirim dengan container berpendingin khusus. Dijamin hidup saat tiba. Rekomendasi: steam atau grill.',
 850000, NULL, 'seafood-lobster-1', 4.9, 445, 1),

(15, 'Snow Crab Clusters Premium 1kg', 'snow-crab-clusters-1kg',
 'Snow crab clusters dari Laut Bering, pre-cooked, IQF frozen.',
 'Crab clusters dari Alaska, dimasak dan dibekukan segera (IQF). Daging manis, tekstur lembut.',
 650000, 750000, 'seafood-crab-2', 4.8, 312, 1),

(15, 'Atlantic King Salmon Fillet 500g', 'atlantic-king-salmon-fillet',
 'Salmon King fillet 500g dari Norwegia, skin-on, center cut, sashimi-grade.',
 'Salmon King terbesar dan berlemak. Omega-3 tinggi, rasa butteriness luar biasa. Center cut tanpa tulang.',
 485000, 550000, 'seafood-salmon-3', 4.7, 567, 1),

(15, 'Hokkaido Scallop Sashimi Grade 500g', 'hokkaido-scallop-sashimi-500g',
 'Scallop kerang Hokkaido ukuran jumbo, sashimi-grade, IQF frozen.',
 'Hotate scallop dari laut dingin Hokkaido. Ukuran jumbo 3L, rasa manis alami. Bisa dikonsumsi mentah.',
 580000, NULL, 'seafood-scallop-4', 4.9, 234, 1),

(15, 'Black Tiger Prawn Jumbo 500g', 'black-tiger-prawn-jumbo',
 'Udang black tiger jumbo 10 ekor/500g, head-on, segar dari tambak premium.',
 'Udang black tiger dari tambak premium Thailand. Ukuran U6. Head-on untuk rasa lebih kaya.',
 380000, 450000, 'seafood-prawn-5', 4.6, 389, 0),

(15, 'Sea Urchin Uni Premium Box 100g', 'sea-urchin-uni-premium',
 'Uni bulu babi Hokkaido premium, Murasaki variety, tray 100g.',
 'Uni Murasaki dari Hokkaido, dipanen dan dikemas fresh. Rasa sweet oceanic, creamy. Best untuk nigiri atau pasta.',
 1200000, NULL, 'seafood-uni-6', 5.0, 156, 1),

-- ============ ARTISAN BREAD (category_id=16) ============
(16, 'Sourdough Country Loaf 900g', 'sourdough-country-loaf',
 'Sourdough loaf fermentasi 24 jam, tepung heirloom, kerak crunchy.',
 'Tepung heirloom organik, starter 5 tahun. Fermentasi 24 jam cold retard. Kerak crunchy, crumb open, rasa sour kompleks.',
 185000, NULL, 'bread-sourdough-1', 4.9, 678, 1),

(16, 'Croissant Beurre AOP Artisan 6pcs', 'croissant-beurre-aop-6pcs',
 '6 croissant butter AOP Normandy, 81 lapisan, fresh harian.',
 'Butter AOP Normandy premium. 81 lapisan laminasi, fermentasi 3 hari. Crispy diluar, honeycomb struktur dalam.',
 195000, 220000, 'bread-croissant-2', 4.9, 892, 1),

(16, 'Pain de Campagne Rustique 800g', 'pain-de-campagne-rustique',
 'Roti pedesaan Prancis, campuran wheat-rye 80/20, crust artisan tebal.',
 'Resep traditional French bakery. Levain natural, crust tebal rustik. Tahan 5 hari.',
 165000, NULL, 'bread-campagne-3', 4.7, 445, 0),

(16, 'Focaccia Genovese Rosemary 500g', 'focaccia-genovese-rosemary',
 'Focaccia Genova asli, olive oil DOP, rosemary segar, sea salt flakes.',
 'Resep authentic Genova. Olive oil Ligurian DOP, rosemary segar, Maldon sea salt. Tekstur fluffy, crispy bottom.',
 145000, 165000, 'bread-focaccia-4', 4.8, 534, 1),

(16, 'Danish Pastry Variety Box 8pcs', 'danish-pastry-variety-box',
 '8 danish pastry: almond, custard, raspberry, cinnamon — butter AOP.',
 '2 almond, 2 custard vanilla, 2 raspberry, 2 cinnamon sugar. Semua butter AOP dan adonan laminasi 3 hari.',
 225000, 260000, 'bread-danish-5', 4.8, 367, 1),

(16, 'Bagel New York Style 4pcs', 'bagel-newyork-style-4pcs',
 '4 bagel NY-style: boiled in malt water, baked in deck oven, chewy.',
 'Resep authentic New York. Direbus air malt barley sebelum dipanggang di deck oven. Chewy, slightly crisp.',
 125000, NULL, 'bread-bagel-6', 4.6, 289, 0);

-- ============ TAMBAHAN PRODUK KE KATEGORI EXISTING ============

-- Tas Mewah tambahan (category_id=1)
INSERT INTO products (category_id, name, slug, description, price, original_price, image_seed, rating, review_count, is_featured) VALUES
(1, 'Céleste Weekend Duffle Leather', 'celeste-weekend-duffle',
 'Duffle bag weekend travel kulit full-grain coklat tua, kapasitas 40L.',
 2850000, 3200000, 'bag-duffle-6', 4.7, 134, 0),

(1, 'Prestige Chain Wallet Bag Mini', 'prestige-chain-wallet-bag',
 'Mini bag chain strap emas, bisa jadi wallet, kulit caviar hitam.',
 7500000, NULL, 'bag-chain-7', 4.8, 267, 1),

(1, 'Aurelia Backpack Nylon Premium', 'aurelia-backpack-nylon',
 'Backpack nylon premium waterproof, aksen kulit, padded laptop 15 inci.',
 5800000, 6500000, 'bag-backpack-8', 4.5, 189, 0),

-- Jam Tangan tambahan (category_id=2)
(2, 'Tourbillon Moonphase Grande Complication', 'tourbillon-moonphase-grande',
 'Grande complication: tourbillon, moonphase, perpetual calendar. Platinum case.',
 185000000, NULL, 'watch-tourbillon-5', 5.0, 12, 1),

(2, 'Field Watch Canvas Strap Military', 'field-watch-canvas-military',
 'Jam tangan field watch militer, case titanium, sapphire, tali canvas.',
 12500000, 14000000, 'watch-field-6', 4.6, 178, 0),

-- Elektronik tambahan (category_id=3)
(3, 'Velox TWS Earbuds ANC Pro', 'velox-tws-earbuds-anc',
 'True wireless earbuds ANC flagship, 36 jam total, LDAC, driver planar.',
 4500000, 5200000, 'earbuds-anc-5', 4.8, 634, 1),

(3, 'Prestige 8K Monitor 32 inci OLED', 'prestige-8k-monitor-32-oled',
 'Monitor OLED 32 inci 8K, 120Hz, HDR1000, USB-C 140W charging.',
 28000000, 32000000, 'monitor-oled-6', 4.9, 89, 1),

-- Fine Dining tambahan (category_id=6)
(6, 'Chef Table Wagyu Omakase 8 Course', 'chef-table-wagyu-omakase',
 'Dinner omakase 8 course wagyu A5 eksklusif, chef Michelin-trained.',
 4500000, NULL, 'dining-wagyu-4', 5.0, 67, 1),

(6, 'Degustation Wine Pairing 6 Course', 'degustation-wine-pairing',
 '6 course degustation dengan wine pairing natural wine Prancis.',
 3200000, 3800000, 'dining-wine-5', 4.8, 89, 0),

-- Gourmet tambahan (category_id=7)
(7, 'Iberico Ham Pata Negra 100g Sliced', 'iberico-ham-pata-negra',
 'Jamon Iberico de Bellota Pata Negra sliced 100g, aged 48 bulan.',
 850000, NULL, 'food-iberico-5', 4.9, 234, 1),

(7, 'White Truffle Alba Fresh 30g', 'white-truffle-alba-fresh-30g',
 'White truffle segar dari Alba Italia, musim gugur, aroma intensif.',
 4500000, NULL, 'food-white-truffle-6', 5.0, 23, 1),

-- Sushi tambahan (category_id=9)
(9, 'Toro Fatty Tuna Nigiri Set 10pcs', 'toro-fatty-tuna-nigiri-10pcs',
 '10 nigiri toro: mix otoro dan chutoro dari bluefin tuna Mediterania.',
 1250000, 1450000, 'food-toro-4', 4.9, 312, 1),

(9, 'Uni Don Hokkaido Premium Bowl', 'uni-don-hokkaido-premium',
 'Rice bowl premium: shari hangat, uni Hokkaido 50g, ikura, nori.',
 680000, NULL, 'food-unidon-5', 4.8, 189, 1);

-- ============ UPDATE PRODUCT COUNTS ============
UPDATE categories SET product_count = (
  SELECT COUNT(*) FROM products WHERE category_id = categories.id
);

-- ============ REVIEWS TAMBAHAN ============
INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Rina S.', 4.9, 'Kualitas luar biasa, packaging mewah. Exactly as described!', '2026-07-15', 45
FROM products p WHERE p.slug = 'maison-louvre-stiletto-python';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Tommy H.', 5.0, 'Parfum terbaik yang pernah saya beli. Longevity 12+ jam, sillage luar biasa.', '2026-07-20', 67
FROM products p WHERE p.slug = 'noir-absolu-extrait-parfum';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Wine Lover', 5.0, 'Vintage 2018 luar biasa. Tannin smooth, aroma kompleks. Worth the price!', '2026-07-22', 89
FROM products p WHERE p.slug = 'chateau-margaux-2018';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Foodie K.', 4.9, 'Lobster hidup dan masih fresh! Dagingnya manis dan segar.', '2026-07-18', 56
FROM products p WHERE p.slug = 'boston-lobster-live-800g';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Baker A.', 5.0, 'Sourdough terbaik yang pernah saya makan. Crumb open sempurna, asam pas.', '2026-07-25', 78
FROM products p WHERE p.slug = 'sourdough-country-loaf';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Whisky W.', 4.9, 'Yamazaki 18 adalah pengalaman spiritual. Smooth, complex, unforgettable.', '2026-07-10', 92
FROM products p WHERE p.slug = 'yamazaki-18-year-whisky';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Style G.', 4.8, 'Cashmere grade A benar-benar beda. Super soft, hangat, dan ringan.', '2026-07-28', 43
FROM products p WHERE p.slug = 'maison-cashmere-turtleneck';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Pastry L.', 5.0, 'Croissant terbaik! Lapisan butter terasa jelas, crispy sempurna diluar.', '2026-07-30', 112
FROM products p WHERE p.slug = 'croissant-beurre-aop-6pcs';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Seafood F.', 5.0, 'Uni Hokkaido premium! Segar, manis, creamy. Terbaik untuk nigiri.', '2026-07-12', 87
FROM products p WHERE p.slug = 'sea-urchin-uni-premium';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Shoe M.', 4.9, 'Loafer paling mewah yang pernah saya punya. Hardware emas sangat elegan.', '2026-07-05', 65
FROM products p WHERE p.slug = 'elite-loafer-crocodile-penny';

-- ============ VOUCHER TAMBAHAN ============
INSERT INTO vouchers (code, type, value, max_discount, min_order, description) VALUES
('SEAFOOD30', 'percent', 30, 300000,  500000,  'Diskon 30% seafood premium, max 300rb'),
('WINE20',    'percent', 20, 500000,  1000000, 'Diskon 20% wine & spirits, max 500rb'),
('BREAD50K',  'flat',    50000, NULL, 150000,  'Diskon 50rb untuk artisan bread'),
('FASHION15', 'percent', 15, 1000000, 3000000, 'Diskon 15% pakaian & aksesori luxury'),
('PARFUM25',  'percent', 25, 500000,  800000,  'Diskon 25% parfum premium'),
('SEPATU10',  'percent', 10, 2000000, 5000000, 'Diskon 10% sepatu mewah');
