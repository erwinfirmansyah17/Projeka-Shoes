# Buku Panduan Company Profile Toko Sepatu

Dokumen perencanaan desain dan implementasi menggunakan React + Vite.
Nama kerja: **Projeka Shoes**. Nama, kontak, foto, dan cerita brand perlu disesuaikan dengan data toko sebelum publikasi.

## 1. Tujuan dan konsep

Membangun company profile yang memperkenalkan karakter toko, menampilkan koleksi pilihan, dan mengarahkan pengunjung ke konsultasi WhatsApp atau kunjungan toko.

Konsep visual: **Move With Character** — sepatu menjadi pusat perhatian melalui foto besar, tipografi tegas, ruang kosong yang cukup, dan perubahan aksen warna berdasarkan produk unggulan.

Prioritas pengalaman:

1. Pengunjung langsung memahami identitas dan gaya koleksi toko.
2. Pengunjung dapat menjelajahi produk unggulan dan memahami kegunaannya.
3. Pengunjung mudah menemukan lokasi, jam buka, serta cara menghubungi toko.

Ruang lingkup awal berupa company profile dengan katalog pilihan. Keranjang, pembayaran, akun pelanggan, dan pengelolaan stok menjadi pengembangan terpisah jika diperlukan.

## 2. Arah visual dari referensi

Ambil prinsip komposisi gambar: judul besar di kiri, sepatu dominan di kanan, bentuk organik di belakang produk, kartu koleksi, dan panel keunggulan yang ringkas.

Adaptasi untuk Projeka Shoes:

- Gunakan latar gelap dengan aksen oranye sebagai identitas awal.
- Pertahankan foto sepatu yang tajam, idealnya cutout transparan dengan bayangan terpisah.
- Tampilkan satu produk unggulan dalam satu waktu agar perubahan tema terasa jelas.
- Gunakan navbar horizontal; navigasi samping pada referensi tidak perlu diduplikasi karena menambah kepadatan layar.
- Jadikan cerita toko dan kontak sebagai bagian utama company profile.
- Gunakan foto, logo, nama produk, dan klaim milik toko sendiri. Angka statistik pada referensi tidak digunakan sebagai data toko.

## 3. Sistem warna

### Palet identitas

| Warna | Peran | Penerapan |
| --- | --- | --- |
| `#0e0e10` | Latar utama | Body, hero, footer |
| `#3b3f45` | Permukaan sekunder | Kartu, panel, tombol sekunder |
| `#ff6f00` | Aksen utama | CTA utama, penanda aktif, detail brand |
| `#ffad33` | Aksen pendamping | Sorotan, gradasi, detail dekoratif |
| `#d9dde1` | Teks terang | Judul, paragraf, ikon di permukaan gelap |

Gunakan teks `#0e0e10` pada tombol oranye sebagai pasangan awal yang harus diverifikasi kontrasnya. Jangan mengasumsikan teks terang selalu terbaca pada semua warna produk.

### Tema mengikuti produk

Tema awal menggunakan gelap-oranye. Sesuai pembaruan permintaan, saat sepatu dipilih dari hero maupun katalog, **warna seluruh website** mengikuti aksen produk: logo, tombol, ikon, banner, halo, motif background, dan kata sorotan. Pilihan katalog juga menyinkronkan produk hero, dan tema tetap aktif setelah detail ditutup.

Contoh tema sementara, disesuaikan kembali dengan foto produk asli:

| Varian produk | Aksen produk | Aksen pendamping | Suasana |
| --- | --- | --- | --- |
| Hitam–oranye | `#ff6f00` | `#ffad33` | Energik, sporty |
| Hitam–lime | `#bddb26` | `#ddea89` | Ringan, dinamis |
| Putih–biru | `#6ca9ff` | `#b8d6ff` | Bersih, segar |
| Beige | `#c9ab83` | `#e5d3b8` | Hangat, kasual |

Warna di luar palet utama merupakan ekstensi tema produk. Latar dasar tetap gelap dengan motif grid, titik mesh, dan garis diagonal dalam warna sepatu. Teks utama tetap netral agar mudah dibaca. Warna aksen dan motif berpindah melalui transisi 650–700 ms, atau langsung berubah pada reduced motion.

