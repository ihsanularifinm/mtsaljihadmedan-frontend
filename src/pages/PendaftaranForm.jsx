import { useState, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import ReCAPTCHA from 'react-google-recaptcha';

function PendaftaranForm() {
	// State untuk menampung data dari setiap input
	const [formData, setFormData] = useState({
		nama_lengkap: '',
		nisn: '',
		asal_sekolah: '',
		nama_wali: '',
		kontak_wali: '',
	});

	// State untuk menampilkan pesan ke pengguna
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	// Fungsi yang berjalan setiap kali ada perubahan di input form
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Fungsi yang berjalan saat tombol submit diklik
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('Mengirim data...');
		setError('');

		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pendaftar`, { ...formData, recaptchaToken });

			setMessage(response.data.message);
			setFormData({
				nama_lengkap: '',
				nisn: '',
				asal_sekolah: '',
				nama_wali: '',
				kontak_wali: '',
			});
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		} catch (err) {
			// Jika gagal, tampilkan pesan error dari API
			setError(err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran.');
			setMessage('');
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		}
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Pendaftaran Siswa Baru - MTs Al-Jihad Medan</title>
			</Helmet>
			<h1 className="text-4xl font-bold text-center text-blue-800/94 mb-8">Formulir Pendaftaran Siswa Baru</h1>

			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700">
								Nama Lengkap Siswa
							</label>
							<input type="text" name="nama_lengkap" id="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
						</div>
						<div>
							<label htmlFor="nisn" className="block text-sm font-medium text-gray-700">
								NISN
							</label>
							<input type="text" name="nisn" id="nisn" value={formData.nisn} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
						</div>
					</div>
					<div>
						<label htmlFor="asal_sekolah" className="block text-sm font-medium text-gray-700">
							Asal Sekolah (SD/MI)
						</label>
						<input type="text" name="asal_sekolah" id="asal_sekolah" value={formData.asal_sekolah} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="nama_wali" className="block text-sm font-medium text-gray-700">
								Nama Orang Tua/Wali
							</label>
							<input type="text" name="nama_wali" id="nama_wali" value={formData.nama_wali} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
						</div>
						<div>
							<label htmlFor="kontak_wali" className="block text-sm font-medium text-gray-700">
								Nomor Telepon/WA Wali
							</label>
							<input type="text" name="kontak_wali" id="kontak_wali" value={formData.kontak_wali} onChange={handleChange} className="mt-1 w-full p-2 border border-gray-300 rounded-md" required />
						</div>
					</div>
					<ReCAPTCHA ref={recaptchaRef} sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY} onChange={(token) => setRecaptchaToken(token)} onExpired={() => setRecaptchaToken(null)} />
					{/* Tampilkan pesan sukses atau error */}
					{message && <div className="p-4 bg-green-100 text-green-800 rounded-md">{message}</div>}
					{error && <div className="p-4 bg-red-100 text-red-800 rounded-md">{error}</div>}

					<div>
						<button type="submit" disabled={!recaptchaToken} className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
							Kirim Formulir Pendaftaran
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
export default PendaftaranForm;
