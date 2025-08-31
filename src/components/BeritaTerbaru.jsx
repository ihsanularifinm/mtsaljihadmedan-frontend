import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function BeritaTerbaru() {
	const [berita, setBerita] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchBeritaTerbaru = async () => {
			try {
				// Panggil API dengan parameter limit=3
				const response = await axios.get('http://localhost:5000/api/berita?limit=3');
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
					<h2 className="text-3xl font-bold text-primary mb-12">Berita Terbaru</h2>
					<p>Memuat berita...</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-16">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center text-primary mb-12">Berita Terbaru</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{berita.map((item) => (
						<div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
							<img src={`http://localhost:5000/images/${item.gambar}`} alt={item.judul} className="w-full h-48 object-cover" />
							<div className="p-6 flex flex-col flex-grow">
								<p className="text-sm text-gray-500">{new Date(item.tanggal_terbit).toLocaleDateString('id-ID')}</p>
								<h3 className="font-bold text-lg mb-2 text-primary flex-grow">{item.judul}</h3>
								<p className="text-gray-700 mb-4 text-sm">{item.isi.substring(0, 100)}...</p>
								<Link to={`/berita/${item._id}`} className="font-semibold text-accent hover:text-orange-700 mt-auto self-start">
									Baca Selengkapnya →
								</Link>
							</div>
						</div>
					))}
				</div>
				<div className="text-center mt-12">
					<Link to="/berita" className="btn-accent font-bold py-2 px-6 rounded-full">
						Lihat Semua Berita
					</Link>
				</div>
			</div>
		</section>
	);
}

export default BeritaTerbaru;
