-- ============================================================
-- seed-property.sql — Kategori & produk properti MockStore
-- Run AFTER seed.sql & seed-extra.sql:
--   sqlite3 data/mockstore.sqlite < data/seed-property.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- ============ KATEGORI PROPERTI ============
INSERT INTO categories (name, slug, type, icon, description, sort_order) VALUES
  ('Rumah Mewah',    'rumah-mewah',    'property', '🏠', 'Rumah tinggal premium di lokasi strategis',        17),
  ('Villa & Resort', 'villa-resort',   'property', '🏖', 'Villa eksklusif dengan fasilitas resort bintang 5', 18),
  ('Apartemen',      'apartemen',      'property', '🏢', 'Apartemen premium di pusat kota dan CBD',           19),
  ('Tanah Kavling',  'tanah-kavling',  'property', '🗺', 'Kavling strategis di lokasi prime',                 20),
  ('Properti Komersial', 'properti-komersial', 'property', '🏦', 'Ruko, kantor, dan properti komersial premium', 21);

-- ============ RUMAH MEWAH (category_id = akan auto) ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Villa Modern Minimalis Pondok Indah 8BR', 'villa-modern-pondok-indah-8br',
  'Villa modern minimalis 8 kamar di Pondok Indah, kolam renang infinity, smart home system.',
  'Berdiri di atas lahan 2.500m² di kawasan Pondok Indah, Jakarta Selatan. 8 kamar tidur suite, 9 kamar mandi, ruang theater, gym privat, wine cellar, kolam renang infinity 25m. Smart home system Crestron terintegrasi. Carport 6 mobil. Akses security 24 jam.',
  85000000000, 95000000000, 'prop-rumah-1', 4.9, 12, 1
FROM categories c WHERE c.slug = 'rumah-mewah';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Rumah Klasik Eropa Menteng 6BR', 'rumah-klasik-eropa-menteng',
  'Rumah bergaya Eropa klasik di jantung Menteng, 6 kamar, taman luas, kolam renang.',
  'Berlokasi di Menteng, Jakarta Pusat — kawasan paling prestisius di Indonesia. Arsitektur Belanda kolonial, 6 kamar tidur, 7 kamar mandi, taman tropis 800m², kolam renang privat, ballroom 200m². Sertifikat SHM, IMB lengkap.',
  120000000000, NULL, 'prop-rumah-2', 5.0, 8, 1
FROM categories c WHERE c.slug = 'rumah-mewah';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Rumah Tropical Modern BSD City 5BR', 'rumah-tropical-modern-bsd',
  'Rumah tropical modern di BSD City, 5 kamar, void tinggi, kolam renang.',
  'Di cluster premium The Prominence, BSD City. Lahan 800m², bangunan 650m². 5 kamar tidur, living room double ceiling 8m, dapur island premium, kolam renang 12m, taman kering Jepang. Dekat sekolah internasional dan mal.',
  18500000000, 21000000000, 'prop-rumah-3', 4.8, 34, 1
FROM categories c WHERE c.slug = 'rumah-mewah';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Smart Home Cluster Elite Serpong 4BR', 'smart-home-serpong-4br',
  'Smart home 4 kamar di cluster elite Serpong, IoT terintegrasi, panel surya.',
  'Rumah masa depan di kawasan Serpong. 4 kamar tidur, sistem IoT Philips Hue & Google Nest, panel surya 10kW, EV charging port, rainwater harvesting. Lahan 450m², bangunan 380m².',
  8500000000, 9800000000, 'prop-rumah-4', 4.7, 56, 0
FROM categories c WHERE c.slug = 'rumah-mewah';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Rumah Pantai Seminyak Bali 4BR', 'rumah-pantai-seminyak-bali',
  'Rumah mewah tepi pantai Seminyak, 4 kamar, kolam renang infinity view laut.',
  'Hanya 50 meter dari pantai Seminyak. 4 kamar suite, kolam renang infinity menghadap laut, bale pavilion, dapur outdoor. Cocok untuk investasi villa rental dengan ROI 8-12% per tahun.',
  32000000000, 38000000000, 'prop-rumah-5', 4.9, 23, 1
