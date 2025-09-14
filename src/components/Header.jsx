import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinkClass = ({ isActive }) => (isActive ? 'text-blue-800 font-semibold' : 'text-gray-600 hover:text-blue-800');

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-2 flex justify-between items-center">
				<Link to="/" className="flex items-center space-x-3">
					<img src="/logo.png" className="h-10" alt="Logo MTs Al-Jihad" />
					<span className="self-center text-xl font-semibold whitespace-nowrap text-blue-800">MTs Al-Jihad</span>
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

				<button id="menu-btn" className="md:hidden text-gray-600 focus:outline-none z-50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					{isMenuOpen ? (
						// Ikon 'X' (Close)
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
						</svg>
					) : (
						// Ikon Hamburger (Open)
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
						</svg>
					)}
				</button>
			</nav>

			<div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
				<NavLink to="/" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Beranda
				</NavLink>
				<NavLink to="/profil" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Profil
				</NavLink>
				<NavLink to="/akademik" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Akademik
				</NavLink>
				<NavLink to="/pendaftaran" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Pendaftaran
				</NavLink>
				<NavLink to="/galeri" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Galeri
				</NavLink>
				<NavLink to="/berita" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Berita
				</NavLink>
				<NavLink to="/kontak" className="block py-2 px-4 text-sm hover:bg-gray-200" onClick={() => setIsMenuOpen(false)}>
					Kontak
				</NavLink>
			</div>
		</header>
	);
}

export default Header;
