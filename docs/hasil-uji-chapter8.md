# Hasil Pengujian Chapter 8 - SisaBaik

## 1. Informasi Pengujian

- Proyek: SisaBaik REST API
- Branch: `feature/auth-rbac`
- Database: `sisabaik_dev`
- Materi: Autentikasi dan Otorisasi
- Pengujian otomatis: `npm.cmd run auth:test`

## 2. Hasil Pengujian Otomatis

Perintah yang digunakan:

```powershell
npm.cmd run auth:test
```

Hasil pengujian:

```text
PASS: 44 pemeriksaan HTTP dan assertion kepemilikan/snapshot.
Bukti: penawaran 19, pesanan 10; fixture dipertahankan.
Empat akun uji dibuat dengan sandi acak yang tidak dicetak.
```

Kesimpulan: Sebanyak 44 pemeriksaan otomatis berhasil dijalankan. Pengujian mencakup autentikasi, peran pengguna, kepemilikan data, dan snapshot harga pesanan.

## 3. Hasil Pengujian Manual Browser

Pengujian dilakukan melalui halaman `auth.html` dengan hasil sebagai berikut:

1. Membuka halaman autentikasi: Berhasil.
2. Login akun pembeli: Berhasil.
3. Pendaftaran akun penyedia: Berhasil.
4. Login akun penyedia: Berhasil.
5. Memeriksa status penyedia sebelum verifikasi: `menunggu`.
6. Melakukan verifikasi penyedia melalui CLI: Berhasil.
7. Memperbarui status melalui tombol Periksa status: Berhasil.
8. Membuat penawaran dengan status draft: Berhasil.
9. Membuat penawaran aktif: Berhasil.
10. Login pembeli dan membuat pesanan: Berhasil.
11. Melihat daftar pesanan milik pembeli sendiri: Berhasil.
12. Login menggunakan akun pembeli kedua: Berhasil.
13. Memeriksa daftar pesanan pembeli kedua: Daftar kosong.

## 4. Bukti Data Pengujian Manual

Data pesanan yang berhasil dibuat:

- ID pesanan: `11`
- ID pembeli: `19`
- ID penyedia: `7`
- Status: `menunggu-konfirmasi`
- Total transaksi: Rp10.000
- Nilai stok terselamatkan: Rp20.000

Data penawaran draft yang terlihat pada daftar milik penyedia:

- ID penawaran: `21`
- Nama: Roti Kukus
- Status: `draft`

## 5. Catatan

Pengujian manual tambahan untuk kepemilikan pesanan oleh penyedia lain belum dilakukan. Pengujian otomatis telah mencakup pemeriksaan kepemilikan dan snapshot sesuai hasil 44 pemeriksaan.

Pengujian dilakukan menggunakan data fiktif pada database pengembangan lokal.

Tidak ada password, hash kata sandi, atau JWT yang dicantumkan dalam laporan.

## 6. Kesimpulan

Pengujian otomatis Chapter 8 berhasil dengan 44 pemeriksaan lulus. Pengujian manual juga menunjukkan bahwa pendaftaran, login, verifikasi penyedia, pengelolaan pen