FROM categories c WHERE c.slug = 'rumah-mewah';

-- ============ VILLA & RESORT ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Villa Cliff Uluwatu Bali 3BR Infinity Pool', 'villa-cliff-uluwatu-infinity',
  'Villa tepi tebing Uluwatu dengan kolam renang infinity menghadap Samudera Hindia.',
  'Dibangun di tebing kapur Uluwatu dengan view Samudera Hindia tak terhalang. 3 kamar suite, kolam renang infinity 20m, bale bengong, roof terrace, chef privat tersedia. Sempurna untuk honeymoon dan retreat eksekutif.',
  45000000000, NULL, 'prop-villa-1', 5.0, 18, 1
FROM categories c WHERE c.slug = 'villa-resort';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Eco Luxury Villa Ubud Tegalalang 5BR', 'eco-villa-ubud-tegalalang',
  'Villa ekologis mewah di Ubud dengan view sawah Tegalalang, 5 kamar, spa privat.',
  'Memadukan kemewahan dan keberlanjutan. 5 kamar suite berbahan material lokal premium, spa lengkap, kolam renang alami dengan filter tanaman, yoga platform view sawah. Sertifikasi Green Building Indonesia.',
  28000000000, 32000000000, 'prop-villa-2', 4.9, 27, 1
FROM categories c WHERE c.slug = 'villa-resort';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Villa Overwater Maldives Style Raja Ampat', 'villa-overwater-raja-ampat',
  'Villa di atas air bergaya Maladewa di Raja Ampat, akses langsung ke laut.',
  'Konsep overwater villa pertama di Raja Ampat. 4 kamar dengan lantai kaca melihat kehidupan bawah laut. Private deck, tangga langsung ke laut untuk snorkeling, speedboat privat. Lokasi eksklusif di Wayag.',
  55000000000, NULL, 'prop-villa-3', 5.0, 9, 1
FROM categories c WHERE c.slug = 'villa-resort';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Mountain Lodge Puncak 6BR Luxury', 'mountain-lodge-puncak-luxury',
  'Lodge mewah di ketinggian 1.500m Puncak, 6 kamar, pemandangan gunung, kolam renang heated.',
  'Di ketinggian 1.500m di atas permukaan laut dengan view Gunung Gede. 6 kamar tidur, kolam renang air hangat, fireplace di setiap kamar, jacuzzi outdoor, helipad. Akses mudah dari Jakarta 1,5 jam.',
  22000000000, 25000000000, 'prop-villa-4', 4.8, 41, 0
FROM categories c WHERE c.slug = 'villa-resort';

-- ============ APARTEMEN ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Penthouse SCBD Jakarta 4BR Sky Garden', 'penthouse-scbd-jakarta-sky-garden',
  'Penthouse eksklusif di SCBD lantai 60, 4 kamar, sky garden privat, view 360° Jakarta.',
  'Satu-satunya penthouse dengan private sky garden di SCBD. Lantai 60, luas 850m², 4 kamar suite, sky garden 200m², kolam renang privat, lift privat langsung ke unit. Fasilitas gedung: concierge 24 jam, valet, spa, rooftop bar.',
  95000000000, NULL, 'prop-apt-1', 5.0, 7, 1
FROM categories c WHERE c.slug = 'apartemen';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Apartemen Premium Sudirman 3BR Tower A', 'apartemen-sudirman-3br-tower-a',
  'Apartemen 3 kamar di koridor Sudirman, view SCBD, fasilitas bintang 5.',
  'Di jantung kawasan bisnis Sudirman. 3 kamar tidur, 2 kamar mandi, balkon 20m² view SCBD. Fasilitas: infinity pool lantai 35, gym 24 jam, sky lounge, co-working space. LRT access langsung dari basement.',
  12500000000, 14000000000, 'prop-apt-2', 4.8, 89, 1
