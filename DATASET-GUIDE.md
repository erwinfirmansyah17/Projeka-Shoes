# Panduan Dataset Projeka Shoes

Data disimpan sebagai JSON agar mudah diedit tanpa menyentuh komponen React. Semua teks merupakan materi awal untuk ditinjau pemilik toko. Empat produk dan visualnya adalah ilustrasi konsep.

## Profil perusahaan

Edit `src/data/company.json`:

| Field | Makna |
| --- | --- |
| `contentStatus` | `demo` untuk pratinjau; ubah ke `ready` hanya setelah seluruh konten terkonfirmasi |
| `name`, `shortName` | Nama lengkap dan nama logo teks |
| `tagline` | Tagline identitas |
| `headline` | Tiga baris judul hero; jaga panjang agar tetap nyaman pada mobile |
| `description` | Deskripsi hero |
| `story` | Judul, label, paragraf, dan signature cerita brand |
| `values` | Nilai brand; ikon yang didukung: `footprints`, `palette`, `compass`, `message` |
| `navigation` | Nama tautan dan anchor bagian halaman |
| `contact` | Informasi kontak resmi; `null` menyatakan belum tersedia |
| `demoNotice` | Keterangan pratinjau yang muncul saat status `demo` |

Field kontak:

- `whatsapp`: string nomor internasional tanpa `+`, spasi, atau angka nol awal. Untuk nomor Indonesia, awali `62`. Isi hanya nomor toko yang benar.
- `email`: alamat email resmi atau `null`.
- `instagramUrl`: URL HTTPS akun resmi atau `null`.
- `mapsUrl`: URL HTTPS lokasi toko yang tepat atau `null`.
- `address`: alamat lengkap dalam satu string atau `null`.
- `openingHours`: jam operasional yang sudah dikonfirmasi atau `null`.

Saat `whatsapp` diisi, bagian kontak menampilkan tombol chat dan dialog produk menampilkan **Tanyakan Produk Ini**. Nama serta warna produk otomatis masuk ke pesan, dengan URL encoding. Tidak ada pesan yang dikirim tanpa tindakan pengguna di WhatsApp.

Heading cerita mengambil `story.title` dengan kata terakhir diberi aksen oranye. Tagline dipakai pada strip identitas dan footer. Periksa pemenggalan baris saat mengganti copy dengan teks yang lebih panjang.

## Produk

Edit `src/data/products.json`. Setiap objek mewakili satu produk:

| Field | Format dan aturan |
| --- | --- |
| `id` | Slug unik, misalnya `urban-stride` |
| `name`, `edition` | Nama produk dan nomor seri tampilan |
| `category` | Nama kategori; filter dibentuk otomatis dari data |
| `label` | Label pendek di hero |
| `colorName` | Nama warna atau kombinasi warna |
| `description` | Deskripsi yang sesuai produk aktual |
| `image` | Path relatif terhadap `public/`, tanpa slash awal |
| `thumbnail` | Path gambar kartu berukuran kecil |
| `imageAlt` | Deskripsi gambar bagi pembaca layar |
| `theme.accent` | Warna utama produk dalam hex enam digit |
| `theme.soft` | Warna aksen pendamping untuk perluasan tema |
| `theme.glow` | Warna rgba halo produk dengan opacity rendah |
| `details` | Daftar detail yang dapat dibuktikan |
| `featured` | `true` untuk diprioritaskan di awal hero; semua produk dapat dipilih dan menyinkronkan tema website |
| `isConcept` | `true` untuk ilustrasi; ubah ke `false` setelah produk dan fotonya nyata |
| `price` | Angka rupiah tanpa pemisah ribuan, atau `null` jika belum dikonfirmasi |
| `sizes` | Array string ukuran terkonfirmasi; `[]` bila belum tersedia |
| `stockStatus` | Status data persediaan, awalnya `unconfirmed`; belum digunakan untuk pemesanan |

Daftar awal:

| Produk konsep | Kategori | Aksen | Hero |
| --- | --- | --- | --- |
| Urban Stride | Daily | `#ff6f00` | Ya |
| Volt Runner | Sport | `#bddb26` | Ya |
| Terra Form | Casual | `#c9ab83` | Ya |
| Aero Shift | Daily | `#6ca9ff` | Ya, setelah produk unggulan |

## Mengganti gambar

1. Siapkan foto yang boleh digunakan, idealnya cutout transparan dan sudut konsisten.
2. Letakkan foto utama dan thumbnail di `public/images/`.
3. Perbarui `image`, `thumbnail`, dan `imageAlt`.
4. Tentukan aksen yang sesuai detail sepatu. Produk netral dapat memakai oranye brand.
5. Periksa keterbacaan dan komposisi hero pada desktop serta mobile.
6. Jalankan `npm test`, `npm run build`, dan `npm run test:e2e`.

Untuk menggunakan pipeline optimasi yang tersedia, ganti PNG pada `assets/source/` dan jalankan `npm run optimize:images`. Jika menambah nama produk baru, tambahkan nama file pada daftar script optimasi.

## Beralih dari demo ke profil resmi

- Tinjau semua copy profil, termasuk cerita brand dan keunggulan.
- Ganti visual konsep dengan foto katalog/toko yang benar, atau pertahankan label ilustratif jika memang relevan.
- Isi kontak resmi dan uji tujuan setiap tautan.
- Isi hanya harga, ukuran, dan detail yang telah dikonfirmasi.
- Ubah `isConcept` per produk serta `contentStatus` setelah seluruh konten selesai ditinjau.
- Label `CONCEPT` mengikuti `isConcept`; catatan koleksi dan editorial mengikuti `contentStatus` secara otomatis.
- Sesuaikan metadata dan domain final pada `index.html`.

Jangan menyimpan API key, password, atau data pelanggan dalam file JSON ini. Data yang dipakai aplikasi frontend dapat dibaca pengunjung.
