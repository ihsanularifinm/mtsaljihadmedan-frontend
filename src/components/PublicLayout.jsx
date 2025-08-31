import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function PublicLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">
				{/* Konten halaman publik (Beranda, Profil, dll.) akan dirender di sini */}
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default PublicLayout;
