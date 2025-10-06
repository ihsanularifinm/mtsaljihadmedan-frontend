'use client'; // WAJIB

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// Fungsi untuk mengambil data (digunakan oleh Tanstack Query)
const fetchGaleriData = async () => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;
	const resAlbums = await axios.get(`${apiUrl}/api/galeri/album`);
	const albums = resAlbums.data;

	const fotoPromises = albums.map((album) => axios.get(`${apiUrl}/api/galeri/album/${album._id}`));
	const fotoResponses = await Promise.all(fotoPromises);
	const allFotos = fotoResponses.flatMap((res) => res.data.fotos);

	return { albums, fotos: allFotos };
};

export default function GaleriClient({ initialData }) {
	// Gunakan useQuery, tapi berikan 'initialData' dari server sebagai data awal
	const {
		data: galeriData,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['galeriPublik'], // Kunci unik
		queryFn: fetchGaleriData,
		initialData: initialData,
	});

	// State untuk interaktivitas UI tetap di sini
	const [activeTab, setActiveTab] = useState(null);
	const [open, setOpen] = useState(false);
	const [index, setIndex] = useState(0);

	// Set tab aktif saat data pertama kali dimuat
	useEffect(() => {
		if (galeriData?.albums && galeriData.albums.length > 0 && !activeTab) {
			setActiveTab(galeriData.albums[0]._id);
		}
	}, [galeriData, activeTab]);

	if (isLoading) return <p className="text-center">Memuat galeri...</p>;
	if (isError) return <p className="text-center text-red-500">Gagal memuat data: {error.message}</p>;

	const { albums, fotos } = galeriData || { albums: [], fotos: [] };

	const activeFotos = fotos.filter((foto) => foto.id_album === activeTab);
	const slides = activeFotos.map((foto) => ({ src: foto.nama_file }));

	return (
		<>
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
						{albums.map((album) => {
							const fotoDiAlbumIni = album._id === activeTab ? activeFotos : [];

							return (
								<div key={album._id} className={activeTab === album._id ? 'block' : 'hidden'}>
									{fotoDiAlbumIni.length > 0 ? (
										<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
											{fotoDiAlbumIni.map((foto, fotoIndex) => (
												<div
													key={foto._id}
													className="bg-white rounded-lg shadow-md overflow-hidden group cursor-pointer"
													onClick={() => {
														setIndex(fotoIndex);
														setOpen(true);
													}}
												>
													{/* === PERBAIKAN 2 DI SINI === */}
													<img
														src={foto.nama_file} // Langsung gunakan URL dari database
														alt="Foto di album"
														className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
													/>
												</div>
											))}
										</div>
									) : (
										<div className="text-center py-16 px-6 bg-gray-50 rounded-b-lg rounded-tr-lg">
											<p className="text-gray-500 text-lg">Belum ada foto di dalam album ini.</p>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</>
			) : (
				<p className="text-center text-gray-500 mt-16">Belum ada album yang dibuat.</p>
			)}

			<Lightbox open={open} close={() => setOpen(false)} slides={slides} index={index} plugins={[Thumbnails]} styles={{ backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.85)' } }} />
		</>
	);
}