Aturan perilaku:

1. Tema hero berubah ketika pengguna memilih produk melalui panah, indikator, atau swipe.
2. Hover kartu katalog hanya memengaruhi kartu tersebut; tidak mengubah seluruh halaman.
3. Produk hitam atau putih menggunakan warna detail sepatu sebagai aksen. Jika tidak ada detail warna yang cocok, gunakan oranye brand.
4. Tema ditentukan melalui data produk yang dikurasi, bukan mengambil warna foto secara otomatis saat halaman dibuka.
5. Perubahan warna dan pergantian foto dimulai bersamaan, dengan transisi sekitar 500–700 ms.
6. Teks informasi memakai warna netral stabil. Tema dekoratif tidak boleh mengurangi keterbacaan.
7. Foto berikutnya dimuat sebelum transisi. Jika gagal, pertahankan produk aktif dan tampilkan opsi coba lagi.

Contoh kontrak data, bukan data produk siap terbit:

```js
const featuredProducts = [
  {
    id: 'urban-stride',
    name: 'Urban Stride',
    category: 'Daily sneakers',
    tagline: 'Karakter kuat. Langkah percaya diri.',
    image: '/images/urban-stride.webp',
    imageAlt: 'Sneaker hitam dengan detail oranye, tampak samping',
    theme: {
      accent: '#ff6f00',
      accentSoft: '#ffad33',
      glow: 'rgba(255, 111, 0, 0.20)',
    },
  },
];
```

Variabel CSS hero: `--product-accent`, `--product-accent-soft`, dan `--product-glow`. Variabel brand terpisah: `--brand-accent`, `--page-bg`, `--surface`, dan `--text-primary`.

## 4. Struktur halaman dan arahan konten

### A. Navbar

Logo di kiri; tautan Koleksi, Tentang Kami, Keunggulan, dan Lokasi; CTA **Hubungi Toko** di kanan. Navbar sticky dengan latar yang lebih solid setelah scroll. Pada mobile, gunakan menu ringkas dengan tombol tutup yang jelas.

### B. Hero: pengalaman utama

Desktop: teks sekitar 45% lebar, panggung produk sekitar 55%. Sepatu besar melampaui sebagian bidang dekoratif tanpa menutupi navigasi atau tombol.

Contoh copy:

- Eyebrow: **PILIHAN SEPATU UNTUK RITMEMU**
- Headline: **LANGKAH BERANI. GAYA SENDIRI.**
- Deskripsi: “Temukan pilihan sepatu untuk aktivitas harian dan gaya personalmu.”
- CTA utama: **Jelajahi Koleksi**
- CTA sekunder: **Kenali Projeka**

Sertakan nama produk, kategori, nomor slide, dan tombol sebelumnya/berikutnya. Maksimal 3–5 produk unggulan. Hindari pembuka “Welcome”, “Welcome to”, atau kalimat selamat datang generik di seluruh konten.

### C. Keunggulan toko

Tiga atau empat poin singkat dengan ikon garis. Contoh topik: pilihan gaya, bantuan memilih ukuran, kemudahan konsultasi, dan lokasi toko. Klaim seperti original, garansi, atau pengiriman cepat hanya ditampilkan jika dapat dibuktikan.

### D. Koleksi pilihan

Tampilkan 4–8 produk dengan foto, nama, kategori, warna, dan tombol **Lihat Detail**. Filter sederhana seperti Semua, Daily, Sport, dan Casual hanya dibuat jika koleksinya memang tersedia.

Detail produk muncul dalam dialog atau panel dengan foto tambahan, deskripsi, pilihan ukuran yang terkonfirmasi, dan CTA **Tanyakan Produk Ini**. Pesan WhatsApp dapat diisi nama produk melalui URL yang di-encode. Jangan menampilkan ukuran atau stok contoh sebagai informasi aktual.

Jika harga sering berubah atau belum tersedia, gunakan **Tanyakan Harga**. Jangan mengarang harga untuk mengisi desain.

### E. Cerita brand