FROM categories c WHERE c.slug = 'apartemen';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Soho Unit Kemang Boutique 2BR', 'soho-kemang-boutique-2br',
  'SOHO unit 2 kamar di Kemang, cocok tinggal dan bekerja, rooftop communal.',
  'Konsep SOHO (Small Office Home Office) premium di Kemang. 2 kamar, area kerja terpisah, dapur premium, balkon. Rooftop communal garden, co-working, café. Walking distance ke restoran dan kafe Kemang.',
  4800000000, 5500000000, 'prop-apt-3', 4.6, 134, 0
FROM categories c WHERE c.slug = 'apartemen';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Apartemen Waterfront PIK2 3BR Marina View', 'apartemen-pik2-marina-view',
  'Apartemen waterfront PIK2 dengan view marina langsung, 3 kamar, fasilitas yacht club.',
  'Satu-satunya apartemen dengan akses langsung ke marina PIK2. 3 kamar, view kapal yacht, akses yacht club, rooftop infinity pool menghadap laut, private beach club. ROI investasi diproyeksikan 9% per tahun.',
  18500000000, NULL, 'prop-apt-4', 4.9, 45, 1
FROM categories c WHERE c.slug = 'apartemen';

-- ============ TANAH KAVLING ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Kavling Premium Pondok Indah 1.200m²', 'kavling-pondok-indah-1200m2',
  'Kavling strategis 1.200m² di Pondok Indah, siap bangun, SHM, akses golf course.',
  'Kavling di kawasan paling eksklusif Jakarta Selatan. Luas 1.200m², bentuk reguler, akses jalan lebar 12m, dekat Golf Course Pondok Indah. SHM atas nama, IMB tersedia. Nilai appreciation 15-20% per tahun.',
  48000000000, NULL, 'prop-tanah-1', 5.0, 5, 1
FROM categories c WHERE c.slug = 'tanah-kavling';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Kavling Tepi Pantai Bali Canggu 800m²', 'kavling-pantai-canggu-800m2',
  'Kavling tepi pantai Canggu 800m², hak milik, ROI tinggi untuk villa rental.',
  'Langka! Kavling beachfront terakhir di Canggu. 800m², akses langsung pantai, SHM, IMB zona pariwisata. Potensi pembangunan villa 4 kamar dengan ROI rental 15-20% per tahun. Area premium dengan pertumbuhan nilai 25% per tahun.',
  32000000000, 38000000000, 'prop-tanah-2', 4.9, 11, 1
FROM categories c WHERE c.slug = 'tanah-kavling';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Kavling Komersial TB Simatupang 2.000m²', 'kavling-tb-simatupang-2000m2',
  'Kavling komersial 2.000m² di koridor TB Simatupang, cocok untuk gedung perkantoran.',
  'Di koridor bisnis TB Simatupang yang berkembang pesat. 2.000m², KDB 60%, KLB 4, cocok untuk gedung perkantoran 8 lantai. Dekat MRT Lebak Bulus, akses tol JORR. Sertifikat HGB.',
  85000000000, NULL, 'prop-tanah-3', 4.7, 8, 0
FROM categories c WHERE c.slug = 'tanah-kavling';

-- ============ PROPERTI KOMERSIAL ============
INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Ruko Premium Kelapa Gading 4 Lantai', 'ruko-kelapa-gading-4-lantai',
  'Ruko 4 lantai di kawasan bisnis Kelapa Gading, lokasi corner, parkir luas.',
  'Lokasi corner di boulevard utama Kelapa Gading. 4 lantai, luas per lantai 120m², total 480m². Sudah beroperasi sebagai restoran dengan sewa Rp 800jt/tahun. Yield 6,5%. SHM, IMB lengkap.',
  12500000000, 14000000000, 'prop-komersial-1', 4.8, 23, 1
