import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';

// Halaman Publik
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';
import Galeri from './pages/Galeri';
import Akademik from './pages/Akademik';
import Pendaftaran from './pages/Pendaftaran';

// Halaman Admin
import Dasbor from './components/admin/Dasbor';
import KelolaProfil from './pages/admin/KelolaProfil';
import KelolaGaleri from './pages/admin/KelolaGaleri';
import KelolaAlbumDetail from './pages/admin/KelolaAlbumDetail';
import KelolaAkademik from './pages/admin/KelolaAkademik';
import LihatPendaftar from './pages/admin/LihatPendaftar';

function App() {
	return (
		<Router>
			<Routes>
				{/* Grup Rute Publik */}
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<Beranda />} />
					<Route path="profil" element={<Profil />} />
					<Route path="berita" element={<Berita />} />
					<Route path="berita/:id" element={<DetailBerita />} />
					<Route path="galeri" element={<Galeri />} />
					<Route path="akademik" element={<Akademik />} />
					<Route path="pendaftaran" element={<Pendaftaran />} />
				</Route>

				{/* Grup Rute Admin */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dasbor />} />
					<Route path="profil" element={<KelolaProfil />} />
					<Route path="galeri" element={<KelolaGaleri />} />
					<Route path="galeri/:id" element={<KelolaAlbumDetail />} />
					<Route path="akademik" element={<KelolaAkademik />} />
					<Route path="/admin" element={<AdminLayout />}></Route>
					<Route path="pendaftar" element={<LihatPendaftar />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
