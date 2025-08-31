import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminLayout() {
	return (
		<div className="flex bg-gray-50 min-h-screen">
			<Sidebar />
			<main className="flex-1">
				<Outlet /> {/* Konten halaman admin akan dirender di sini */}
			</main>
		</div>
	);
}

export default AdminLayout;
