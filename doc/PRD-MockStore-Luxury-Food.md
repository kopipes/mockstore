# PRD — MockStore: Luxury & Premium Food Shopping Simulator

**Versi:** 1.0
**Tipe dokumen:** Product Requirements Document (siap dieksekusi oleh AI coding agent)
**Status:** Final draft untuk implementasi

---

## 1. Ringkasan Produk

MockStore adalah aplikasi web e-commerce **simulasi/mockup** yang memungkinkan pengguna "belanja" barang luxury (tas, jam, laptop high-end) dan makanan premium bergaya franchise ternama, lengkap dengan alur checkout penuh (alamat, kurir, estimasi kirim, breakdown biaya) — **tanpa transaksi nyata dan tanpa pengiriman nyata**. Tujuannya murni hiburan: memuaskan hasrat/adrenalin belanja ("shopping high") dengan cara yang aman, gratis, dan tanpa konsekuensi finansial.

### 1.1 Tujuan Produk
- Memberikan pengalaman belanja online yang **terasa nyata** (realistic UX) dari browsing sampai invoice.
- Menjadi outlet hiburan/pelepas stres untuk pengguna yang suka window-shopping atau impulsif belanja.
- Ringan, cepat diakses, tidak butuh instalasi atau akun.

### 1.2 Non-Goals (bukan tujuan)
- **Bukan** marketplace nyata — tidak ada pembayaran, tidak ada pengiriman barang fisik.
- **Bukan** kloning identik dari Tokopedia/GoFood/Grab — hanya terinspirasi dari pola layout & UX marketplace pada umumnya.
- Tidak menyimpan data pribadi pengguna di server (semua data device-specific tersimpan lokal di browser).
- Tidak menggunakan nama brand/franchise asli secara verbatim (gunakan nama generik yang "terasa premium").

---

## 2. Target Pengguna & Use Case

| Persona | Kebutuhan |
|---|---|
| "Iseng belanja" saat bosan | Ingin browsing cepat, tanpa daftar akun, langsung bisa checkout |
| Pecinta window-shopping barang mewah | Ingin lihat detail produk lengkap seperti di marketplace asli |
| Pengguna yang sedang menahan diri belanja beneran | Ingin merasakan "sensasi checkout" tanpa keluar uang |

**Prinsip UX inti:** setiap langkah harus terasa **otentik** seperti marketplace sungguhan (form alamat lengkap, pilihan kurir, breakdown ongkir, promo code) — kejutan/hiburannya muncul di titik akhir (invoice lucu, animasi, "kamu hemat Rp...").

---

## 3. Scope

### In-scope (MVP)
- Landing/Home dengan kategori campuran (luxury goods + food premium)
- Listing produk per kategori + filter & search
- Detail produk (galeri, deskripsi, spesifikasi, review dummy)
- Keranjang belanja
- Checkout multi-step (alamat → kurir → pembayaran dummy → ringkasan)
- Invoice/konfirmasi dengan elemen hiburan
- Riwayat pesanan (tersimpan lokal per device)
- Wishlist
- Theme switcher (minimal 4 tema, bisa ganti real-time)
- Voucher/kode promo dummy

### Out-of-scope (bisa jadi fase 2)
- Login/akun sungguhan, multi-device sync
- Payment gateway asli
- Notifikasi push/email
- Leaderboard sosial antar pengguna

---

## 4. Tech Stack & Arsitektur

**Prinsip desain arsitektur: cepat, ringan, robust, tanpa backend server.**

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend | Vanilla HTML/CSS/JavaScript (SPA, hash-based routing) | Tanpa build step, load instan, mudah di-deploy di static hosting mana pun (Netlify/Vercel/GitHub Pages), tidak butuh bundler yang menambah kompleksitas |
| Database "pokok" (produk, kategori, kurir, voucher, review) | **SQLite via sql.js (WASM)**, dibundel sebagai file `.sqlite` read-only | Data terstruktur & relasional beneran (bisa di-query pakai SQL), tetap 100% client-side, tidak butuh server/API, file kecil dan cepat di-load |
| Data device-specific (cart, alamat, riwayat pesanan, wishlist, tema) | `localStorage` | Persisten per device, tidak butuh sinkronisasi, sesuai sifat "mockup pribadi" |
| Styling | CSS murni dengan **CSS Custom Properties** untuk theming | Ganti tema tinggal swap variabel, tanpa reload halaman |
| Asset gambar | Placeholder generator (mis. picsum.photos dengan seed konsisten per produk) | Tidak perlu asset asli, tetap terlihat profesional & konsisten |

