import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function LihatPesan() {
	const [pesanList, setPesanList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get('http://localhost:5000/api/pesan')
			.then((res) => setPesanList(res.data))
			.catch((err) => console.error(err))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Pesan Masuk - Admin Dasbor</title>
			</Helmet>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Pesan Masuk</h1>
			<div className="bg-white shadow-md rounded-lg overflow-x-auto">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengirim</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subjek</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{loading ? (
							<tr>
								<td colSpan="4" className="text-center py-4">
									Memuat pesan...
								</td>
							</tr>
						) : pesanList.length > 0 ? (
							pesanList.map((pesan) => (
								<tr key={pesan._id}>
									<td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(pesan.tanggal_kirim).toLocaleString('id-ID')}</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<div className="font-medium text-gray-900">{pesan.nama_lengkap}</div>
										<div className="text-gray-500">{pesan.email}</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{pesan.subjek}</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span className="px-2 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{pesan.status}</span>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="4" className="text-center py-4">
									Tidak ada pesan masuk.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
export default LihatPesan;
