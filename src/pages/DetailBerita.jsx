import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function DetailBerita() {
	const { id } = useParams(); // Mengambil 'id' dari URL, contoh: /berita/:id
	const [berita, setBerita] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDetailBerita = async () => {
			try {
				// Panggil API untuk mengambil satu berita berdasarkan ID
				const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/berita/${id}`);
				setBerita(response.data);
			} catch (err) {
				setError('Gagal mengambil detail berita.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchDetailBerita();
	}, [id]); // `id` di dependency array agar useEffect jalan lagi jika ID berubah

	if (loading) return <div className="text-center p-8">Memuat berita...</div>;
	if (error) return <div className="text-center p-8 text-red-500">Error: {error}</div>;
	if (!berita) return <div className="text-center p-8">Berita tidak ditemukan.</div>;

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>{`${berita.judul} - MTs Al-Jihad Medan`}</title>
				<meta name="description" content={berita.isi.substring(0, 150)} />
			</Helmet>

			<article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold text-blue-800/94 mb-2">{berita.judul}</h1>
				<p className="text-md text-gray-500 mb-6">Dipublikasikan pada {new Date(berita.tanggal_terbit).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>

				<img src={`/images/placeholder.jpg`} alt={berita.judul} className="w-full h-auto max-h-96 object-cover rounded-lg mb-6" />

				<div className="prose max-w-none text-gray-800 leading-relaxed">
					{/* Di React, kita perlu mengubah newline menjadi <br> jika perlu, atau gunakan library khusus */}
					{berita.isi.split('\n').map((paragraf, index) => (
						<p key={index}>{paragraf}</p>
					))}
				</div>

				<Link to="/berita" className="inline-block mt-8 text-amber-500 font-semibold hover:underline">
					← Kembali ke Daftar Berita
				</Link>
			</article>
		</main>
	);
}

export default DetailBerita;
