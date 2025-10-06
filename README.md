# Frontend - Website MTs Al-Jihad Medan (Next.js)

Ini adalah frontend untuk website Sistem Informasi Sekolah MTs Al-Jihad Medan. Dibangun menggunakan [Next.js](https://nextjs.org/) (App Router) dan mengonsumsi data dari backend API terpisah.

---

## 🚀 Teknologi yang Digunakan

- **[Next.js](https://nextjs.org/)**: Framework React untuk produksi (dengan App Router, SSR, dll).
- **[React](https://reactjs.org/)**: Library inti untuk membangun antarmuka pengguna.
- **[Tailwind CSS](https://tailwindcss.com/)**: Framework CSS untuk styling.
- **[Shadcn/ui](https://ui.shadcn.com/)**: Kumpulan komponen UI yang dibangun di atas Tailwind.
- **[Tanstack (React) Query](https://tanstack.com/query/latest)**: Untuk manajemen data server state (data fetching, caching).
- **[NextAuth.js](https://next-auth.js.org/)**: Untuk sistem otentikasi dan sesi.
- **[Axios](https://axios-http.com/)**: Untuk melakukan permintaan HTTP ke backend API.
- **[React Hook Form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup)**: Untuk manajemen dan validasi formulir.
- **[yet-another-react-lightbox](https://yet-another-react-lightbox.com/)**: Untuk fungsionalitas galeri foto.
- **[react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha)**: Untuk widget verifikasi reCAPTCHA.

---

## ✨ Fitur

- Arsitektur modern dengan **Server & Client Components**.
- Halaman publik yang **SEO-friendly** berkat Server-Side Rendering.
- Dasbor admin yang **aman dan responsif**.
- Manajemen state data yang efisien dengan **Tanstack Query**.
- Formulir publik yang aman dengan validasi **Yup** dan **reCAPTCHA**.

---

## 🛠️ Setup & Instalasi Lokal

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repository ini:**

    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER_PROYEK]
    ```

2.  **Instal dependencies:**
    Gunakan `npm` atau package manager lain pilihan Anda.

    ```bash
    npm install
    ```

3.  **Konfigurasi Environment Variables:**
    Buat file `.env.local` di direktori utama. Salin konten dari `.env.example` dan isi dengan kredensial yang sesuai.

    ```bash
    cp .env.example .env.local
    ```

    _Selanjutnya, buka ` .env.local` dan edit nilainya._

4.  **Jalankan server development:**

    ```bash
    npm run dev
    ```

5.  **Buka aplikasi:**
    Aplikasi akan berjalan dan dapat diakses di [http://localhost:3000](http://localhost:3000).