Headline: **SETIAP LANGKAH PUNYA CERITA.**

Gunakan foto toko atau aktivitas nyata. Isi 2–3 paragraf tentang asal toko, karakter koleksi, dan cara membantu pelanggan. Tahun berdiri dan cerita pendiri menunggu data pemilik toko.

### F. Sorotan koleksi / editorial

Satu bidang foto lifestyle besar dengan headline **DARI RUTINITAS KE DESTINASI BERIKUTNYA.** Gunakan aksen yang mengikuti produk dalam bidang tersebut, secara lokal. Arahkan CTA ke koleksi terkait.

### G. Testimoni atau bukti kepercayaan

Gunakan testimoni asli yang diizinkan untuk ditampilkan. Bila belum tersedia, bagian ini dapat dihilangkan atau diganti galeri toko. Statistik pelanggan, rating, dan jumlah penjualan hanya ditampilkan setelah diverifikasi.

### H. Lokasi dan kontak

Alamat lengkap, jam operasional, nomor WhatsApp, tautan Instagram, dan tombol **Petunjuk Arah**. Peta interaktif bersifat opsional; tautan peta cukup untuk versi awal yang ringan.

### I. Footer

Logo, kalimat brand pendek, navigasi ringkas, kontak, dan hak cipta. Tidak perlu formulir newsletter jika belum ada proses pengelolaannya.

## 5. Panduan animasi

Animasi unggulan berpusat pada produk. Bagian lainnya mendukung alur baca dengan gerakan lebih tenang.

| Interaksi | Rancangan gerakan | Durasi awal |
| --- | --- | --- |
| Hero pertama tampil | Headline masuk bertahap; sepatu naik sedikit dan berputar menuju posisi akhir | 700–1.000 ms |
| Pergantian produk | Foto lama memudar dan bergeser; foto baru masuk; halo dan aksen berganti serempak | 500–700 ms |
| Kedalaman hero | Sepatu dan halo bergerak dengan jarak berbeda mengikuti pointer | Respons lembut, rotasi maksimal ±4° |
| Reveal saat scroll | Konten bergeser naik 16–24 px sambil muncul, sekali per bagian | 450–650 ms |
| Hover kartu | Kartu naik 4–6 px, foto membesar hingga sekitar 1,04× | 200–300 ms |
| CTA | Panah bergeser pendek dan permukaan berubah terang | 150–250 ms |
| Dialog detail | Panel dan backdrop muncul bersama | 200–300 ms |

Detail pengalaman premium:

- Gunakan bayangan lembut dan halo radial untuk memberi kedalaman tanpa model 3D.
- Pisahkan layer foto, bayangan, dan dekorasi agar pergerakan terasa dimensional.
- Saat pengguna menekan panah berulang, simpan pilihan terakhir dan batalkan transisi usang agar gambar, teks, dan tema tetap sinkron.
- Mulai dengan carousel manual; tidak ada perpindahan otomatis yang mengganggu pembacaan.
- Hindari scroll hijacking, custom cursor yang menggantikan pointer, dan intro panjang yang menghalangi akses.
- Efek pointer hanya aktif pada perangkat dengan pointer presisi. Mobile menggunakan transisi sederhana tanpa tilt.
- Pada `prefers-reduced-motion`, hilangkan parallax, tilt, dan pergeseran besar; tampilkan konten langsung atau gunakan fade singkat.
- Animasikan terutama `transform` dan `opacity`. Crossfade dua layer halo untuk perubahan tema; hindari blur besar yang terus dianimasikan.
- Tidak perlu WebGL atau model 3D pada versi awal. Foto cutout berkualitas menjadi prioritas.

## 6. Tipografi dan tata letak

- Judul: font sans condensed tebal, misalnya Barlow Condensed. Teks isi: sans yang mudah dibaca, misalnya Manrope. Verifikasi lisensi aset font sebelum digunakan.
- Gunakan maksimal dua keluarga font dengan subset dan bobot seperlunya.
- Headline desktop sekitar 72–112 px, mobile sekitar 40–56 px; sesuaikan panjang copy dengan `clamp()`.
- Isi teks sekitar 16–18 px dengan line-height 1,5–1,7.
- Lebar konten maksimum sekitar 1.200–1.280 px.
- Spasi menggunakan skala 8 px; jarak antarseksi sekitar 80–120 px desktop dan 48–72 px mobile.
- Kartu menggunakan radius 16–24 px; tombol utama dapat berbentuk pill.

