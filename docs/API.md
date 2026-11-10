# Dokumentasi REST API SisaBaik

## 1. Deskripsi

SisaBaik merupakan aplikasi untuk membantu penyedia menawarkan makanan berlebih yang masih layak dikonsumsi. Backend menggunakan REST API dengan Node.js, Express.js, dan PostgreSQL.

Aplikasi menerapkan autentikasi, otorisasi berdasarkan peran, dan pembatasan akses berdasarkan kepemilikan data.

Proyek menggunakan data fiktif untuk praktikum lokal dan belum ditujukan sebagai layanan transaksi publik.

## 2. Teknologi dan Persiapan

Teknologi yang digunakan:

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- bcryptjs
- JSON Web Token (JWT)
- express-rate-limit
- Helmet

Persiapan sebelum menjalankan aplikasi:

1. Pastikan Node.js dan PostgreSQL sudah terpasang.
2. Siapkan konfigurasi database dan JWT pada file `.env` berdasarkan `.env.example`.
3. Instal dependensi menggunakan perintah:

   ```bash
   npm install
   ```

4. Jalankan migrasi autentikasi `database/07_auth.sql` pada database pengembangan.
5. Jalankan server menggunakan:

   ```bash
   npm run dev
   ```

Jangan membagikan file `.env` karena berisi konfigurasi rahasia.

## 3. Base URL dan Format Response

Base URL aplikasi:

`http://localhost:3000`

Response berhasil:

```json
{
  "success": true,
  "data": {}
}
```

