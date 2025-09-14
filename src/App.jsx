import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Halaman Publik
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';
import Galeri from './pages/Galeri';
import Akademik from './pages/Akademik';
import PendaftaranForm from './pages/PendaftaranForm';
import PendaftaranInfo from './pages/PendaftaranInfo';
import Kontak from './pages/Kontak';
import LoginPage from './pages/LoginPage';

// Halaman Admin
import Dasbor from './components/admin/Dasbor';
import KelolaProfil from './pages/admin/KelolaProfil';
import KelolaGaleri from './pages/admin/KelolaGaleri';
import KelolaAlbumDetail from './pages/admin/KelolaAlbumDetail';
import KelolaAkademik from './pages/admin/KelolaAkademik';
import LihatPendaftar from './pages/admin/LihatPendaftar';
import LihatPesan from './pages/admin/LihatPesan';
import KelolaBerita from './pages/admin/KelolaBerita';

function App() {
	return (
		<Routes>
			{/* Halaman Login berdiri sendiri */}
			<Route path="/login" element={<LoginPage />} />
			{/* Grup Rute Publik */}
			<Route path="/" element={<PublicLayout />}>
				<Route index element={<Beranda />} />
				<Route path="profil" element={<Profil />} />
				<Route path="berita" element={<Berita />} />
				<Route path="berita/:id" element={<DetailBerita />} />
				<Route path="galeri" element={<Galeri />} />
				<Route path="akademik" element={<Akademik />} />
				<Route path="pendaftaran" element={<PendaftaranInfo />} />
				<Route path="pendaftaran/form" element={<PendaftaranForm />} />
				<Route path="kontak" element={<Kontak />} />
			</Route>

			{/* Grup Rute Admin */}
			<Route element={<ProtectedRoute />}>
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dasbor />} />
					<Route path="profil" element={<KelolaProfil />} />
					<Route path="galeri" element={<KelolaGaleri />} />
					<Route path="galeri/:id" element={<KelolaAlbumDetail />} />
					<Route path="akademik" element={<KelolaAkademik />} />
					<Route path="/admin" element={<AdminLayout />}></Route>
					<Route path="pendaftar" element={<LihatPendaftar />} />
					<Route path="pesan" element={<LihatPesan />} />
					<Route path="berita" element={<KelolaBerita />} />
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