## 7. Perilaku responsif dan aksesibilitas

- Desktop: hero dua kolom, katalog empat kolom.
- Tablet: proporsi hero disesuaikan, katalog dua kolom.
- Mobile: judul, foto, informasi produk, lalu CTA; katalog satu atau dua kolom sesuai lebar aktual. Nama dan tombol tidak boleh terpotong.
- Uji mulai lebar 360 px. Dekorasi boleh keluar bidangnya, tetapi halaman tidak boleh memiliki scroll horizontal tak sengaja.
- Semua kontrol dapat digunakan dengan keyboard dan memiliki fokus terlihat.
- Tombol ikon memiliki nama aksesibel; pergantian slide mengumumkan nama produk secara ringkas tanpa memindahkan fokus.
- Dialog mengelola fokus, mendukung Escape, dan mengembalikan fokus ke pemicu setelah ditutup.
- Target sentuh minimal 44 × 44 px sebagai target desain.
- Kontras ditargetkan minimal 4,5:1 untuk teks biasa, 3:1 untuk teks besar dan komponen UI yang relevan; cek setiap tema produk.
- Informasi tidak boleh hanya dibedakan lewat warna. Foto produk memiliki alt text; dekorasi diabaikan pembaca layar.

## 8. Rencana teknis

**Pilihan utama: React + Vite + TypeScript.** Vue 3 + Vite + TypeScript juga dapat menerapkan rancangan yang sama, tetapi satu stack dipilih agar implementasi konsisten.

Rencana pendukung:

- CSS dengan custom properties untuk warna, ukuran, dan spacing.
- Motion for React untuk koreografi hero, pergantian produk, dan transisi komponen; cocokkan API dengan versi yang dipasang saat implementasi.
- Data produk, navigasi, dan profil toko dipisahkan dari komponen agar mudah diperbarui.
- State produk aktif dikelola di komponen showcase; tema diturunkan dari produk aktif sebagai satu sumber data.
- Untuk versi satu halaman, gunakan navigasi anchor. Router ditambahkan bila dibutuhkan halaman detail atau halaman koleksi tersendiri.
- Konten awal berupa data lokal. CMS baru ditambahkan bila pemilik membutuhkan pembaruan mandiri.

Struktur yang disarankan:

```text
src/
  components/
    Navbar.tsx
    ProductShowcase.tsx
    ProductCard.tsx
    ProductDialog.tsx
    Reveal.tsx
    Footer.tsx
  sections/
    Hero.tsx
    StoreBenefits.tsx
    FeaturedCollection.tsx
    BrandStory.tsx
    LifestyleFeature.tsx
    StoreContact.tsx
  data/
    products.ts
    company.ts
  styles/
    tokens.css
    global.css
  App.tsx
  main.tsx
public/
  images/
```

## 9. Performa, SEO, dan pengukuran

- Siapkan foto dalam WebP/AVIF sesuai dukungan pipeline; pertahankan transparansi untuk cutout.
- Sediakan ukuran gambar responsif dan dimensi eksplisit untuk mengurangi pergeseran layout.
- Foto hero pertama diprioritaskan; gambar di bawah layar dimuat secara lazy. Muat produk berikutnya setelah konten awal siap.
- Target awal foto hero maksimal sekitar 300 KB bila kualitas memungkinkan; evaluasi dengan gambar nyata.
- Target evaluasi performa: LCP ≤2,5 detik, CLS ≤0,1, dan INP ≤200 ms. Ini target, bukan hasil yang dijanjikan sebelum pengujian.
- Gunakan satu H1, hierarki heading rapi, judul halaman, meta description, favicon, dan Open Graph.
- Sertakan informasi bisnis terstruktur hanya dengan data nyata. Pertimbangkan prerender jika pengindeksan konten menjadi prioritas utama.
- Bila analitik dipasang, ukur klik koleksi, pembukaan detail produk, klik WhatsApp, dan klik petunjuk arah. Jangan masukkan isi pesan atau data pribadi ke event.

