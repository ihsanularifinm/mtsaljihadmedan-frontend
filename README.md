# Frontend - Website MTs Al-Jihad Medan

Ini adalah frontend untuk website Sistem Informasi Sekolah MTs Al-Jihad Medan. Dibangun menggunakan React (Vite) dan mengonsumsi data dari backend API terpisah.

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Vite**: Alat build modern untuk pengembangan frontend yang cepat.
- **Tailwind CSS**: Framework CSS untuk styling.
- **React Router DOM**: Untuk navigasi dan routing halaman (Single-Page Application).
- **Axios**: Untuk melakukan permintaan HTTP ke backend API.
- **React Helmet Async**: Untuk mengelola title dan meta tag di setiap halaman.
- **React Context API**: Untuk manajemen state global (status login).

## Fitur

- Tampilan publik yang sepenuhnya dinamis (Beranda, Profil, Berita, Galeri, dll).
- Dasbor admin yang dilindungi dengan sistem login.
- Fungsionalitas CRUD di sisi admin untuk mengelola semua konten website.
- Struktur berbasis komponen yang mudah dipelihara.

## Setup & Instalasi Lokal

1.  Clone repository ini.
2.  Jalankan `npm install` untuk menginstal semua dependencies.
3.  Buat file `.env.development` untuk development lokal dan `.env.production` untuk build produksi. Contoh:
    - **`.env.development`**: `VITE_API_URL=http://localhost:5000`
    - **`.env.production`**: `VITE_API_URL=https://mtsaljihadmedan.sch.id`
4.  Jalankan server development dengan `npm run dev`.
5.  Aplikasi akan berjalan di `http://localhost:5173`.
