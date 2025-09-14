# Frontend - Website MTs Al-Jihad Medan

Ini adalah frontend untuk website Sistem Informasi Sekolah MTs Al-Jihad Medan. Dibangun menggunakan React (Vite) dan mengonsumsi data dari backend API terpisah.

## Teknologi yang Digunakan

- **React**: Library JavaScript untuk membangun antarmuka pengguna.
- **Vite**: Alat build modern untuk pengembangan frontend yang cepat.
- **Tailwind CSS v4**: Framework CSS untuk styling.
- **React Router DOM**: Untuk navigasi dan routing halaman.
- **Axios**: Untuk melakukan permintaan HTTP ke backend API.
- **React Helmet Async**: Untuk mengelola title dan meta tag di setiap halaman.
- **React Context API**: Untuk manajemen state global (status login).
- **yet-another-react-lightbox**: Untuk fungsionalitas galeri foto.
- **react-google-recaptcha**: Untuk menampilkan widget verifikasi reCAPTCHA.

## Fitur

- Tampilan publik yang sepenuhnya dinamis.
- Dasbor admin yang dilindungi dengan sistem login.
- Formulir Pendaftaran dan Kontak yang diamankan dengan reCAPTCHA.
- Fungsionalitas CRUD di sisi admin untuk mengelola semua konten website.
- Struktur berbasis komponen yang mudah dipelihara dan responsif.

## Setup & Instalasi Lokal

1.  Clone repository ini.
2.  Jalankan `npm install` (atau `npm install --legacy-peer-deps`) untuk menginstal dependencies.
3.  Buat file `.env.development` dan `.env.production`. Contoh:
    - **`.env.development`**:
      ```
      VITE_API_URL=http://localhost:5000
      VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
      ```
    - **`.env.production`**:
      ```
      VITE_API_URL=[https://mtsaljihadmedan.sch.id](https://mtsaljihadmedan.sch.id)
      VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
      ```
4.  Jalankan server development dengan `npm run dev`.
5.  Aplikasi akan berjalan di `http://localhost:5173`.
