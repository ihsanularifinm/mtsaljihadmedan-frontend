import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Berita() {
	const [beritaList, setBeritaList] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSemuaBerita = async () => {
			try {
				// Panggil API untuk mengambil SEMUA berita
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/berita`);
				setBeritaList(response.data);
			} catch (err) {
				setError('Gagal mengambil data berita.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchSemuaBerita();
	}, []);

	if (loading) return <div className="text-center p-8">Memuat berita...</div>;
	if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Berita - MTs Al-Jihad Medan</title>
				<meta name="description" content="Ikuti berita, pengumuman, dan informasi kegiatan terbaru dari MTs Al-Jihad Medan. Jangan lewatkan update dari prestasi siswa dan acara sekolah." />
			</Helmet>

			<h1 className="text-4xl font-bold text-center text-blue-800/92 mb-12">Berita & Informasi Sekolah</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{beritaList.map((item) => (
					<div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
						<img src={`/images/placeholder.jpg`} alt={item.judul} className="w-full h-48 object-cover" />
						<div className="p-6 flex flex-col flex-grow">
							<p className="text-sm text-gray-500">{new Date(item.tanggal_terbit).toLocaleDateString('id-ID')}</p>
							<h3 className="font-bold text-lg mb-2 text-blue-800/92 flex-grow mt-1">{item.judul}</h3>
							<p className="text-gray-700 mb-4 text-sm">{item.isi.substring(0, 100)}...</p>
							<Link to={`/berita/${item._id}`} className="font-semibold text-amber-500 hover:text-amber-700 mt-auto self-start">
								Baca Selengkapnya →
							</Link>
						</div>
					</div>
				))}
			</div>
		</main>
	);
}

export default Berita;
