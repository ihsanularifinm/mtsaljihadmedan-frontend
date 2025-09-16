'use client';

import { useState } from 'react';
import Link from 'next/link'; // Gunakan Link dari next/link
import { usePathname } from 'next/navigation'; // Hook baru untuk mendapatkan path

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const pathname = usePathname(); // Hook untuk mendapatkan URL path saat ini

	// Fungsi untuk menentukan kelas link aktif
	const navLinkClass = (path) => {
		return pathname === path
			? 'text-blue-800 font-semibold' // Kelas aktif
			: 'text-gray-600 hover:text-blue-800'; // Kelas tidak aktif
	};

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-2 flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-3">
					<img src="/logo.png" className="h-10" alt="Logo MTs Al-Jihad" />
					<span className="self-center text-xl font-semibold whitespace-nowrap text-blue-800">MTs Al-Jihad</span>
				</Link>

				{/* Navigasi Desktop - Ganti semua NavLink dengan Link */}
				<div className="hidden md:flex space-x-6 items-center">
					<Link href="/" className={navLinkClass('/')}>
						Beranda
					</Link>
					<Link href="/profil" className={navLinkClass('/profil')}>
						Profil
					</Link>
					<Link href="/akademik" className={navLinkClass('/akademik')}>
						Akademik
					</Link>
					<Link href="/pendaftaran" className={navLinkClass('/pendaftaran')}>
						Pendaftaran
					</Link>
					<Link href="/galeri" className={navLinkClass('/galeri')}>
						Galeri
					</Link>
					<Link href="/berita" className={navLinkClass('/berita')}>
						Berita
					</Link>
					<Link href="/kontak" className={navLinkClass('/kontak')}>
						Kontak
					</Link>
				</div>

				{/* Tombol Hamburger (logika tetap sama) */}
				<button className="md:hidden text-gray-600 focus:outline-none z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? (
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					) : (
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					)}
				</button>
			</nav>

			{/* Menu Mobile - Ganti semua NavLink dengan Link */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
				<Link href="/" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Beranda
				</Link>
				<Link href="/profil" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Profil
				</Link>
				<Link href="/akademik" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Akademik
				</Link>
				<Link href="/pendaftaran" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Pendaftaran
				</Link>
				<Link href="/galeri" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Galeri
				</Link>
				<Link href="/berita" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Berita
				</Link>
				<Link href="/kontak" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Kontak
				</Link>
			</div>
		</header>
	);
}
export default Header;
