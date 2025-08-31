import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/admin/AdminLayout';

// Halaman Publik
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';

// Halaman Admin
import Dasbor from './components/admin/Dasbor';
import KelolaProfil from './pages/admin/KelolaProfil';

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
				</Route>

				{/* Grup Rute Admin */}
				<Route path="/admin" element={<AdminLayout />}>
					<Route index element={<Dasbor />} />
					<Route path="profil" element={<KelolaProfil />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
