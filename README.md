# SisaBaik REST API

## 1. Deskripsi

SisaBaik merupakan aplikasi yang membantu penyedia menawarkan makanan berlebih yang masih layak dikonsumsi. Proyek ini menggunakan REST API dengan PostgreSQL sebagai database.

Aplikasi menerapkan autentikasi pengguna, pembagian peran pembeli dan penyedia, serta pembatasan akses berdasarkan kepemilikan data.

## 2. Teknologi

Teknologi yang digunakan dalam proyek ini meliputi:

- Node.js (minimal versi 22)
- Express.js 5
- PostgreSQL
- JavaScript
- bcryptjs
- JSON Web Token (JWT)
- express-rate-limit
- Helmet

## 3. Persiapan

Sebelum menjalankan proyek, pastikan Node.js dan PostgreSQL sudah terpasang.

Instal dependensi dengan perintah:

```bash
npm install
```

Selanjutnya, salin file `.env.example` menjadi `.env`.

Sesuaikan konfigurasi database dan isi `JWT_SECRET` menggunakan secret acak yang aman.

**Penting:** Jangan membagikan atau mengunggah file `.env` ke repositori GitHub karena dapat berisi informasi rahasia.

## 4. Migrasi Database

Pastikan database pengembangan `sisabaik_dev` sudah tersedia.

Jalankan migrasi autentikasi dengan perintah:

```bash
psql -U postgres -d sisabaik_dev -f database/07_auth.sql
```

Migrasi ini menambahkan kebutuhan penyimpanan hash kata sandi dan versi token tanpa menghapus riwayat data sebelumnya.

## 5. Menjalankan Server

Terdapat dua cara untuk menjalankan server.

**Mode pengembangan:**

```bash
npm run dev
```

**Mode normal:**

```bash
npm start
```

Secara default, aplikasi dapat diakses melalui:

- Halaman utama: http://localhost:3000
- Halaman autentikasi: http://localhost:3000/auth.html

## 6. Autentikasi dan Peran Pengguna

SisaBaik memiliki dua jenis pengguna:

**Pembeli**

- Melihat katalog penawaran makanan.
- Membuat pesanan.
- Melihat pesanan miliknya sendiri.

**Penyedia**

- Mendaftarkan akun dan profil usaha.
- Mengelola penawaran setelah profil usahanya diverifikasi.
- Melihat pesanan yang berkaitan dengan penawarannya.

Penyedia yang baru mendaftar memiliki status `menunggu` sampai disetujui oleh pengelola.

### 6.1 Endpoint Autentikasi

Endpoint autentikasi yang tersedia:

- `POST /api/auth/registrasi` — mendaftarkan akun pembeli.
- `POST /api/auth/registrasi-penyedia` — mendaftarkan akun penyedia.
- `POST /api/auth/login` — melakukan login pengguna.
- `GET /api/auth/saya` — melihat informasi akun yang sedang login.
- `POST /api/auth/logout` — mengakhiri sesi dan mencabut token yang digunakan.

## 7. Endpoint Bisnis

### 7.1 Penawaran

Endpoint penawaran yang tersedia:

- `GET /api/penawaran` — melihat katalog penawaran publik.
- `GET /api/penawaran/:id` — melihat detail penawaran.
- `POST /api/penawaran` — membuat penawaran.
- `PUT /api/penawaran/:id` — memperbarui penawaran.
- `DELETE /api/penawaran/:id` — menghapus penawaran.
- `GET /api/penawaran/milik-saya` — melihat penawaran milik penyedia yang sedang login.

Operasi pengelolaan penawaran hanya dapat dilakukan oleh penyedia yang sudah terverifikasi dan memiliki penawaran tersebut.

### 7.2 Pesanan

Endpoint pesanan yang tersedia:

- `GET /api/pesanan` — melihat daftar pesanan sesuai hak akses pengguna.
- `GET /api/pesanan/:id` — melihat detail pesanan sesuai hak akses pengguna.
- `POST /api/pesanan` — membuat pesanan sebagai pembeli.

Identitas pembeli dan penyedia ditentukan oleh server, bukan dipilih melalui field identitas pada request pengguna.

Pembuatan pesanan menggunakan transaksi database untuk menjaga konsistensi stok dan snapshot harga.

## 8. Verifikasi Penyedia

Pengelola dapat memverifikasi penyedia melalui script berikut:

```bash
npm run penyedia:verifikasi -- email@example.test
```

Untuk menolak penyedia, gunakan:

```bash
npm run penyedia:verifikasi -- email@example.test --tolak
```

Ganti alamat email dengan email akun penyedia yang akan diproses.

Gunakan perintah tersebut hanya pada database praktikum yang sesuai.

## 9. Pengujian

### 9.1 Memeriksa Koneksi Database

Jalankan perintah:

```bash
npm run db:check
```

### 9.2 Pengujian Chapter 8

Jalankan pengujian autentikasi dan otorisasi dengan perintah:

```bash
npm run auth:test
```

Pengujian menggunakan database pengembangan lokal dan membuat akun, penawaran, serta pesanan uji.

Gunakan data fiktif dan jangan menjalankan pengujian ini pada database produksi.

### 9.3 Pengujian Chapter 7

Pengujian API Chapter 7 dapat dijalankan dengan perintah:

```bash
npm run api:test:chapter7
```

Script Chapter 7 menggunakan kontrak sebelum autentikasi sehingga bukan pengujian API untuk Chapter 8.

