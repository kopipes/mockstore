-- ============================================================
-- seed.sql — MockStore database seed
-- Run: sqlite3 data/mockstore.sqlite < data/seed.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============ TABLES ============

CREATE TABLE IF NOT EXISTS categories (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  type          TEXT NOT NULL CHECK(type IN ('luxury','food','property')),
  icon          TEXT DEFAULT '🏷',
  description   TEXT,
  product_count INTEGER DEFAULT 0,
  sort_order    INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS products (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id      INTEGER NOT NULL REFERENCES categories(id),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  long_description TEXT,
  price            INTEGER NOT NULL,
  original_price   INTEGER,
  image_seed       TEXT,
  specs            TEXT,
  rating           REAL DEFAULT 4.5,
  review_count     INTEGER DEFAULT 0,
  is_featured      INTEGER DEFAULT 0,
  sort_order       INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id    INTEGER NOT NULL REFERENCES products(id),
  reviewer_name TEXT NOT NULL,
  rating        REAL NOT NULL,
  comment       TEXT,
  date          TEXT,
  helpful       INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS couriers (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT NOT NULL,
  eta   TEXT NOT NULL,
  price INTEGER NOT NULL,
  type  TEXT NOT NULL CHECK(type IN ('luxury','food','all'))
);

CREATE TABLE IF NOT EXISTS vouchers (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  code         TEXT NOT NULL UNIQUE,
  type         TEXT NOT NULL CHECK(type IN ('percent','flat')),
  value        INTEGER NOT NULL,
  max_discount INTEGER,
  min_order    INTEGER DEFAULT 0,
  active       INTEGER DEFAULT 1,
  description  TEXT
);

-- ============ CATEGORIES ============

INSERT INTO categories (name, slug, type, icon, description, sort_order) VALUES
  ('Tas Mewah',       'tas-mewah',       'luxury', '👜', 'Koleksi tas premium dari brand eksklusif',        1),
  ('Jam Tangan',      'jam-tangan',      'luxury', '⌚', 'Jam tangan mewah dari brand ternama dunia',       2),
  ('Elektronik',      'elektronik',      'luxury', '💻', 'Laptop, gadget, dan elektronik premium',          3),
  ('Perhiasan',       'perhiasan',       'luxury', '💎', 'Perhiasan emas, berlian, dan aksesoris premium',  4),
  ('Aksesori Mewah',  'aksesori',        'luxury', '🕶', 'Kacamata, dompet, dan aksesori premium lainnya', 5),
  ('Fine Dining',     'fine-dining',     'food',   '🍽', 'Paket makan malam mewah restoran bintang',        6),
  ('Gourmet',         'gourmet',         'food',   '🥩', 'Daging wagyu, truffle, foie gras, dan lebih',     7),
  ('Kafe Premium',    'kafe-premium',    'food',   '☕', 'Kopi specialty, teh premium, pastry artisan',     8),
  ('Sushi & Omakase', 'sushi-omakase',   'food',   '🍱', 'Sushi premium dan paket omakase eksklusif',       9),
  ('Dessert Mewah',   'dessert-mewah',   'food',   '🍰', 'Kue, cokelat, dan dessert premium artisan',      10);

-- ============ PRODUCTS: LUXURY ============

-- Tas Mewah (category_id=1)
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured) VALUES
(1, 'Aurelia Classic Tote Noir', 'aurelia-classic-tote-noir',
 'Tas tote ikonik dari kulit sapi full-grain Italia, finishing matte hitam elegan.',
 'Dibuat tangan oleh pengrajin Italia berpengalaman. Kulit sapi full-grain pilihan, jahitan wax-thread, hardware berlapis emas 18k. Hadir dengan dust bag premium dan kartu keaslian. Kapasitas besar untuk kebutuhan sehari-hari maupun perjalanan singkat.',
 18500000, 22000000, 'bag-noir-1', 4.9, 312, 1),

(1, 'Maison Élite Bucket Bag Camel', 'maison-elite-bucket-camel',
 'Bucket bag kulit domba nappa warna camel, desain minimalis modern.',
 'Material kulit domba nappa ultra-soft dari Spanyol. Tali adjustable, bagian dalam berlapis suede. Tersedia dalam berbagai ukuran.',
 14200000, 16500000, 'bag-camel-2', 4.7, 198, 1),

(1, 'Velour Structured Satchel Burgundy', 'velour-satchel-burgundy',
 'Satchel berstruktur warna burgundy dengan kunci putar emas.',
 'Satchel formal bergaya retro modern. Bahan kulit pebbled premium, kunci putar hardware emas antik, tali detachable.',
 12800000, NULL, 'bag-burgundy-3', 4.6, 87, 0),

(1, 'Lumière Mini Crossbody Rosé', 'lumiere-mini-crossbody-rose',
 'Mini crossbody mungil dengan detail flap berlapis kristal Swarovski.',
 'Tas pesta miniatur dengan sentuhan glamor. Bahan satin premium, detail kristal tangan, tali rantai emas.',
 9750000, 11000000, 'bag-rose-4', 4.8, 245, 1),

(1, 'Prestige Office Tote Cognac', 'prestige-office-tote-cognac',
 'Tas kerja profesional kulit cognac dengan kompartemen laptop 15 inci.',
 'Dirancang untuk eksekutif modern. Kompartemen terorganisir, sleeve laptop empuk, material kulit bridle tahan lama.',
 16900000, NULL, 'bag-cognac-5', 4.5, 143, 0),

-- Jam Tangan (category_id=2)
(2, 'Chronos Élite Perpetual Calendar', 'chronos-elite-perpetual-calendar',
 'Jam tangan otomatis dengan perpetual calendar, sapphire crystal, tali kulit buaya.',
 'Gerakan Swiss lever escapement, 40 jam power reserve, bezel stainless steel brushed. Waterproof 50m. Hadir dengan kotak kayu mahoni dan sertifikat keaslian.',
 85000000, 95000000, 'watch-perp-1', 4.9, 56, 1),

(2, 'Majestic Rose Gold Dress Watch', 'majestic-rose-gold-dress-watch',
 'Dress watch rose gold 18k, dial champagne, indeks berlian.',
 'Keahlian haute horlogerie sejati. Dial guilloché tangan, indeks berlian VVS, tali satin putih.',
 62000000, NULL, 'watch-rg-2', 4.8, 34, 1),

(2, 'Nautique Diver Titanium', 'nautique-diver-titanium',
 'Jam selam titanium profesional, waterproof 300m, bezel keramik unidirectional.',
 'Untuk penyelam serius. Case titanium ringan anti-karat, luminova Super-LumiNova, gerakan otomatis in-house.',
 45500000, 52000000, 'watch-dive-3', 4.7, 89, 0),

(2, 'Aviateur Chronograph Steel', 'aviateur-chronograph-steel',
 'Chronograph pilot stainless steel dengan tachymeter scale.',
 'Terinspirasi jam pilot legendaris. Chronograph kolom wheel, gerakan COSC-certified, sapphire case back.',
 38000000, 42000000, 'watch-avi-4', 4.6, 112, 0),

-- Elektronik (category_id=3)
(3, 'UltraBook Pro X1 Carbon 14"', 'ultrabook-pro-x1-carbon-14',
 'Laptop ultraportable carbon fiber, layar OLED 4K, baterai 22 jam.',
 'Performa maksimal dalam bodi ringan 990g. Prosesor terbaru 12-core, RAM 64GB LPDDR5, SSD NVMe 2TB. Layar OLED HDR400, fingerprint + IR camera.',
 42000000, 45000000, 'laptop-carbon-1', 4.9, 203, 1),

(3, 'Velox Gaming Beast 17" RTX', 'velox-gaming-beast-17',
 'Laptop gaming ultimate dengan RTX terbaru, layar 240Hz QHD, pendingin liquid vapor.',
 'Dibangun untuk gaming kompetitif. GPU RTX flagship, layar 240Hz G-Sync, RGB keyboard per-key, 32GB DDR5.',
 58000000, 65000000, 'laptop-gaming-2', 4.8, 167, 1),

(3, 'Prestige Studio Tablet Pro 13"', 'prestige-studio-tablet-pro-13',
 'Tablet kreatif OLED 13 inci dengan stylus pressure 8192 level.',
 'Untuk kreator profesional. Layar OLED anti-glare, color accuracy 99% DCI-P3, stylus wireless charging, keyboard folio premium.',
 28500000, 32000000, 'tablet-studio-3', 4.7, 98, 0),

(3, 'AuraSound Pro Wireless ANC', 'aurasound-pro-wireless-anc',
 'Headphone over-ear ANC flagship, 40 jam playtime, Hi-Res Audio.',
 'Pengalaman audio terbaik kelas. Driver 40mm beryllium, ANC adaptif -40dB, codec LDAC & aptX Lossless, build premium aluminium.',
 8500000, 9800000, 'headphone-anc-4', 4.8, 445, 1),

-- Perhiasan (category_id=4)
(4, 'Lumière Diamond Solitaire Ring', 'lumiere-diamond-solitaire-ring',
 'Cincin solitaire berlian 1 karat F/VS1, set di platinum 950.',
 'Berlian natural GIA-certified 1.02ct, warna F, clarity VS1, cut Excellent. Setting six-prong klasik platinum 950.',
 125000000, NULL, 'ring-diamond-1', 5.0, 28, 1),

(4, 'Aurore Gold Bangle 18K', 'aurore-gold-bangle-18k',
 'Gelang bangle emas 18k solid dengan tekstur hammered artisan.',
 'Dibuat dari emas 18k murni. Finishing hammered memberikan efek cahaya unik. Tersedia ukuran S/M/L.',
 18500000, 21000000, 'bangle-gold-2', 4.7, 76, 0),

(4, 'Étoile Pearl Necklace', 'etoile-pearl-necklace',
 'Kalung mutiara Akoya Jepang 8-9mm, clasps emas putih 18k.',
 'Mutiara Akoya pilihan dengan luster grade AAA. Untai 45cm, clasps safety box emas putih 18k.',
 32000000, 36500000, 'necklace-pearl-3', 4.9, 54, 1),

-- Aksesori (category_id=5)
(5, 'Maison Shield Sunglasses Titanium', 'maison-shield-sunglasses',
 'Kacamata shield titanium ultra-rinse, lensa polarized gradient.',
 'Frame titanium beta 6g, lensa polarized gradient UV400, tersedia 3 warna lensa. Case hard-shell premium.',
 7800000, 8900000, 'sunglass-1', 4.6, 234, 1),

(5, 'Prestige Bifold Wallet Croco', 'prestige-bifold-wallet-croco',
 'Dompet bifold kulit buaya Hornback, 8 slot kartu, RFID blocking.',
 'Kulit buaya Hornback pilihan, dijahit tangan. RFID blocking liner, 8 slot kartu, 2 slot bill, coin pocket.',
 12500000, NULL, 'wallet-croco-2', 4.7, 189, 0),

(5, 'Élite Belt Buckle Set Ostrich', 'elite-belt-ostrich',
 'Ikat pinggang kulit burung unta dengan buckle emas 18k detachable.',
 'Kulit burung unta Afrika Selatan. Buckle solid 18k gold-plated detachable, tersedia 3 ukuran buckle.',
 9200000, 10500000, 'belt-ostrich-3', 4.5, 67, 0),

-- ============ PRODUCTS: FOOD ============

-- Fine Dining (category_id=6)
(6, 'Le Prestige Dinner for Two', 'le-prestige-dinner-for-two',
 'Paket makan malam 7 course untuk 2 orang di restoran fine dining berbintang.',
 'Pengalaman gastronomi tak terlupakan: amuse-bouche, appetizer, soup, sorbet, main course wagyu A5, dessert, mignardises. Termasuk wine pairing premium.',
 2800000, 3200000, 'dining-prestige-1', 4.9, 312, 1),

(6, 'Omakase Chef Table Experience', 'omakase-chef-table',
 'Pengalaman omakase 12 course langsung di chef table, bahan-bahan impor.',
 'Chef table eksklusif 6 kursi. Menu berubah setiap hari sesuai bahan terbaik: uni Hokkaido, fatty tuna, wagyu tenderloin, black truffle.',
 3500000, NULL, 'dining-omakase-2', 5.0, 89, 1),

(6, 'Royal Afternoon Tea Set', 'royal-afternoon-tea-set',
 'Set afternoon tea mewah untuk 2: finger sandwich, scone, petit four, teh premium.',
 'Disajikan di atas tea stand 3-tier perak. Teh dari estate pilihan Darjeeling, Ceylon, Keemun. Tersedia tambahan champagne pairing.',
 850000, 1000000, 'dining-tea-3', 4.8, 445, 1),

-- Gourmet (category_id=7)
(7, 'Wagyu A5 Miyazaki Striploin 300g', 'wagyu-a5-miyazaki-striploin',
 'Daging wagyu Miyazaki grade A5, marbling score 10, siap dimasak.',
 'Wagyu premium langka dari Prefektur Miyazaki, Jepang. BMS 10-12, warna merah cerah, lemak putih bersih. Disertai sertifikasi asli.',
 1850000, NULL, 'food-wagyu-1', 4.9, 234, 1),

(7, 'Black Truffle Alba 50g', 'black-truffle-alba-50g',
 'Truffle hitam musim dingin dari Alba Italia, aroma intensif.',
 'Truffle hitam (Tuber melanosporum) segar dari hutan Alba musim dingin. Aroma kompleks tanah, cokelat, musk. Tersedia dalam kemasan vacuum.',
 2200000, NULL, 'food-truffle-2', 4.8, 67, 1),

(7, 'Foie Gras Terrine Premium 200g', 'foie-gras-terrine-200g',
 'Foie gras angsa terrine dari Gascony, Prancis, tekstur lembut creamy.',
 'Foie gras angsa grade A dari Périgord. Dimasak sous-vide, tekstur velvet, rasa buttery kaya. Disajikan dengan brioche dan chutney fig.',
 1650000, 1900000, 'food-foiegras-3', 4.7, 112, 0),

(7, 'Ossetra Caviar 30g', 'ossetra-caviar-30g',
 'Kaviar Ossetra dari Rusia, butiran besar, rasa nutty kompleks.',
 'Acipenser gueldenstaedtii dari Laut Kaspia. Warna cokelat keemasan, butiran besar 2.8mm, rasa buttery dengan aftertaste hazelnut.',
 3800000, NULL, 'food-caviar-4', 5.0, 45, 1),

-- Kafe Premium (category_id=8)
(8, 'Geisha Panama Specialty 100g', 'geisha-panama-specialty-100g',
 'Kopi Geisha dari Hacienda La Esmeralda, Panama, skor cupping 94.',
 'Single origin Geisha variety, proses natural. Tasting notes: jasmine, peach, bergamot, dark honey. Roast light untuk preservasi floral.',
 980000, 1100000, 'coffee-geisha-1', 4.9, 567, 1),

(8, 'Kopi Luwak Arabica Wild 50g', 'kopi-luwak-wild-50g',
 'Kopi luwak arabica wild-sourced dari Sumatra, proses fermentasi alami.',
 'Diproduksi secara etis dari luwak liar, bukan penangkaran. Proses wet-hulled Sumatra, tasting notes: earthy, dark chocolate, mild tobacco.',
 1250000, NULL, 'coffee-luwak-2', 4.7, 189, 0),

(8, 'Artisan Macaron Collection 12pcs', 'macaron-collection-12pcs',
 '12 macaron artisan berbagai rasa: vanilla bourbon, raspberry, pistachio, dll.',
 'Dibuat fresh harian oleh patissier berpengalaman. Shell almond meringue crispy, ganache filling premium. Kemasan gift box cantik.',
 485000, 550000, 'food-macaron-3', 4.8, 892, 1),

-- Sushi & Omakase (category_id=9)
(9, 'Premium Sashimi Platter (20pcs)', 'premium-sashimi-platter-20',
 'Platter sashimi 20 pcs: toro, salmon king, uni, hotate, red snapper.',
 'Ikan segar impor langsung dari pasar tsukiji. Toro otoro dan chutoro, king salmon Norwegia, uni Hokkaido, scallop Hokkaido, red snapper Mediterania.',
 1450000, 1650000, 'food-sashimi-1', 4.9, 334, 1),

(9, 'Omakase Bento Box Premium', 'omakase-bento-box-premium',
 'Bento mewah 8 kompartemen: nigiri, rolls, tempura, miso, edamame.',
 'Kotak bento premium dengan 8 nigiri pilihan chef, 2 premium roll, tempura udang tiger, miso soup dashi premium, chawanmushi, dessert mochi.',
 875000, NULL, 'food-bento-2', 4.8, 223, 1),

(9, 'Dragon Roll Truffle & Wagyu', 'dragon-roll-truffle-wagyu',
 'Signature roll: wagyu A4 seared, black truffle, foie gras, caviar topping.',
 'Roll premium paling mewah. Shari beras premium vinegar, wagyu A4 seared, irisan truffle hitam, foie gras tipis, topping caviar ossetra.',
 985000, NULL, 'food-dragon-3', 4.9, 156, 1),

-- Dessert (category_id=10)
(10, 'Valrhona Dark Chocolate Tasting Box', 'valrhona-chocolate-tasting',
 'Kotak 24 praline cokelat gelap Valrhona berbagai single-origin.',
 'Koleksi 24 praline premium menggunakan couverture Valrhona: Guanaja 70%, Caraïbe 66%, Alpaco 66%, Abinao 85%. Kemasan box kayu cantik.',
 650000, 750000, 'food-choco-1', 4.8, 678, 1),

(10, 'Opera Cake Classique 6-inch', 'opera-cake-classique-6inch',
 'Kue opera 6 lapis: joconde almond sponge, buttercream kopi, ganache cokelat.',
 'Resep authentic opera cake Prancis. 6 lapis joconde sponge, coffee buttercream Illy, ganache Valrhona, mirror glaze dark chocolate. Porsi 6-8 orang.',
 520000, NULL, 'food-opera-2', 4.9, 445, 1),

(10, 'Millefeuille Crème Brûlée 4pcs', 'millefeuille-creme-brulee-4pcs',
 '4 pcs millefeuille dengan crème brûlée filling vanilla Madagascar.',
 'Pastry dough puff homemade 729 layers, crème brûlée vanilla Madagascar bean, caramel brûlée top. Disajikan fresh on order.',
 380000, 420000, 'food-mille-3', 4.7, 312, 0);

-- ============ UPDATE PRODUCT COUNTS ============
UPDATE categories SET product_count = (
  SELECT COUNT(*) FROM products WHERE category_id = categories.id
);

-- ============ REVIEWS ============
INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful) VALUES
-- Aurelia Classic Tote
(1, 'Sari W.',    5.0, 'Kualitasnya luar biasa! Kulit sangat soft dan aroma leather-nya khas mewah. Worth every penny (simulasi)!', '2026-05-12', 45),
(1, 'Dewi R.',    4.5, 'Ukurannya pas, muat laptop 13 inch. Warna hitamnya elegant banget, cocok untuk kerja dan acara formal.', '2026-04-28', 32),
(1, 'Putri A.',   5.0, 'Hardware-nya berat berkualitas, jahitannya rapi sekali. Dust bag-nya juga premium.', '2026-03-15', 28),

