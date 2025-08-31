import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import Berita from './pages/Berita';
import DetailBerita from './pages/DetailBerita';
import Profil from './pages/Profil'; // 1. Impor halaman Profil

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Beranda />} />
						<Route path="/berita" element={<Berita />} />
						<Route path="/berita/:id" element={<DetailBerita />} />
						<Route path="/profil" element={<Profil />} /> {/* 2. Daftarkan rute */}
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