**Kenapa sql.js, bukan backend + SQLite biasa?**
Karena tidak ada data yang benar-benar perlu ditulis kembali ke server (semua "transaksi" bersifat lokal), backend server jadi beban tambahan yang tidak perlu. sql.js memuat file `.sqlite` ke memori browser lewat WebAssembly dan bisa di-query dengan SQL asli — memenuhi requirement "pakai SQLite" sekaligus requirement "cepat & robust" tanpa infrastruktur server.

**Struktur folder yang direkomendasikan:**
```
mockstore/
├── index.html
├── css/
│   ├── base.css
│   ├── themes.css
│   └── components.css
├── js/
│   ├── app.js              # router & bootstrap
│   ├── db.js                # inisialisasi sql.js + query helper
│   ├── cart.js              # logic keranjang (localStorage)
│   ├── checkout.js
│   ├── theme.js
│   ├── orders.js
│   └── render/
│       ├── home.js
│       ├── listing.js
│       ├── product-detail.js
│       ├── cart-page.js
│       ├── checkout-page.js
│       └── invoice.js
├── data/
│   ├── seed.sql              # script generate isi database
│   └── mockstore.sqlite      # hasil build, di-load oleh sql.js
└── assets/
    └── icons/
```

---

## 5. Skema Database (SQLite — data pokok, read-only)

```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT CHECK(type IN ('luxury','food')) NOT NULL,
  icon TEXT
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_tag TEXT,              -- mis. "Limited Edition", "Best Seller"
  description TEXT,
  specs_json TEXT,             -- JSON string, spesifikasi fleksibel per kategori
  price INTEGER NOT NULL,      -- dalam Rupiah, tanpa desimal
  original_price INTEGER,      -- untuk tampilkan coret harga/diskon
  rating REAL DEFAULT 4.5,
  review_count INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 99,
  is_featured INTEGER DEFAULT 0,
  image_seed TEXT NOT NULL     -- dipakai untuk generate URL placeholder image konsisten
);

CREATE TABLE product_images (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  author_name TEXT,
  rating INTEGER,
  comment TEXT,
  created_at TEXT
);

CREATE TABLE couriers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,           -- mis. "Reguler", "Express", "Instant Food"
  applies_to TEXT CHECK(applies_to IN ('luxury','food','both')) NOT NULL,
  base_cost INTEGER NOT NULL,
  min_days INTEGER NOT NULL,    -- 0 untuk same-day
  max_days INTEGER NOT NULL
);

CREATE TABLE vouchers (
  id INTEGER PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_type TEXT CHECK(discount_type IN ('percentage','fixed')) NOT NULL,
  discount_value INTEGER NOT NULL,
  min_purchase INTEGER DEFAULT 0,
  max_discount INTEGER,          -- cap untuk tipe percentage
  is_active INTEGER DEFAULT 1
);
```

### 5.1 Data Seed (contoh, nama generik — bukan brand asli)

**Kategori:** Tas & Fashion, Jam Tangan, Elektronik Premium, Makanan Cepat Saji Premium, Kopi & Minuman, Dessert Signature

**Contoh produk luxury (harga masuk akal untuk kelas premium):**
| Nama | Kategori | Harga |
|---|---|---|
| Milano Leather Tote Bag | Tas & Fashion | Rp 28.500.000 |
| Alpine Chronograph Automatic Watch | Jam Tangan | Rp 65.000.000 |
| ProBook Ultra 16" M-Series | Elektronik Premium | Rp 42.000.000 |
| Nordic Aviator Sunglasses Gold Edition | Tas & Fashion | Rp 6.200.000 |

