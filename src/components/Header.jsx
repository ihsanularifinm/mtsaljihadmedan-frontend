import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinkClass = ({ isActive }) =>
		isActive
			? 'text-blue-800 font-semibold' // Kelas untuk link aktif
			: 'text-gray-600 hover:text-primary'; // Kelas untuk link tidak aktif

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-2 flex justify-between items-center">
				<Link to="/" className="flex items-center space-x-3">
					<img src="/logo.png" className="h-10" alt="Logo MTs Al-Jihad" />
					<span className="self-center text-xl font-semibold whitespace-nowrap text-primary">MTs Al-Jihad</span>
				</Link>
				<div className="hidden md:flex space-x-6 items-center">
					<NavLink to="/" className={navLinkClass}>
						Beranda
					</NavLink>
					<NavLink to="/profil" className={navLinkClass}>
						Profil
					</NavLink>
					<NavLink to="/akademik" className={navLinkClass}>
						Akademik
					</NavLink>
					<NavLink to="/pendaftaran" className={navLinkClass}>
						Pendaftaran
					</NavLink>
					<NavLink to="/galeri" className={navLinkClass}>
						Galeri
					</NavLink>
					<NavLink to="/berita" className={navLinkClass}>
						Berita
					</NavLink>
					<NavLink to="/kontak" className={navLinkClass}>
						Kontak
					</NavLink>
				</div>
				<button id="menu-btn" className="md:hidden text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
					</svg>
				</button>
			</nav>
			{/* Mobile Menu */}
			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
				<Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
					Beranda
				</Link>
				<Link to="/profil" className="block py-2 px-4 text-sm hover:bg-gray-200">
					Profil
				</Link>
				{/* Tambahkan link mobile lainnya di sini */}
				<Link to="/kontak" className="block py-2 px-4 text-sm hover:bg-gray-200">
					Kontak
				</Link>
			</div>
		</header>
	);
}

export default Header;
