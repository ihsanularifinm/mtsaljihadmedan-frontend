import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Galeri() {
	const [albums, setAlbums] = useState([]);
	const [fotos, setFotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(null);

	useEffect(() => {
		const fetchGaleri = async () => {
			try {
				// Ambil semua data album dan foto sekaligus
				const resAlbums = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album`);

				// Ambil semua foto (kita akan filter di frontend)
				// Di aplikasi besar, ini sebaiknya dilakukan dengan satu panggilan API
				const allFotos = [];
				for (const album of resAlbums.data) {
					const resFotos = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album/${album._id}`);
					allFotos.push(...resFotos.data.fotos);
				}

				setAlbums(resAlbums.data);
				setFotos(allFotos);

				// Set tab aktif ke album pertama jika ada
				if (resAlbums.data.length > 0) {
					setActiveTab(resAlbums.data[0]._id);
				}
			} catch (error) {
				console.error('Gagal mengambil data galeri', error);
			} finally {
				setLoading(false);
			}
		};

		fetchGaleri();
	}, []);

	if (loading) return <div className="text-center p-8">Memuat galeri...</div>;

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Galeri - MTs Al-Jihad Medan</title>
				<meta name="description" content="Dokumentasi foto kegiatan, fasilitas, dan prestasi siswa di MTs Al-Jihad Medan." />
			</Helmet>

			<h1 className="text-4xl font-bold text-center text-primary mb-12">Galeri Foto Sekolah</h1>

			{albums.length > 0 ? (
				<>
					<div className="mb-4 border-b border-gray-200">
						<div className="-mb-px flex flex-wrap" id="tab-buttons">
							{albums.map((album) => (
								<button key={album._id} onClick={() => setActiveTab(album._id)} className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === album._id ? 'bg-primary text-white' : 'text-gray-600'}`}>
									{album.nama_album}
								</button>
							))}
						</div>
					</div>

					<div id="tab-content">
						{albums.map((album) => (
							<div key={album._id} className={activeTab === album._id ? 'block' : 'hidden'}>
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{fotos
										.filter((foto) => foto.id_album === album._id)
										.map((foto) => (
											<div key={foto._id} className="bg-white rounded-lg shadow-md overflow-hidden group">
												<a href={`${import.meta.env.VITE_API_URL}/uploads/${foto.nama_file}`} target="_blank" rel="noopener noreferrer">
													<img src={`${import.meta.env.VITE_API_URL}/uploads/${foto.nama_file}`} alt="Foto di album" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
												</a>
											</div>
										))}
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<p className="text-center text-gray-500 mt-16">Belum ada album atau foto untuk ditampilkan.</p>
			)}
		</main>
	);
}

export default Galeri;
