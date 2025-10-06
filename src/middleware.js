export { default } from 'next-auth/middleware';

// Konfigurasi untuk "matcher" (pencocok rute)
export const config = {
	matcher: [
		'/admin', // Melindungi halaman dasbor utama admin
		'/admin/:path*', // Melindungi SEMUA halaman di bawah /admin (profil, galeri, dll.)
	],
};
