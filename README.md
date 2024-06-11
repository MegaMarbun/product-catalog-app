# Product Catalog App

**Product Catalog App** adalah aplikasi web yang dibangun dengan React.js untuk mengelola produk. Aplikasi ini memungkinkan pengguna untuk melihat daftar produk, melihat detail produk, menambah, memperbarui, dan menghapus produk. Fitur pencarian disediakan untuk memfilter daftar produk. Aplikasi ini juga dilengkapi dengan validasi input dan integrasi dengan API endpoints.

## Daftar Isi

- [Fitur](#fitur)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [API](#api)
- [Validasi Permintaan](#validasi-permintaan)
- [Dependensi](#dependensi)

## Fitur

- **Halaman Home**: Navigasi mudah ke halaman utama aplikasi.
- **Daftar Produk**: Menampilkan produk dengan pagination dan fitur pencarian.
- **Detail Produk**: Menampilkan informasi detail dan menyediakan opsi pembaruan dan penghapusan produk.
- **Tambah Produk**: Formulir untuk menambahkan produk baru ke katalog.
- **Perbarui Produk**: Formulir untuk memperbarui informasi produk yang ada.
- **Hapus Produk**: Menghapus produk dari katalog.
- **Pencarian**: Memfilter produk berdasarkan kueri pencarian.

## Instalasi

### Prasyarat

- **Node.js**: Versi 14.x atau lebih tinggi.
- **npm**: Paket manajer Node.js.

### Langkah-Langkah instalasi

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/MegaMarbun/product-catalog-app.git
   ```
2. cd product-catalog-app
3. npm install
4. npm start

Aplikasi berjalan di 'http://localhost:3000'

Navigasi

1. Halaman Home: Menyediakan tautan ke daftar produk.
2. List Produk: Menampilkan produk dengan opsi untuk melihat detail dan menambah produk. Tambah Produk: Klik tombol "Add Product" untuk membuka formulir penambahan produk.
3. Detail Produk: Menampilkan informasi detail dan menyediakan opsi untuk memperbarui atau menghapus produk. Perbarui Produk: Di tampilan detail produk, klik tombol "Update" untuk mengedit informasi produk. Hapus Produk: Di tampilan detail produk, klik tombol "Delete" untuk menghapus produk.
4. Pagination
   Navigasi halaman produk dengan tombol "Previous" dan "Next".
5. Fitur pencariian: menggunakan useState untuk products diinisialisasi sebagai array kosong: Ini memastikan bahwa products selalu diinisialisasi sebagai array, jadi pemanggilan map pada products tidak akan langsung error dan penambahan respon API untuk Menambahkan pengecekan apakah respons adalah array dengan menggunakan Array.isArray.

# Validasi Permintaan

## Tambah Produk:

title: Wajib, string tidak boleh kosong.
description: Wajib, string tidak boleh kosong.
price: Wajib, angka positif.
image: Wajib, URL valid.
Perbarui Produk:

## Menggunakan aturan validasi yang sama seperti update produk produk.

# API

Aplikasi ini terintegrasi dengan endpoint API berikut:

Get Products: Mendapatkan daftar produk dengan pagination dan pencarian.
GET https://611a1a2fcbf1b30017eb54c1.mockapi.io/products?page={page}&limit={limit}&search={query}

Get Product Detail: Mendapatkan detail produk berdasarkan ID.
GET https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/{id}

Add Product: Menambahkan produk baru ke katalog.
POST https://611a1a2fcbf1b30017eb54c1.mockapi.io/products

Update Product: Memperbarui informasi produk berdasarkan ID.
PUT https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/{id}

Delete Product: Menghapus produk berdasarkan ID.
DELETE https://611a1a2fcbf1b30017eb54c1.mockapi.io/products/{id}

# Dependensi

React: Library JavaScript untuk membangun antarmuka pengguna.
React Bootstrap: Menyediakan komponen Bootstrap untuk React.
Bootstrap: Framework front-end untuk mengembangkan aplikasi web responsif.