**Contoh produk food (terinspirasi kategori franchise populer, nama generik):**
| Nama | Kategori | Harga |
|---|---|---|
| Golden Wok Premium Fried Rice Set | Makanan Cepat Saji Premium | Rp 85.000 |
| Artisan Roast Signature Latte | Kopi & Minuman | Rp 48.000 |
| Crispy Heritage Fried Chicken Bucket | Makanan Cepat Saji Premium | Rp 165.000 |
| Molten Lava Choco Dessert Box | Dessert Signature | Rp 55.000 |

**Kurir & estimasi (contoh isi tabel `couriers`):**
| Nama | Berlaku untuk | Biaya dasar | Estimasi |
|---|---|---|---|
| Instant Food Delivery | food | Rp 12.000 | Same day (0-1 hari) |
| Reguler Kargo | luxury | Rp 45.000 | 3-5 hari |
| Express Barang Mewah (Insured) | luxury | Rp 150.000 | 1-2 hari |
| Reguler Kurir | both | Rp 20.000 | 2-4 hari |

**Voucher contoh:** `MOCKSTORE10` (10%, maks diskon Rp 500.000, min belanja Rp 500.000), `GRATISONGKIR` (fixed, potong 100% biaya kirim, min belanja Rp 300.000)

---

## 6. Skema `localStorage` (data device-specific)

| Key | Bentuk Data | Keterangan |
|---|---|---|
| `mockstore_cart` | `[{product_id, qty}]` | Isi keranjang aktif |
| `mockstore_wishlist` | `[product_id, ...]` | Produk yang disimpan |
| `mockstore_address_book` | `[{id, label, recipient, phone, full_address, city, postal_code, is_default}]` | Bisa multi-alamat |
| `mockstore_orders` | `[{order_id, items[], address, courier, voucher_code, subtotal, shipping_cost, discount, total, estimated_arrival, created_at}]` | Riwayat "pesanan" (fake) |
| `mockstore_theme` | `"marketplace-classic" \| "midnight-luxury" \| "pastel-playful" \| "dark-mode"` | Preferensi tema aktif |

Semua write ke localStorage harus dibungkus try-catch (mis. private browsing mode bisa menolak write) dan aplikasi harus tetap berjalan dengan graceful fallback (in-memory state) jika localStorage tidak tersedia.

---

## 7. Arsitektur Layout (terinspirasi Tokopedia, bukan kloning)

Pola yang diadopsi dari marketplace besar seperti Tokopedia — struktur navigasi, hierarki informasi produk, dan pola checkout — tapi dengan identitas visual sendiri (lihat Section 9: Theming).

### 7.1 Home
```
┌─────────────────────────────────────────────┐
│ [Logo] [Search bar besar]      [Cart][Theme] │  <- Sticky top nav
├─────────────────────────────────────────────┤
│ [Kategori pill: Semua | Luxury | Food | ...] │
├─────────────────────────────────────────────┤
│      HERO BANNER (rotating, 2-3 slide)       │
├─────────────────────────────────────────────┤
│ Flash Deal (countdown timer dummy)           │
│ [card][card][card][card]                     │
├─────────────────────────────────────────────┤
│ Luxury Pilihan       Food Favorit            │
│ [card][card]         [card][card]            │
└─────────────────────────────────────────────┘
```

### 7.2 Listing (PLP)
- Sidebar kiri: filter kategori, rentang harga (slider), rating minimum
- Grid kanan: kartu produk (gambar, nama, harga+coret harga asli, rating, badge)
- Sort dropdown: Terlaris, Harga Terendah/Tertinggi, Rating

### 7.3 Detail Produk (PDP)
- Galeri gambar (multi-thumbnail)
- Nama, rating+jumlah review, harga
- Tab: Deskripsi | Spesifikasi | Review
- Sticky action bar bawah (mobile): qty selector + tombol "Tambah Keranjang" + "Beli Sekarang"

### 7.4 Keranjang
- List item dengan checkbox pilih, qty stepper, hapus
- Ringkasan: subtotal, estimasi ongkir (kasar), tombol "Checkout"