-- Chronos Perpetual
(6, 'Budi S.',    5.0, 'Jam tangan impian! Mekanisme perpetual calendar-nya menakjubkan. Bisa diwariskan ke anak cucu.', '2026-05-20', 67),
(6, 'Ahmad F.',   4.8, 'Sapphire crystal anti-gores terbukti. Sudah 3 bulan dipakai setiap hari, tidak ada grafis.', '2026-04-10', 43),

-- UltraBook Pro
(10, 'Rizky M.',  5.0, 'Layar OLED-nya keren banget buat desain grafis. Baterai 22 jam memang terbukti, tidak perlu bawa charger seharian.', '2026-06-01', 89),
(10, 'Kevin L.',  4.5, 'Build quality carbon fiber-nya premium banget. Tapi port-nya kurang banyak, butuh hub.', '2026-05-15', 56),

-- Wagyu A5
(21, 'Chef Andi', 5.0, 'Marbling-nya merata sempurna. Cukup dipanggang medium rare dengan sedikit salt, rasanya surga.', '2026-05-28', 78),
(21, 'Foodie J.', 5.0, 'Sertifikasi Miyazaki asli ada. Teksturnya melt in the mouth, tidak ada daging lain yang menandingi.', '2026-04-20', 65),

-- Geisha Panama
(25, 'Barista T.', 5.0, 'Single origin terbaik yang pernah saya coba. Floral notes-nya intens, cocok untuk pour-over.', '2026-06-05', 92),
(25, 'Coffee N.',  4.8, 'Roast level light memang ideal untuk Geisha. Aroma jasminenya terasa dari pertama buka kemasan.', '2026-05-08', 71),

