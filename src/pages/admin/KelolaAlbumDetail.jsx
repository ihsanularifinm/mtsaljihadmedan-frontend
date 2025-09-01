import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function KelolaAlbumDetail() {
	const { id } = useParams(); // Ambil ID Album dari URL
	const [album, setAlbum] = useState(null);
	const [fotos, setFotos] = useState([]);
	const [selectedFiles, setSelectedFiles] = useState(null);

	const fetchData = async () => {
		const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/galeri/album/${id}`);
		setAlbum(response.data.album);
		setFotos(response.data.fotos);
	};

	useEffect(() => {
		fetchData();
	}, [id]);

	const handleFileChange = (e) => {
		setSelectedFiles(e.target.files);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('id_album', id);
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append('foto', selectedFiles[i]);
		}
		await axios.post(`${import.meta.env.VITE_API_URL}/api/galeri/foto`, formData);
		fetchData(); // Refresh daftar foto
	};

	const handleHapusFoto = async (idFoto) => {
		if (window.confirm('Yakin ingin menghapus foto ini?')) {
			await axios.delete(`${import.meta.env.VITE_API_URL}/api/galeri/foto/${idFoto}`);
			fetchData(); // Refresh daftar foto
		}
	};

	if (!album) return <div>Memuat...</div>;

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Kelola Foto: {album.nama_album}</title>
			</Helmet>
			<Link to="/admin/galeri" className="text-blue-600 hover:underline mb-6 inline-block">
				← Kembali ke Daftar Album
			</Link>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Foto: "{album.nama_album}"</h1>

			<div className="bg-white p-6 rounded-lg shadow-md mb-8">
				<form onSubmit={handleUpload}>
					<input type="file" onChange={handleFileChange} multiple required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4" />
					<button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Upload Foto
					</button>
				</form>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
				{fotos.map((foto) => (
					<div key={foto._id} className="relative group">
						<img src={`${import.meta.env.VITE_API_URL}/uploads/${foto.nama_file}`} alt="Foto" className="w-full h-40 object-cover rounded-lg shadow-md" />
						<button onClick={() => handleHapusFoto(foto._id)} className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
							Hapus
						</button>
					</div>
				))}
			</div>
		</div>
	);
}
export default KelolaAlbumDetail;
