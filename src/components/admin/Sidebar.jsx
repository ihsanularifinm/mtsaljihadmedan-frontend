'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
	const pathname = usePathname();

	const navLinkClass = (path) => {
		return pathname === path ? 'flex items-center p-2 text-gray-900 rounded-lg bg-blue-100 text-blue-800' : 'flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100';
	};

	return (
		<>
			{/* Overlay untuk latar belakang gelap saat sidebar terbuka di mobile */}
			<div className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} aria-hidden="true" onClick={() => setSidebarOpen(false)}></div>

			{/* Sidebar */}
			<aside className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white shadow-md transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
				<div className="p-4 border-b">
					<Link href="/admin" className="flex items-center space-x-3">
						<img src="/logo.png" className="h-8" alt="Logo" />
						<span className="text-xl font-semibold text-gray-800">Admin Dasbor</span>
					</Link>
				</div>
				<nav className="p-4">
					<ul className="space-y-2">
						<li>
							<Link href="/admin" className={navLinkClass('/admin')}>
								<span>Dasbor</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/profil" className={navLinkClass('/admin/profil')}>
								<span>Kelola Profil</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/akademik" className={navLinkClass('/admin/akademik')}>
								<span>Kelola Akademik</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/berita" className={navLinkClass('/admin/berita')}>
								<span>Kelola Berita</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/galeri" className={navLinkClass('/admin/galeri')}>
								<span>Kelola Galeri</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/pendaftar" className={navLinkClass('/admin/pendaftar')}>
								<span>Pendaftar PPDB</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/pesan" className={navLinkClass('/admin/pesan')}>
								<span>Lihat Pesan</span>
							</Link>
						</li>
						<li className="pt-4 mt-4 border-t">
							<button onClick={() => signOut({ callbackUrl: '/login' })} className="w-full flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
								<span>Keluar</span>
							</button>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	);
}
