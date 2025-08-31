import { NavLink } from 'react-router-dom';

function Sidebar() {
	// Fungsi untuk styling link yang aktif
	const navLinkClass = ({ isActive }) => (isActive ? 'flex items-center p-2 text-gray-900 rounded-lg bg-blue-100 text-blue-700' : 'flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100');

	return (
		<aside className="w-64 bg-white shadow-md h-screen sticky top-0">
			<div className="p-4 border-b">
				<a href="/admin" className="flex items-center space-x-3">
					<img src="/logo.png" className="h-8" alt="Logo" />
					<span className="text-xl font-semibold text-gray-800">Admin Dasbor</span>
				</a>
			</div>
			<nav className="p-4">
				<ul className="space-y-2">
					<li>
						<NavLink to="/admin" className={navLinkClass} end>
							<span>Dasbor</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/profil" className={navLinkClass}>
							<span>Kelola Profil</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/berita" className={navLinkClass}>
							<span>Kelola Berita</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/galeri" className={navLinkClass}>
							<span>Kelola Galeri</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/admin/pendaftar" className={navLinkClass}>
							<span>Pendaftar PPDB</span>
						</NavLink>
					</li>
					<li className="pt-4 mt-4 border-t">
						<a href="/login" className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
							<span>Keluar</span>
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default Sidebar;
