# Projeka Shoes

Company profile berbasis **React + Vite + TypeScript**, sesuai `PANDUAN-COMPANY-PROFILE.md`. Identitas gelap-oranye dengan tema hero yang mengikuti produk aktif.

## Menjalankan

Di terminal dengan Node.js yang sesuai (direkomendasikan Node.js 22.12+):

```bash
npm install
npm run dev
```

Buka URL yang dicetak Vite, biasanya **http://127.0.0.1:5173/**.

Di komputer ini Node tersedia di Laragon tetapi belum berada dalam PATH PowerShell. Dari folder proyek, gunakan:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-dev.ps1
```

Script memilih Node Laragon ketika `node` belum tersedia pada PATH. Tidak mengubah konfigurasi sistem.

## Fitur

- Hero dengan empat pilihan sepatu, tema warna seluruh website yang mengikuti pilihan, crossfade, tilt pointer, swipe, dan tombol navigasi manual. Pilihan dari katalog juga menyinkronkan produk hero; tema tetap aktif setelah dialog ditutup.
- Background bermotif grid, mesh titik, dan garis diagonal dengan warna adaptif serta transisi halus. Latar dasar tetap gelap agar konten mudah dibaca.
- Perlindungan terhadap respons gambar yang terlambat: pilihan terakhir menjadi acuan. Gambar gagal dimuat tidak menggantikan produk aktif dan dapat dicoba lagi.
- Empat produk konsep, filter kategori, dialog detail, fokus keyboard, dan dukungan Escape.
- Cerita brand, nilai toko, editorial, lokasi, kontak, dan navigasi mobile.
- Reduced motion, skip link, label aksesibel, dan fokus terlihat.
- Gambar WebP lokal, thumbnail terpisah, font lokal, dan aset asli tersimpan. Tidak bergantung pada CDN gambar/font saat situs berjalan.
- Tautan WhatsApp, Instagram, email, dan peta muncul dari dataset ketika kontak diisi.

## Dataset

| File | Isi |
| --- | --- |
| `src/data/company.json` | Nama, tagline, headline, cerita brand, nilai, navigasi, dan kontak |
| `src/data/products.json` | Empat konsep produk, kategori, tema, gambar, dan informasi katalog |
| `src/data/index.ts` | Tipe data dan helper URL |
| `DATASET-GUIDE.md` | Petunjuk pengeditan dan persiapan data toko asli |
| `assets/ASSETS.md` | Asal aset, prompt gambar, dan catatan lisensi |

**Dataset saat ini adalah demo.** Nama koleksi dan gambar AI merupakan konsep, bukan klaim produk yang dijual toko. Harga, ukuran, stok, alamat, dan kontak belum dikonfirmasi. Data tersebut sengaja kosong; UI menampilkan keterangan yang sesuai. Tidak ada testimoni, statistik, ataupun tahun berdiri fiktif.

Tidak ada backend atau database pada versi ini. Perubahan JSON diterapkan melalui Vite saat pengembangan; untuk produksi, build ulang setelah memperbarui data. Katalog ini tidak menyediakan checkout atau pembayaran.

## Pemeriksaan dan build

```bash
npm test
npm run build
npm run test:e2e
npm run preview
```

`test:e2e` memakai Google Chrome yang terpasang di komputer, tanpa mengunduh browser tambahan. Konfigurasi tersedia di `playwright.config.ts`. Pengujian membuka server preview sementara pada port 5174. Build produksi harus dijalankan terlebih dahulu. Pengujian aksesibilitas otomatis membantu menemukan masalah umum; tidak menggantikan evaluasi manual pembaca layar.

Jika terminal dibatasi sandbox dan tidak dapat menghentikan server anak, jalankan preview pada terminal terpisah (`npm run preview -- --port 5188`), lalu set `$env:E2E_BASE_URL = 'http://127.0.0.1:5188'` sebelum `npm run test:e2e`. Mode ini menguji server yang sudah berjalan tanpa mengelola prosesnya. Hentikan preview dengan Ctrl+C setelah selesai.

Hasil verifikasi implementasi: 4 pengujian dataset dan 8 pengujian browser lulus. Cakupan browser: pemuatan aset, pergantian tema cepat, retry gambar, filter, fokus dialog, anchor, menu mobile, swipe, lebar 360–1440 px, reduced motion, serta axe pada halaman dan dialog. Build TypeScript/Vite berhasil. Performa Core Web Vitals di hosting produksi belum diukur.

Build tersedia di `dist/`. Unggah isi direktori ini ke hosting statis atau direktori publik Laragon. Jangan membuka `index.html` menggunakan `file://` karena aplikasi menggunakan ES modules. `base: './'` mendukung hosting pada subdirektori. Deployment online belum dilakukan; proyek disiapkan di workspace lokal pengguna.

Sebelum publikasi resmi, ganti konten demo dengan data terkonfirmasi dan ubah `contentStatus` menjadi `ready`. Sesuaikan title, description, URL absolut `og:image`, dan tambahkan canonical URL di `index.html` sesuai domain final. Metadata bisnis terstruktur belum ditambahkan karena alamat dan identitas bisnis resmi belum tersedia.

## Aset dan perawatan

```bash
npm run optimize:images
npm run format
```

Optimasi membaca PNG asli di `assets/source/` dan menghasilkan WebP utama (1200 px) serta thumbnail produk (480 px) di `public/images/`. Transparansi dipertahankan. Nama sumber mengikuti daftar di `scripts/optimize-images.mjs`.

Dokumentasi teknis rujukan: [Vite](https://vite.dev/guide/) dan [Motion AnimatePresence](https://motion.dev/docs/react-animate-presence).
"# Projeka Shoes" 
