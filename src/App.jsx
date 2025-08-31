import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	// 1. Siapkan "wadah" (state) untuk menyimpan data berita
	const [berita, setBerita] = useState([]); // Awalnya array kosong
	const [loading, setLoading] = useState(true); // Untuk menampilkan status loading
	const [error, setError] = useState(null); // Untuk menampilkan pesan error

	// 2. Gunakan useEffect untuk menjalankan fungsi pengambilan data
	//    sekali saja saat komponen pertama kali dimuat.
	useEffect(() => {
		const fetchBerita = async () => {
			try {
				// 3. Panggil API backend kita menggunakan Axios
				const response = await axios.get('http://localhost:5000/api/berita');

				// 4. Simpan data yang diterima dari API ke dalam state 'berita'
				setBerita(response.data);
			} catch (err) {
				// Jika terjadi error, simpan pesan errornya
				setError('Gagal mengambil data dari server.');
				console.error(err);
			} finally {
				// Apapun hasilnya, hentikan status loading
				setLoading(false);
			}
		};

		fetchBerita();
	}, []); // Array kosong `[]` memastikan ini hanya berjalan sekali.

	// 5. Tampilkan konten berdasarkan kondisi state
	if (loading) {
		return <div>Memuat data berita...</div>;
	}

	if (error) {
		return <div style={{ color: 'red' }}>Error: {error}</div>;
	}

	return (
		<div style={{ padding: '2rem' }}>
			<h1>Daftar Berita MTs Al-Jihad</h1>
			<hr style={{ margin: '1rem 0' }} />

			{/* Jika tidak ada berita, tampilkan pesan */}
			{berita.length === 0 ? (
				<p>Tidak ada berita untuk ditampilkan.</p>
			) : (
				// Jika ada berita, tampilkan dalam bentuk daftar
				<ul>
					{berita.map((item) => (
						<li key={item._id} style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
							<h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{item.judul}</h2>
							<p style={{ color: '#555', fontSize: '0.8rem' }}>{new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
							<p style={{ marginTop: '0.5rem' }}>{item.isi}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
