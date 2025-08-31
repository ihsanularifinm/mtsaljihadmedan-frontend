import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Profil() {
	const [profilData, setProfilData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProfil = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/profil');
				setProfilData(response.data);
			} catch (error) {
				console.error('Gagal mengambil data profil', error);
			} finally {
				setLoading(false);
			}
		};
		fetchProfil();
	}, []);

	if (loading) return <div className="text-center p-8">Memuat...</div>;

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Profil Sekolah - MTs Al-Jihad Medan</title>
			</Helmet>
			<h1 className="text-4xl font-bold text-center text-primary mb-12">Profil MTs Al-Jihad</h1>

			{profilData ? (
				<>
					<section className="mb-16">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-3xl font-bold text-accent mb-4">Sejarah Singkat</h2>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">{profilData.sejarah}</p>
						</div>
					</section>

					<section className="mb-16">
						<div className="flex flex-col md:flex-row gap-8">
							<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
								<h3 className="text-2xl font-bold text-accent mb-4">Visi</h3>
								<p className="text-gray-700 whitespace-pre-line">{profilData.visi}</p>
							</div>
							<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
								<h3 className="text-2xl font-bold text-accent mb-4">Misi</h3>
								<div className="text-gray-700 whitespace-pre-line">{profilData.misi}</div>
							</div>
						</div>
					</section>
				</>
			) : (
				<p className="text-center">Data profil tidak ditemukan.</p>
			)}
		</main>
	);
}

export default Profil;