FROM categories c WHERE c.slug = 'properti-komersial';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Office Space Grade A Kuningan 500m²', 'office-grade-a-kuningan-500m2',
  'Office space Grade A 500m² di Kuningan, fully furnished, LEED certified.',
  'Di gedung perkantoran Grade A Kuningan. 500m² lantai 28, fully furnished open plan, meeting rooms, pantry premium. LEED Gold certified. Sewa eksisting Rp 2,5M/bulan, yield 7%. Fasilitas: concierge, café, gym.',
  35000000000, NULL, 'prop-komersial-2', 4.9, 16, 1
FROM categories c WHERE c.slug = 'properti-komersial';

INSERT INTO products (category_id, name, slug, description, long_description, price, original_price, image_seed, rating, review_count, is_featured)
SELECT c.id,
  'Hotel Boutique Seminyak 20 Kamar', 'hotel-boutique-seminyak-20-kamar',
  'Hotel boutique bintang 4 di Seminyak, 20 kamar, kolam renang, sudah beroperasi.',
  'Hotel boutique bintang 4 yang sudah beroperasi 3 tahun dengan occupancy 75%. 20 kamar suite, rooftop pool, restoran, spa. Revenue Rp 5,5 miliar/tahun, NOI Rp 3,2 miliar/tahun. ROI investasi 8% per tahun.',
  40000000000, 45000000000, 'prop-komersial-3', 4.9, 34, 1
FROM categories c WHERE c.slug = 'properti-komersial';

-- ============ UPDATE PRODUCT COUNTS ============
UPDATE categories SET product_count = (
  SELECT COUNT(*) FROM products WHERE category_id = categories.id
);

-- ============ REVIEWS PROPERTI ============
INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Pak Budi W.', 5.0,
  'Lokasi sangat strategis, akses ke mana-mana mudah. Kualitas bangunan premium, worth the price!',
  '2026-07-15', 34
FROM products p WHERE p.slug = 'villa-modern-pondok-indah-8br';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Mrs. Sinta R.', 5.0,
  'Villa cliff view paling spektakuler yang pernah kami tinggali. Sunrise dari kolam infinity tidak terlupakan!',
  '2026-07-20', 67
FROM products p WHERE p.slug = 'villa-cliff-uluwatu-infinity';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Investor X.', 4.9,
  'Penthouse SCBD terbaik yang pernah ada. Sky garden privat benar-benar luar biasa, view Jakarta 360 derajat.',
  '2026-07-25', 89
FROM products p WHERE p.slug = 'penthouse-scbd-jakarta-sky-garden';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Developer Y.', 4.8,
  'Kavling paling strategis di Canggu. Nilai appreciation 25% per tahun terbukti dari harga pasar sekitar.',
  '2026-07-10', 45
FROM products p WHERE p.slug = 'kavling-pantai-canggu-800m2';

INSERT INTO reviews (product_id, reviewer_name, rating, comment, date, helpful)
SELECT p.id, 'Pak Hendra T.', 4.9,
  'Hotel boutique dengan revenue stabil. Tim manajemen profesional, laporan keuangan transparan.',
  '2026-07-28', 56
FROM products p WHERE p.slug = 'hotel-boutique-seminyak-20-kamar';

-- ============ KURIR PROPERTI ============
INSERT INTO couriers (name, eta, price, type) VALUES
('Pengurusan Dokumen Standar', '7-14 hari kerja', 5000000, 'all'),
('Notaris & PPAT Ekspres',    '3-5 hari kerja',  15000000, 'all'),
('Full Legal Package',        '14-30 hari kerja', 25000000, 'all');

-- ============ VOUCHER PROPERTI ============
INSERT INTO vouchers (code, type, value, max_discount, min_order, description) VALUES
('PROPERTY5',  'percent', 5, 50000000,  1000000000, 'Diskon 5% untuk properti, max 50 juta'),
('KPR0',       'flat', 0,  NULL,       0,           'Simulasi KPR 0% DP (simulasi saja!)'),
('KAVLING10',  'percent', 10, 10000000, 500000000,  'Diskon 10% untuk kavling premium');