Response gagal:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Pesan kesalahan."
  }
}
```

Response koleksi dilengkapi metadata paginasi:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "jumlah": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

`meta.jumlah` menunjukkan jumlah data yang sesuai dengan filter dan cakupan akses pengguna.

## 4. Autentikasi

Autentikasi menggunakan JSON Web Token (JWT). Endpoint privat memerlukan header berikut:

```http
Authorization: Bearer <accessToken>
```

### 4.1 Registrasi Pembeli

- Method: `POST`
- Endpoint: `/api/auth/registrasi`

Digunakan untuk mendaftarkan pengguna sebagai pembeli.

### 4.2 Registrasi Penyedia

- Method: `POST`
- Endpoint: `/api/auth/registrasi-penyedia`

Digunakan untuk mendaftarkan pengguna sebagai penyedia beserta profil usaha.

Penyedia baru memiliki status verifikasi `menunggu` sampai disetujui pengelola.

### 4.3 Login

- Method: `POST`
- Endpoint: `/api/auth/login`

Digunakan untuk memverifikasi email dan kata sandi, kemudian menerbitkan access token.

### 4.4 Informasi Pengguna

- Method: `GET`
- Endpoint: `/api/auth/saya`

Digunakan untuk mengambil informasi akun yang sedang login berdasarkan token.

### 4.5 Logout

- Method: `POST`
- Endpoint: `/api/auth/logout`

Digunakan untuk mengakhiri sesi dengan mencabut versi token pengguna. Token versi lama tidak dapat digunakan kembali.

## 5. Endpoint Health Check

### 5.1 Memeriksa Kesehatan API

- Method: `GET`
- Endpoint: `/api/health`

Digunakan untuk memeriksa status API dan koneksi database.

Response berhasil menggunakan status `200 OK`.

## 6. Endpoint Penawaran

Endpoint penawaran digunakan untuk melihat dan mengelola informasi makanan yang ditawarkan oleh penyedia.

### 6.1 Melihat Katalog Penawaran

- Method: `GET`
- Endpoint: `/api/penawaran`

Digunakan untuk mengambil katalog publik dengan pencarian, filter, dan paginasi.

Parameter yang tersedia:

- `q`: pencarian kata kunci.
- `kategori`: filter kategori.
- `status`: filter status penawaran.
- `tersedia`: filter ketersediaan.
- `page`: menentukan halaman.
- `limit`: menentukan jumlah data per halaman.

### 6.2 Melihat Detail Penawaran

- Method: `GET`
- Endpoint: `/api/penawaran/:id`

Digunakan untuk mengambil detail penawaran berdasarkan ID.

### 6.3 Membuat Penawaran

- Method: `POST`
- Endpoint: `/api/penawaran`

Digunakan untuk membuat penawaran baru oleh penyedia yang sudah terverifikasi.

Identitas penyedia ditentukan oleh server melalui token, bukan dipilih oleh pengguna melalui request.

Response berhasil: `201 Created`.

### 6.4 Memperbarui Penawaran

- Method: `PUT`
- Endpoint: `/api/penawaran/:id`

Digunakan untuk memperbarui penawaran milik penyedia yang sedang login.

Penyedia hanya dapat mengubah penawaran miliknya sendiri. Identitas pemilik tidak dapat diganti melalui input client.

Response berhasil: `200 OK`.

### 6.5 Menghapus Penawaran

- Method: `DELETE`
- Endpoint: `/api/penawaran/:id`

Digunakan untuk menghapus penawaran milik penyedia yang sedang login.

Penawaran yang memiliki riwayat pesanan tidak dapat dihapus.

Response berhasil: `204 No Content`.

Jika terdapat riwayat pesanan, API mengembalikan `409 Conflict`.

### 6.6 Melihat Penawaran Milik Saya

- Method: `GET`
- Endpoint: `/api/penawaran/milik-saya`

Digunakan untuk mengambil daftar penawaran milik penyedia yang sedang login.

Endpoint memerlukan autentikasi dan status penyedia terverifikasi.

## 7. Endpoint Pesanan

Endpoint pesanan digunakan untuk membuat dan melihat transaksi sesuai hak akses pengguna.

### 7.1 Melihat Daftar Pesanan

- Method: `GET`
- Endpoint: `/api/pesanan`

Digunakan untuk mengambil daftar pesanan sesuai identitas dan peran pengguna yang login.

Pembeli hanya dapat melihat pesanannya sendiri. Penyedia hanya dapat melihat pesanan yang ditujukan kepada usahanya.

### 7.2 Melihat Detail Pesanan

- Method: `GET`
- Endpoint: `/api/pesanan/:id`

Digunakan untuk mengambil informasi pesanan dan detail item jika pengguna memiliki hak akses terhadap pesanan tersebut.

### 7.3 Membuat Pesanan

- Method: `POST`
- Endpoint: `/api/pesanan`

Digunakan oleh pembeli yang sudah login untuk membuat pesanan.

Body request menggunakan field `items`. Identitas pembeli diperoleh dari token, bukan dari `emailPembeli` yang dikirim client.

Ketentuan pemesanan:

- Stok harus mencukupi.
- Pesanan harus berasal dari satu penyedia.
- Harga disimpan sebagai snapshot saat transaksi.
- Perubahan harga penawaran tidak mengubah harga pesanan sebelumnya.
- Proses pesanan menggunakan transaksi database.
- Stok dikunci selama proses transaksi untuk menjaga konsistensi.
- Jika proses gagal, transaksi dibatalkan.

Response berhasil: `201 Created`.

## 8. Peran dan Otorisasi

SisaBaik memiliki dua peran pengguna.

### 8.1 Pembeli

Pembeli memiliki hak untuk:

- Melihat katalog publik.
- Membuat pesanan.
- Melihat pesanan miliknya sendiri.

### 8.2 Penyedia

Penyedia memiliki hak untuk:

- Melihat katalog publik.
- Mengelola penawaran miliknya setelah terverifikasi.
- Melihat pesanan yang ditujukan kepada usahanya.

Pemeriksaan akses dilakukan pada server melalui middleware dan pembatasan query berdasarkan kepemilikan data.

Pengguna tidak dapat menentukan sendiri peran, identitas pembeli, identitas penyedia, atau status verifikasi melalui request bisnis.

## 9. Kode Status HTTP

API menggunakan beberapa kode status HTTP berikut:

- `200 OK`: Request berhasil.
- `201 Created`: Resource berhasil dibuat.
- `204 No Content`: Request berhasil tanpa response body.
- `400 Bad Request`: Input atau parameter tidak valid.
- `401 Unauthorized`: Autentikasi tidak tersedia atau tidak valid.
- `403 Forbidden`: Pengguna tidak memiliki izin.
- `404 Not Found`: Resource tidak ditemukan atau tidak dapat diakses.
- `409 Conflict`: Terjadi konflik aturan bisnis.
- `413 Payload Too Large`: Ukuran request terlalu besar.
- `415 Unsupported Media Type`: Format Content-Type tidak didukung.
- `429 Too Many Requests`: Batas request terlampaui.
- `500 Internal Server Error`: Terjadi kesalahan server.

Beberapa kode error yang digunakan:

- `AUTH_REQUIRED`
- `TOKEN_INVALID`
- `TOKEN_EXPIRED`
- `SESSION_REVOKED`
- `LOGIN_FAILED`
- `ROLE_FORBIDDEN`
- `PROVIDER_NOT_VERIFIED`
- `AUTH_RATE_LIMIT`
- `REGISTRATION_RATE_LIMIT`
- `REFERENCE_CONFLICT`

## 10. Validasi dan Keamanan

API menerapkan beberapa mekanisme validasi dan keamanan:

- Validasi path parameter dan query parameter.
- Validasi format JSON dan tipe data.
- Validasi nilai harga, stok, status, dan waktu.
- Hash kata sandi menggunakan bcrypt.
- Verifikasi token JWT pada server.
- Pemeriksaan peran dan kepemilikan data.
- Pembatasan laju login dan pendaftaran.
- Query PostgreSQL menggunakan parameter.
- Transaksi database dengan mekanisme rollback.
- Pencabutan sesi melalui versi token.
- Penanganan kesalahan dengan format response konsisten.

Batas login adalah 20 request dalam 15 menit. Batas pendaftaran adalah 50 request dalam 15 menit. Kedua pembatas memiliki penghitung terpisah.

## 11. Verifikasi Penyedia

Pengelola dapat meninjau dan mengubah status verifikasi penyedia melalui script operator.

Untuk memverifikasi penyedia:

```bash
npm run penyedia:verifikasi -- email@example.test
```

Untuk menolak penyedia:

```bash
npm run penyedia:verifikasi -- email@example.test --tolak
```

Pengguna tidak dapat menyetujui atau mengubah status verifikasi usahanya sendiri melalui API.

## 12. Pengujian API

Jalankan server menggunakan:

```bash
npm run dev
```

Periksa koneksi database menggunakan:

```bash
npm run db:check
```

Jalankan pengujian autentikasi dan otorisasi Chapter 8:

```bash
npm run auth:test
```

Pengujian menggunakan database pengembangan dan membuat data uji baru. Gunakan database lokal dan data fiktif.

Script lama Chapter 7 dapat dijalankan menggunakan:

```bash
npm run api:test:chapter7
```

Script tersebut menggunakan kontrak sebelum autentikasi sehingga bukan pengujian API untuk Chapter 8.

Hasil pengujian Chapter 7 dicatat dalam:

`docs/hasil-uji-chapter7.md`

Hasil pengujian Chapter 8 dicatat dalam:

`docs/hasil-uji-chapter8.md`

## 13. Struktur Alur API

Alur request secara umum:

1. Router menerima request berdasarkan method dan URL.
2. Middleware memeriksa autentikasi dan token jika endpoint privat.
3. Middleware memeriksa peran dan status verifikasi jika diperlukan.
4. Controller membaca input dan menjalankan validasi.
5. Service menjalankan aturan bisnis.
6. Repository menjalankan query ke PostgreSQL.
7. API mengirim response kepada client.