import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function KelolaAkademik() {
	const [formData, setFormData] = useState({
		kurikulum: '',
		program_unggulan: '',
		ekstrakurikuler: '',
	});
	const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchAkademik = async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/akademik`);
			if (data) setFormData(data);
		};
		fetchAkademik();
	}, []);

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('Menyimpan...');
		await axios.put(`${import.meta.env.VITE_API_URL}/api/akademik`, formData);
		setMessage('Data akademik berhasil diperbarui!');
		setTimeout(() => setMessage(''), 3000);
	};

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Kelola Halaman Akademik - Admin Dasbor</title>
			</Helmet>
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Halaman Akademik</h1>
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
				<div>
					<label htmlFor="kurikulum" className="block text-xl font-medium text-gray-700 mb-2">
						Kurikulum
					</label>
					<textarea name="kurikulum" rows="5" value={formData.kurikulum} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
				</div>
				<div>
					<label htmlFor="program_unggulan" className="block text-xl font-medium text-gray-700 mb-2">
						Program Unggulan
					</label>
					<textarea name="program_unggulan" rows="8" value={formData.program_unggulan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
					<p className="text-sm text-gray-500 mt-1">Tips: Gunakan '*' di awal baris untuk membuat daftar poin.</p>
				</div>
				<div>
					<label htmlFor="ekstrakurikuler" className="block text-xl font-medium text-gray-700 mb-2">
						Ekstrakurikuler
					</label>
					<textarea name="ekstrakurikuler" rows="8" value={formData.ekstrakurikuler} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
					<p className="text-sm text-gray-500 mt-1">Tips: Pisahkan setiap item dengan koma, contoh: OSIS, Pramuka, Futsal</p>
				</div>
				<div className="flex items-center justify-end">
					{message && <p className="mr-4 text-gray-600">{message}</p>}
					<button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
						Simpan Perubahan
					</button>
				</div>
			</form>
		</div>
	);
}
export default KelolaAkademik;
