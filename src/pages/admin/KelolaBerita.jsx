import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function KelolaBerita() {
	const [beritaList, setBeritaList] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchBerita = async () => {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/berita`);
			setBeritaList(data);
		} catch (error) {
			console.error('Gagal mengambil data berita:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBerita();
	}, []);

	const handleDelete = async (id) => {
		if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
			try {
				await axios.delete(`${import.meta.env.VITE_API_URL}/api/berita/${id}`);
				// Refresh data setelah berhasil menghapus
				fetchBerita();
			} catch (error) {
				console.error('Gagal menghapus berita:', error);
				alert('Gagal menghapus berita.');
			}
		}
	};

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Kelola Berita - Admin Dasbor</title>
			</Helmet>

			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold text-gray-800">Kelola Berita</h1>
				<Link to="/admin/berita/tambah" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					+ Tambah Berita Baru
				</Link>
			</div>

			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
				{loading ? (
					<p className="p-4 text-center">Memuat data...</p>
				) : (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul Artikel</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Terbit</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Aksi</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{beritaList.length > 0 ? (
								beritaList.map((berita) => (
									<tr key={berita._id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{berita.judul}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(berita.tanggal_terbit).toLocaleDateString('id-ID')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<Link to={`/admin/berita/edit/${berita._id}`} className="text-indigo-600 hover:text-indigo-900">
												Edit
											</Link>
											<button onClick={() => handleDelete(berita._id)} className="text-red-600 hover:text-red-900 ml-4">
												Hapus
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="3" className="text-center py-4">
										Belum ada data berita.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}

export default KelolaBerita;