-- Le Prestige Dinner
(18, 'Couple X.',  5.0, 'Dinner anniversary paling memorable! Setiap course adalah karya seni. Wine pairing-nya sempurna.', '2026-05-14', 87),
(18, 'Foodie M.',  4.9, 'Wagyu A5 di main course benar-benar melted. Service-nya attentive tanpa mengganggu.', '2026-04-22', 65),

-- Ossetra Caviar
(23, 'Gourmet A.', 5.0, 'Butiran besar, warna cokelat keemasan indah. Rasa buttery dengan hazelnut finish yang lama. Sangat autentik.', '2026-05-30', 43),

-- Lumière Diamond Ring
(13, 'Happy C.',   5.0, 'Berliannya berkilau luar biasa bahkan di cahaya redup. Sertifikasi GIA memberikan keyakinan. Ini hadiah sempurna!', '2026-04-14', 112);

-- ============ COURIERS ============
INSERT INTO couriers (name, eta, price, type) VALUES
-- For luxury items
('Élite Express Insured',  '1-2 hari kerja',  75000,  'luxury'),
('Premium Secure Door',    '2-3 hari kerja',  45000,  'luxury'),
('Standard Insured',       '3-5 hari kerja',  25000,  'luxury'),
-- For food items
('Instant Delivery 1 Jam', '30-60 menit',     35000,  'food'),
('Same Day Food Express',  '2-4 jam',         20000,  'food'),
('Scheduled Delivery',     '1 hari (jadwal)', 15000,  'food');

-- ============ VOUCHERS ============
INSERT INTO vouchers (code, type, value, max_discount, min_order, description) VALUES
('MOCKFREE',   'percent', 100, 500000,   0,         'Diskon 100% max 500rb — nikmati simulasi gratis!'),
('HEMAT50K',   'flat',    50000, NULL,   200000,    'Potongan langsung Rp50.000'),
('LUXURY20',   'percent', 20,  2000000,  5000000,   'Diskon 20% untuk produk luxury, max 2 juta'),
('FOODLOVER',  'percent', 15,  200000,   300000,    'Diskon 15% untuk pembelian food premium'),
('NEWUSER',    'flat',    100000, NULL,  500000,    'Selamat datang! Diskon 100rb untuk order pertama'),
('WEEKEND',    'percent', 30,  500000,   1000000,   'Promo weekend 30% off, max 500rb'),
('FLASHSALE',  'percent', 50,  1000000,  2000000,   'Flash sale 50% off, max 1 juta'),
('MEWAH',      'flat',    250000, NULL,  3000000,   'Potongan 250rb untuk belanja luxury di atas 3 juta');
