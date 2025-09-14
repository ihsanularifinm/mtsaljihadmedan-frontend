import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom'; // <<<--- BARIS YANG DIPERBAIKI

function KelolaGaleri() {
	const [albums, setAlbums] = useState([]);
	const [namaAlbumBaru, setNamaAlbumBaru] = useState('');

	const fetchAlbums = async () => {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album`);
		setAlbums(response.data);
	};

	useEffect(() => {
		fetchAlbums();
	}, []);

	const handleTambahAlbum = async (e) => {
		e.preventDefault();
		await axios.post(`${import.meta.env.VITE_API_URL}/api/galeri/album`, { nama_album: namaAlbumBaru });
		setNamaAlbumBaru('');
		fetchAlbums(); // Refresh daftar album
	};

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Kelola Galeri - Admin Dasbor</title>
			</Helmet>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Album Galeri</h1>

			<div className="bg-white p-6 rounded-lg shadow-md mb-8">
				<form onSubmit={handleTambahAlbum}>
					<div className="flex items-center space-x-4">
						<input type="text" value={namaAlbumBaru} onChange={(e) => setNamaAlbumBaru(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md" placeholder="Nama Album Baru" required />
						<button type="submit" className="bg-blue-600 hover:bg-blue-800/94 text-white font-bold py-2 px-4 rounded">
							Buat Album
						</button>
					</div>
				</form>
			</div>

			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Album</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{albums.map((album) => (
							<tr key={album._id}>
								<td className="px-6 py-4 whitespace-nowrap">{album.nama_album}</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<Link to={`/admin/galeri/${album._id}`} className="text-green-600 hover:text-green-900">
										Kelola Foto
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default KelolaGaleri;