### 7.5 Checkout (multi-step, bisa 1 halaman dengan section collapsible)
1. **Alamat pengiriman** — pilih dari address book atau isi baru (nama, HP, alamat lengkap, kota, kode pos)
2. **Metode pengiriman** — daftar kurir sesuai kategori item di keranjang, tampilkan estimasi hari & biaya masing-masing
3. **Voucher** — input kode, validasi real-time terhadap tabel `vouchers`
4. **Ringkasan biaya** — subtotal, ongkir, diskon voucher, biaya layanan (opsional flat Rp 1.000), **Total Bayar**
5. Tombol besar "Bayar Sekarang" (dummy — tidak ada payment gateway asli)

### 7.6 Invoice / Konfirmasi
- Animasi sukses (confetti ringan, non-mengganggu)
- Nomor invoice fiktif, ringkasan lengkap pesanan
- Copy jenaka: *"Selamat! Kamu baru saja menghemat [total] karena ini semua simulasi 😄"*
- Tombol "Lihat Riwayat Pesanan" dan "Belanja Lagi"

### 7.7 Riwayat Pesanan
- List semua entri dari `mockstore_orders`, expandable detail per order

---

## 8. Komponen UI Reusable

| Komponen | Fungsi |
|---|---|
| `ProductCard` | Kartu produk (dipakai di home, listing, wishlist) |
| `FilterSidebar` | Filter kategori/harga/rating |
| `CourierOption` | Baris pilihan kurir dengan radio + estimasi |
| `PriceBreakdown` | Ringkasan biaya (dipakai di cart & checkout) |
| `ThemeSwitcher` | Dropdown/tombol ganti tema, disimpan ke localStorage |
| `Toast` | Notifikasi kecil (mis. "Ditambahkan ke keranjang") |
| `EmptyState` | Untuk cart kosong, hasil search kosong, wishlist kosong — beri arahan aksi, bukan sekadar pesan kosong |
| `StockBadge` | "Stok Terbatas", "Best Seller", dsb. |

---

## 9. Sistem Theming (wajib bisa ganti real-time, tersimpan di localStorage)

Implementasi: satu file `themes.css` berisi beberapa blok `[data-theme="..."] { --var: value; }`, di-apply ke elemen `<html>`. `theme.js` menyimpan pilihan ke `mockstore_theme` dan meng-apply saat app load (sebelum first paint, untuk hindari flash-of-wrong-theme).

| Tema | Palet | Nuansa |
|---|---|---|
| **Marketplace Classic** (default) | BG putih `#FFFFFF`, primer hijau `#17B26A`, aksen CTA oranye `#FF6B35`, teks `#1A1A1A` | Familiar, terang, mirip nuansa marketplace pada umumnya |
| **Midnight Luxury** | BG hitam-keunguan `#0B0B0F`, aksen emas `#C9A961`, teks putih-gading `#F4F1EA` | Untuk mood belanja barang mewah, premium & eksklusif |
| **Pastel Playful** | BG krem hangat `#FFF7EF`, aksen koral `#FF7A59`, sudut lebih membulat | Nuansa ringan/lucu, cocok untuk food shopping santai |
| **Dark Mode Neutral** | BG abu gelap `#121212`, aksen biru `#5B8DEF`, teks `#E8E8E8` | Nyaman di mata, netral untuk pemakaian malam hari |

Setiap tema minimal mendefinisikan variabel: `--bg`, `--surface`, `--text-primary`, `--text-secondary`, `--primary`, `--primary-hover`, `--accent`, `--border`, `--success`, `--danger`, `--radius`, `--shadow`.

---

## 10. Elemen Hiburan / Signature UX (sesuai tujuan produk)

- **Confetti + micro-copy jenaka** saat checkout sukses.
- **Counter "Total Belanja Imajiner"** di navbar/profil — akumulasi semua `total` dari `mockstore_orders`, ditampilkan seperti pencapaian ("Kamu udah 'belanja' Rp 2.1 M bulan ini!").
- **Badge pencapaian** sederhana (disimpan di localStorage), contoh: "Sultan Sejam" (checkout 5x dalam 1 jam), "Food Explorer" (beli dari 5 kategori food berbeda), "Kolektor Tas" (beli 3 tas berbeda).
- **Invoice yang bisa di-screenshot dengan rapi** (styling khusus untuk halaman invoice, cocok untuk dibagikan sebagai candaan).
- Disclaimer halus namun jelas di footer & halaman checkout: *"MockStore adalah simulasi belanja untuk hiburan. Tidak ada transaksi nyata maupun pengiriman barang sungguhan."*

