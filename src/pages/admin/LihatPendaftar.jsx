import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function LihatPendaftar() {
	const [pendaftarList, setPendaftarList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPendaftar = async () => {
			try {
				const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/pendaftar`);
				setPendaftarList(data);
			} catch (error) {
				console.error('Gagal mengambil data pendaftar:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchPendaftar();
	}, []);

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Data Pendaftar PPDB - Admin Dasbor</title>
			</Helmet>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Data Pendaftar Siswa Baru</h1>

			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
				{loading ? (
					<p className="p-4 text-center">Memuat data...</p>
				) : (
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Daftar</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama Lengkap</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NISN</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Asal Sekolah</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kontak Wali</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{pendaftarList.length > 0 ? (
								pendaftarList.map((pendaftar) => (
									<tr key={pendaftar._id}>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(pendaftar.tanggal_daftar).toLocaleDateString('id-ID')}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pendaftar.nama_lengkap}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pendaftar.nisn}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pendaftar.asal_sekolah}</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pendaftar.kontak_wali}</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${pendaftar.status === 'Baru' ? 'bg-blue-100 text-blue-800' : pendaftar.status === 'Diterima' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{pendaftar.status}</span>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="6" className="text-center py-4">
										Belum ada data pendaftar.
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

export default LihatPendaftar;
