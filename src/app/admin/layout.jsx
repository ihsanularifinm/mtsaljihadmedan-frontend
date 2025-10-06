'use client'; // WAJIB: karena layout ini sekarang punya state (useState)

import { useState } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({ children }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex bg-gray-50 min-h-screen">
			{/* Sidebar yang sekarang bisa di-toggle */}
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/* Header Admin yang berisi tombol hamburger (hanya tampil di mobile) */}
				<AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

				{/* Konten Utama (halaman-halaman admin) */}
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