## 10. Aset yang perlu disiapkan

1. Nama final, logo, tagline, dan ringkasan identitas toko.
2. Tiga sampai lima foto produk unggulan dengan kualitas dan sudut yang konsisten.
3. Empat sampai delapan produk katalog beserta nama, kategori, deskripsi, dan warna aksennya.
4. Foto toko dan satu atau dua foto lifestyle dengan hak penggunaan yang jelas.
5. Alamat, jam buka, nomor WhatsApp, tautan sosial, dan tautan peta.
6. Cerita brand dan keunggulan yang benar-benar ditawarkan.
7. Harga, ukuran, kebijakan, serta testimoni apabila akan ditampilkan.

Jika aset belum siap, gunakan placeholder berlabel jelas di pratinjau. Semua placeholder harus diganti atau dihapus sebelum publikasi.

## 11. Tahapan pengerjaan

| Tahap | Pekerjaan | Hasil yang diperiksa |
| --- | --- | --- |
| 1. Konten dan identitas | Kumpulkan data toko, tentukan produk unggulan, kurasi aksen | Daftar konten dan pemetaan tema produk |
| 2. Wireframe | Susun halaman desktop dan mobile | Urutan informasi dan jalur menuju kontak |
| 3. Desain visual | Terapkan palet, tipografi, kartu, dan hero | Tampilan hero untuk minimal tiga tema produk |
| 4. Fondasi aplikasi | Siapkan React + Vite, data, token, dan layout | Semua bagian tampil responsif dengan konten |
| 5. Interaksi utama | Carousel manual, tema dinamis, dialog, tautan kontak | Alur produk sampai konsultasi berfungsi |
| 6. Animasi | Koreografi hero, reveal, hover, dan reduced motion | Gerakan konsisten di desktop dan mobile |
| 7. Pemeriksaan | Periksa konten, aksesibilitas, performa, dan browser | Daftar pemeriksaan lulus dan keterbatasan tercatat |
| 8. Publikasi | Build produksi, konfigurasi hosting, verifikasi URL | Situs aktif dengan aset dan kontak final |

Estimasi awal: sekitar 6–10 hari kerja untuk satu pengembang setelah aset utama tersedia. Ini asumsi perencanaan; revisi desain, kesiapan foto, CMS, atau tambahan halaman dapat mengubah durasi.

## 12. Kriteria selesai

- [ ] Identitas dasar memakai lima warna yang ditentukan.
- [ ] Setidaknya tiga produk unggulan memiliki tema yang sesuai foto.
- [ ] Foto, teks, indikator, dan warna tetap sinkron saat navigasi cepat.
- [ ] Tema berubah lembut tanpa flash terang atau kehilangan keterbacaan.
- [ ] Kegagalan gambar tidak menghasilkan hero kosong.
- [ ] Seluruh copy bebas pembuka “welcome” dan klaim fiktif.
- [ ] Navigasi, filter yang tersedia, dialog, WhatsApp, dan petunjuk arah berfungsi.
- [ ] Halaman dapat dipakai di mobile, dengan keyboard, dan dalam reduced motion.
- [ ] Tidak ada placeholder, tautan kosong, atau informasi contoh yang terpublikasi.
- [ ] Build produksi berhasil; tampilan diperiksa pada browser desktop dan perangkat mobile.
- [ ] Pergantian tema, dialog, dan navigasi cepat diuji sebagai perilaku utama.
- [ ] Metadata, gambar berbagi, dan informasi kontak sudah benar.

## 13. Prioritas implementasi

**Wajib:** hero adaptif warna, company profile, koleksi pilihan, cerita toko, kontak, responsivitas, dan aksesibilitas.

**Penyempurnaan setelah fondasi siap:** parallax pointer, editorial lifestyle, transisi dialog, dan analitik.

**Pengembangan berikutnya:** CMS, halaman detail yang dapat dibagikan, pencarian katalog besar, dan integrasi e-commerce bila dibutuhkan.