---

## 11. Non-Functional Requirements

- **Performa:** First Contentful Paint < 1.5 detik di koneksi 4G; ukuran total inisial (HTML+CSS+JS, sebelum sqlite file) < 150KB gzip.
- **Robustness:** semua akses ke localStorage & sql.js dibungkus error handling; aplikasi tidak boleh crash total (white screen) jika satu modul gagal — tampilkan fallback UI.
- **Responsif:** mobile-first, breakpoint minimal di 375px, 768px, 1024px.
- **Aksesibilitas:** kontras warna AA minimum di semua tema, semua interactive element bisa diakses keyboard, `prefers-reduced-motion` dihormati untuk animasi confetti/transisi.
- **Tanpa dependency berat:** hindari framework besar (React/Vue) kecuali dibutuhkan eksplisit — vanilla JS cukup untuk scope ini demi kecepatan load.

---

## 12. User Flow Utama

```
Home → Listing/Search → Detail Produk → Tambah Keranjang
   → Keranjang → Checkout (alamat→kurir→voucher→ringkasan)
   → Konfirmasi/Invoice → Riwayat Pesanan
```

Edge cases yang wajib ditangani:
- Keranjang kosong saat checkout → redirect ke keranjang dengan pesan arahan.
- Kode voucher tidak valid/expired → pesan error jelas, tidak block checkout.
- Kombinasi item luxury + food dalam satu keranjang → kurir yang ditampilkan hanya yang `applies_to` sesuai (bisa split ongkir per kategori jika kompleksitas diinginkan, atau sederhanakan dengan kurir `both`).
- Stock produk = 0 → tombol beli disabled, badge "Stok Habis".

---

## 13. Build Order (untuk AI coding agent)

1. Setup struktur folder + `index.html` kosong dengan router dasar (hash-based).
2. Buat `data/seed.sql`, generate `mockstore.sqlite`, integrasikan sql.js, buat `db.js` dengan helper query.
3. Bangun sistem theming (`themes.css` + `theme.js`) dan pasang `ThemeSwitcher` di navbar — test ganti tema real-time.
4. Halaman Home (hero, kategori, featured products dari query DB).
5. Halaman Listing + filter/search + sort.
6. Halaman Detail Produk + tombol tambah keranjang (localStorage).
7. Halaman Keranjang (CRUD item dari localStorage).
8. Halaman Checkout lengkap (alamat, kurir dinamis per kategori, voucher, ringkasan biaya).
9. Halaman Invoice/Konfirmasi + animasi + simpan ke `mockstore_orders`.
10. Halaman Riwayat Pesanan.
11. Wishlist + badge pencapaian (nice-to-have, boleh di iterasi terakhir).
12. QA pass: responsive check, empty states, error handling, performance audit.

---

## 14. Acceptance Criteria (Definition of Done)

- [ ] Semua 4 tema bisa dipilih dan langsung berubah tanpa reload, tersimpan setelah refresh browser.
- [ ] Data produk berhasil di-query dari file `.sqlite` via sql.js, bukan hardcode di JS.
- [ ] Cart, wishlist, address book, order history persisten setelah browser ditutup-buka lagi (localStorage).
- [ ] Alur checkout lengkap dari alamat sampai invoice bisa diselesaikan tanpa error di desktop & mobile.
- [ ] Kurir yang tampil di checkout sesuai kategori produk di keranjang (food dapat opsi instant, luxury dapat opsi express/insured).
- [ ] Voucher valid mengubah total dengan benar; voucher invalid menampilkan pesan error tanpa crash.
- [ ] Tidak ada elemen yang mengklaim/menyiratkan ini transaksi nyata — disclaimer tampil di checkout & footer.
- [ ] Lighthouse Performance score ≥ 90 di halaman Home (mobile simulation).

---

*Dokumen ini dirancang untuk langsung dijadikan instruksi build bagi AI coding agent — setiap section (terutama Section 5, 6, 7, 9, 13) berisi detail teknis yang cukup untuk implementasi tanpa perlu asumsi tambahan.*
