import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ProfilSingkat() {
	// Siapkan state untuk menampung data profil
	const [profilData, setProfilData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfil = async () => {
			try {
				// Panggil API profil
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/profil`);
				setProfilData(response.data);
			} catch (error) {
				console.error('Gagal mengambil data profil singkat', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProfil();
	}, []);

	// Tampilkan pesan loading jika data belum siap
	if (loading) {
		return (
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold text-blue-800 mb-4">Profil Madrasah</h2>
					<p>Memuat data...</p>
				</div>
			</section>
		);
	}

	return (
		<section id="profil" className="py-16 bg-gray-50">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold text-blue-800 mb-4">Profil Madrasah</h2>

				{/* Tampilkan Sejarah Singkat dari API */}
				<p className="max-w-3xl mx-auto text-gray-700 mb-8">{profilData ? profilData.sejarah_singkat : 'Data sejarah tidak ditemukan.'}</p>

				<div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Visi</h3>
						{/* Tampilkan Visi dari API */}
						<p className="text-gray-700">{profilData ? profilData.visi : 'Data visi tidak ditemukan.'}</p>
					</div>
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Misi</h3>
						{/* Tampilkan Misi dari API */}
						<p className="text-gray-700">{profilData ? profilData.misi : 'Data misi tidak ditemukan.'}</p>
					</div>
				</div>
				<Link to="/profil" className="mt-8 inline-block bg-amber-500 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300">
					Selengkapnya Tentang Kami
				</Link>
			</div>
		</section>
	);
}

export default ProfilSingkat;
