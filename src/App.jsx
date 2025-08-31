import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Beranda from './pages/Beranda';
import Berita from './pages/Berita'; // 1. Impor halaman Berita
import DetailBerita from './pages/DetailBerita'; // 2. Impor halaman DetailBerita

function App() {
	return (
		<Router>
			<div className="flex flex-col min-h-screen">
				<Header />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Beranda />} />
						{/* 3. Daftarkan rute baru */}
						<Route path="/berita" element={<Berita />} />
						<Route path="/berita/:id" element={<DetailBerita />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
