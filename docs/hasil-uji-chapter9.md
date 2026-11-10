# Hasil Pengujian Chapter 9 – Antarmuka Vue SisaBaik

## 1. Informasi Pengujian

- Proyek: SisaBaik
- Materi: Chapter 9 – Membangun Antarmuka dengan Vue
- Framework: Vue 3
- Build tool: Vite
- Runtime: Node.js
- Pengujian: Antarmuka pembeli, penyedia, validasi formulir, dan build produksi.

## 2. Hasil Pengujian Fitur

1. **Tampilan awal mode pembeli:** Berhasil. Website menampilkan tiga kartu penawaran dengan total stok 15 unit dan dua penyedia.
2. **Pencarian LAPAU:** Berhasil. Sistem menampilkan dua penawaran milik Lapau Uni Rina.
3. **Pencarian tanpa hasil:** Berhasil. Sistem menampilkan pesan bahwa tidak ada makanan yang cocok.
4. **Filter kategori Roti:** Berhasil. Sistem hanya menampilkan satu penawaran, yaitu Paket Roti Sore.
5. **Tombol Pilih makanan:** Berhasil. Penawaran dapat dipilih dan stok tetap tidak berkurang.
6. **Mode penyedia:** Berhasil. Halaman menampilkan tiga penawaran, dua penawaran tersedia, dan total stok sembilan unit.
7. **Validasi formulir kosong:** Berhasil. Sistem menampilkan pesan kesalahan dan menolak formulir kosong.
8. **Validasi harga:** Berhasil. Sistem menolak harga penawaran yang lebih tinggi daripada harga normal.
9. **Menambahkan penawaran baru:** Berhasil. Paket Gratis Latihan berhasil ditambahkan dengan harga Rp0 dan stok dua paket.
10. **Penawaran baru di mode pembeli:** Berhasil. Penawaran baru muncul di katalog pembeli.
11. **Perpindahan mode:** Berhasil. Penawaran baru tetap muncul ketika berpindah antara mode pembeli dan penyedia.
12. **Refresh website:** Berhasil. Setelah halaman diperbarui, data kembali ke data awal karena penawaran latihan hanya disimpan sementara di memori aplikasi.
13. **Responsivitas dan aksesibilitas:** Berhasil. Tampilan diuji pada ukuran layar HP, tablet, dan laptop. Navigasi menggunakan keyboard juga diperiksa.
14. **Masa kedaluwarsa penawaran:** Berhasil. Nasi Padang Hemat otomatis menghilang setelah masa berlakunya habis. Penawaran lain tetap tersedia.
15. **Build produksi:** Berhasil. Seluruh proses build selesai tanpa error.
16. **Preview produksi:** Berhasil. Website dapat dibuka melalui server preview Vite.

## 3. Hasil Pengujian Data

Pada kondisi awal, mode pembeli menampilkan tiga penawaran dengan total stok 15 unit dan dua penyedia makanan.

Pada mode penyedia, terdapat tiga penawaran dengan dua penawaran tersedia dan total stok sembilan unit.

Setelah penambahan Paket Gratis Latihan, jumlah penawaran menjadi empat, penawaran tersedia menjadi tiga, dan total stok menjadi 11 unit.

Setelah halaman di-refresh, data kembali ke kondisi awal. Hal ini terjadi karena penawaran yang ditambahkan selama pengujian hanya disimpan sementara di memori aplikasi.

## 4. Hasil Build Produksi

Build produksi dijalankan menggunakan perintah berikut:

`npm.cmd run build`

Hasil pengujian menunjukkan bahwa 23 modul berhasil diproses. File HTML, CSS, JavaScript, dan SVG berhasil dibuat. Proses build selesai tanpa error.

Selanjutnya, preview produksi dijalankan menggunakan perintah:

`npm.cmd run preview`

Hasilnya, website SisaBaik berhasil dibuka melalui server preview Vite.

## 5. Kesimpulan

Pembangunan antarmuka SisaBaik menggunakan Vue telah berhasil dijalankan. Fitur katalog pembeli, pencarian, filter kategori, mode penyedia, dan formulir penawaran telah diuji. Validasi formulir juga berhasil menolak data yang tidak sesuai.

Selain itu, proses build produksi dan preview berhasil dijalankan tanpa error. Data penawaran yang ditambahkan selama pengujian masih bersifat sementara karena belum disimpan ke database.