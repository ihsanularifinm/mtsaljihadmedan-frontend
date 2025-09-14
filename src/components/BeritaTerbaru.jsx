import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BeritaTerbaru() {
	// Pastikan nilai awal state adalah array kosong []
	const [berita, setBerita] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBeritaTerbaru = async () => {
			try {
				// Gunakan environment variable untuk URL API
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/berita?limit=3&_cache=${new Date().getTime()}`);
				setBerita(response.data);
			} catch (error) {
				console.error('Gagal mengambil berita terbaru:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBeritaTerbaru();
	}, []);

	if (loading) {
		return (
			<section className="py-16">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold text-blue-800/94 mb-12">Berita Terbaru</h2>
					<p>Memuat berita...</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center text-blue-800/94 mb-12">Berita Terbaru</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{/* Tambahkan pengecekan Array.isArray() untuk keamanan */}
					{Array.isArray(berita) &&
						berita.map((item) => (
							<div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
								{/* Pastikan path gambar benar, sesuaikan jika folder di backend berbeda */}
								<img src={`${import.meta.env.VITE_API_URL}/uploads/${item.gambar}`} alt={item.judul} className="w-full h-48 object-cover" />
								<div className="p-6 flex flex-col flex-grow">
									<p className="text-sm text-gray-500">{new Date(item.tanggal_terbit).toLocaleDateString('id-ID')}</p>
									<h3 className="font-bold text-lg mb-2 text-blue-800/94 flex-grow">{item.judul}</h3>
									<p className="text-gray-700 mb-4 text-sm">{item.isi.substring(0, 100)}...</p>
									<Link to={`/berita/${item._id}`} className="font-semibold text-amber-500 hover:text-amber-700 mt-auto self-start">
										Baca Selengkapnya →
									</Link>
								</div>
							</div>
						))}
				</div>
				<div className="text-center mt-12">
					<Link to="/berita" className="bg-amber-500 font-bold py-2 px-6 rounded-full text-white hover:bg-amber-600 transition-colors duration-300">
						Lihat Semua Berita
					</Link>
				</div>
			</div>
		</section>
	);
}

export default BeritaTerbaru;