## 10. Keamanan

Beberapa mekanisme keamanan yang diterapkan dalam aplikasi:

- Kata sandi disimpan dalam bentuk hash.
- Token JWT diverifikasi oleh server.
- Logout mencabut sesi melalui perubahan versi token.
- Akses dibatasi berdasarkan peran dan kepemilikan data.
- Endpoint autentikasi memiliki pembatasan laju request.
- Credential, token, dan hash tidak boleh ditampilkan dalam laporan atau diunggah ke repositori.

## 11. Catatan

- Proyek menggunakan data fiktif untuk keperluan praktikum lokal.
- API menggunakan format JSON.
- Database PostgreSQL mempertahankan riwayat pengembangan Chapter 6 dan Chapter 7.

## 12. Antarmuka Vue (Chapter 9)

Chapter 9 mengembangkan antarmuka pengguna SisaBaik menggunakan Vue 3 dan Vite. Antarmuka ini menyediakan tampilan pembeli dan penyedia makanan.

### 12.1 Teknologi Frontend

- Vue 3
- Vite
- JavaScript
- CSS
- SVG untuk ilustrasi dan ikon.

### 12.2 Struktur Frontend

Folder `frontend` berisi aplikasi Vue dengan struktur sebagai berikut:

- `src/App.vue` — komponen utama aplikasi.
- `src/components/` — komponen kartu penawaran, filter, formulir, dan ikon.
- `src/data/` — data latihan penawaran makanan.
- `src/lib/` — fungsi bantuan untuk format tampilan, visual, dan formulir.
- `src/assets/` — ilustrasi dan logo aplikasi.
- `src/style.css` — pengaturan tampilan dan responsivitas.

### 12.3 Menjalankan Frontend

Masuk ke folder frontend:

```bash
cd frontend
```

Instal dependensi:

```bash
npm install
```

Jalankan aplikasi dalam mode pengembangan:

```bash
npm run dev
```

Build aplikasi untuk produksi:

```bash
npm run build
```

Jalankan preview hasil build:

```bash
npm run preview
```

### 12.4 Fitur Antarmuka

Fitur yang dikembangkan pada Chapter 9 meliputi:

- Katalog makanan untuk pembeli.
- Pencarian penawaran berdasarkan nama makanan dan penyedia.
- Filter berdasarkan kategori makanan.
- Pemilihan penawaran makanan.
- Mode penyedia untuk mengelola penawaran.
- Formulir penambahan penawaran baru.
- Validasi nama, harga, stok, dan tanggal berakhir.
- Penyaringan penawaran berdasarkan status dan masa kedaluwarsa.
- Tampilan responsif untuk berbagai ukuran layar.

### 12.5 Catatan Integrasi

Pada Chapter 10, antarmuka Vue 3 telah diintegrasikan dengan REST API menggunakan Express.js dan database PostgreSQL. Integrasi ini memungkinkan frontend mengambil dan mengirim data melalui endpoint API yang tersedia.

Frontend menggunakan Vue Router untuk mengatur navigasi antarhalaman dan mengelola akses berdasarkan peran pengguna. Pada mode pengembangan, Vite menggunakan proxy agar permintaan dengan awalan `/api` diteruskan ke backend pada port 3000.

### 12.6 Fitur Integrasi Full Stack

Fitur integrasi yang tersedia meliputi:

- Login dan registrasi pengguna sebagai pembeli maupun penyedia.
- Pengelolaan sesi pengguna.
- Katalog penawaran makanan yang terhubung dengan API.
- Pengelolaan penawaran oleh penyedia.
- Pengelolaan dan pemantauan pesanan.
- Dashboard pembeli dan penyedia.
- Penggunaan PostgreSQL untuk menyimpan data aplikasi.
- Build frontend menggunakan Vite untuk kebutuhan production.

### 12.7 Menjalankan Aplikasi

**Mode pengembangan**

Jalankan backend dari folder utama:

```bash
npm run dev
```

Jalankan frontend dari folder utama melalui terminal lain:

```bash
npm --prefix frontend run dev
```

Frontend dapat diakses melalui:

`http://127.0.0.1:5173/`

**Mode production lokal**

Build frontend terlebih dahulu:

```bash
npm run build
```

Kemudian jalankan aplikasi:

```bash
npm run start:local
```

Aplikasi dapat diakses melalui:

`http://127.0.0.1:3000/`

Pada mode ini, frontend hasil build dan backend Express disajikan melalui satu layanan lokal.

### 12.8 Hasil Pengerjaan dan Batasan Pengujian

Berdasarkan pengerjaan Chapter 10, frontend berhasil dijalankan menggunakan Vite dan berhasil dibangun untuk kebutuhan production. Login pembeli dan penyedia juga telah dicoba melalui browser, serta navigasi menuju halaman dashboard berhasil ditampilkan.

Pengujian build production lokal berhasil dilakukan dengan menjalankan aplikasi melalui `npm run start:local` dan mengaksesnya melalui `localhost:3000`.

Pengujian transaksi lengkap, termasuk pembatalan pesanan, perubahan stok, pembayaran saat pengambilan, dan perhitungan dashboard berdasarkan transaksi selesai, belum dilakukan secara menyeluruh.

Aplikasi masih memiliki beberapa batasan, yaitu belum menggunakan payment gateway, belum menyediakan fitur reset kata sandi dan verifikasi email, serta belum menerapkan pembaruan data secara real-time.
