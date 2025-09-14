import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

function Galeri() {
	const [albums, setAlbums] = useState([]);
	const [fotos, setFotos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState(null);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const fetchGaleri = async () => {
			try {
				const resAlbums = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album`);
				const allFotos = [];
				for (const album of resAlbums.data) {
					const resFotos = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album/${album._id}`);
					allFotos.push(...resFotos.data.fotos);
				}
				setAlbums(resAlbums.data);
				setFotos(allFotos);
				if (resAlbums.data.length > 0) setActiveTab(resAlbums.data[0]._id);
			} catch (error) {
				console.error('Gagal mengambil data galeri', error);
			} finally {
				setLoading(false);
			}
		};
		fetchGaleri();
	}, []);

	const activeFotos = fotos.filter((foto) => foto.id_album === activeTab);
	const slides = activeFotos.map((foto) => ({
		src: `${import.meta.env.VITE_API_URL}/uploads/${foto.nama_file}`,
	}));

	if (loading) return <div className="text-center p-8">Memuat galeri...</div>;

	return (
		<>
			<main className="container mx-auto px-6 py-12">
				<Helmet>
					<title>Galeri - MTs Al-Jihad Medan</title>
				</Helmet>

				<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Galeri Foto Sekolah</h1>

				{albums.length > 0 ? (
					<>
						<div className="mb-4 border-b border-gray-200">
							<div className="-mb-px flex flex-wrap" id="tab-buttons">
								{albums.map((album) => (
									<button key={album._id} onClick={() => setActiveTab(album._id)} className={`px-4 py-2 font-semibold rounded-t-lg transition-colors duration-300 ${activeTab === album._id ? 'bg-blue-800 text-white' : 'text-gray-600 hover:bg-blue-100'}`}>
										{album.nama_album}
									</button>
								))}
							</div>
						</div>

						<div id="tab-content">
							{activeFotos.length > 0 ? (
								<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
									{activeFotos.map((foto, fotoIndex) => (
										<div
											key={foto._id}
											className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
											onClick={() => {
												setIndex(fotoIndex);
												setOpen(true);
											}}
										>
											<img src={`${import.meta.env.VITE_API_URL}/uploads/${foto.nama_file}`} alt="Foto di album" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
										</div>
									))}
								</div>
							) : (
								<div className="text-center py-16 px-6 bg-gray-50 rounded-b-lg rounded-tr-lg">
									<p className="text-gray-500 text-lg">Belum ada foto di dalam album ini.</p>
								</div>
							)}
						</div>
					</>
				) : (
					<p className="text-center text-gray-500 mt-16">Belum ada album yang dibuat.</p>
				)}
				<Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} plugins={[Thumbnails]} />
			</main>
		</>
	);
}

export default Galeri;
