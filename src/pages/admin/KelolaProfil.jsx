import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function KelolaProfil() {
	// State untuk menyimpan data form
	const [formData, setFormData] = useState({
		sejarah: '',
		visi: '',
		misi: '',
	});
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState(''); // Untuk pesan sukses/error

	// Mengambil data profil saat komponen dimuat
	useEffect(() => {
		const fetchProfil = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/profil');
				setFormData(response.data); // Isi form dengan data dari database
			} catch (error) {
				console.error('Gagal mengambil data profil', error);
				setMessage('Gagal memuat data profil.');
			} finally {
				setLoading(false);
			}
		};
		fetchProfil();
	}, []);

	// Fungsi untuk menangani perubahan pada input form
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Fungsi untuk menangani submit form
	const handleSubmit = async (e) => {
		e.preventDefault(); // Mencegah refresh halaman
		setMessage('Menyimpan...');
		try {
			// Kirim data yang diubah ke API backend dengan metode PUT
			await axios.put('http://localhost:5000/api/profil', formData);
			setMessage('Data profil berhasil diperbarui!');
			// Hapus pesan setelah 3 detik
			setTimeout(() => setMessage(''), 3000);
		} catch (error) {
			console.error('Gagal mengupdate data profil', error);
			setMessage('Gagal memperbarui data.');
		}
	};

	if (loading) return <div className="p-8">Memuat data...</div>;

	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Kelola Halaman Profil - Admin Dasbor</title>
			</Helmet>

			<h1 className="text-3xl font-bold text-gray-800 mb-6">Kelola Halaman Profil</h1>

			<div className="bg-white p-8 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit}>
					<div className="mb-6">
						<label htmlFor="sejarah" className="block text-xl font-medium text-gray-700 mb-2">
							Sejarah Singkat
						</label>
						<textarea id="sejarah" name="sejarah" rows="8" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" value={formData.sejarah} onChange={handleChange}></textarea>
					</div>

					<div className="mb-6">
						<label htmlFor="visi" className="block text-xl font-medium text-gray-700 mb-2">
							Visi
						</label>
						<textarea id="visi" name="visi" rows="5" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" value={formData.visi} onChange={handleChange}></textarea>
					</div>

					<div className="mb-6">
						<label htmlFor="misi" className="block text-xl font-medium text-gray-700 mb-2">
							Misi
						</label>
						<textarea id="misi" name="misi" rows="8" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500" value={formData.misi} onChange={handleChange}></textarea>
					</div>

					<div className="flex items-center justify-end">
						{message && <p className="mr-4 text-gray-600">{message}</p>}
						<button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded">
							Simpan Perubahan
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default KelolaProfil;
