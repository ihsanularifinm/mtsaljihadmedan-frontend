import { useState, useRef } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import ReCAPTCHA from 'react-google-recaptcha';

function Kontak() {
	const [formData, setFormData] = useState({
		nama_lengkap: '',
		email: '',
		subjek: '',
		isi_pesan: '',
	});
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('Mengirim pesan...');
		setError('');
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pesan`, { ...formData, recaptchaToken });
			setMessage(response.data.message);
			setFormData({ nama_lengkap: '', email: '', subjek: '', isi_pesan: '' });
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		} catch (err) {
			setError(err.response?.data?.message || 'Gagal mengirim pesan.');
			setMessage('');
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		}
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Hubungi Kami - MTs Al-Jihad Medan</title>
				<meta name="description" content="Hubungi MTs Al-Jihad Medan melalui telepon, email, atau kunjungi kami langsung. Temukan alamat dan lokasi kami di peta." />
			</Helmet>
			<h1 className="text-4xl font-bold text-center text-blue-800/94 mb-12">Hubungi Kami</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-bold text-amber-500 mb-4">Informasi Kontak</h2>
						<div className="space-y-3 text-gray-700">
							<p>
								<strong>Alamat:</strong>
								<br />
								JL. Mesjid No. 33-A, Kel. Indra Kasih, Kec. Medan Tembung, Kota Medan, Sumatera Utara, 20221
							</p>
							<p>
								<strong>Telepon:</strong>
								<br />
								<a href="tel:06144031004" className="text-blue-800 hover:underline">
									061 44031004
								</a>
							</p>
							<p>
								<strong>Email:</strong>
								<br />{' '}
								<a href="mailto:mtssaljihadmedan@gmail.com" className="text-blue-800 hover:underline">
									mtssaljihadmedan@gmail.com
								</a>
							</p>
							<p>
								<strong>Instagram:</strong>
								<br />{' '}
								<a href="https://www.instagram.com/mtsaljihadmedan" rel="noopener noreferrer" className="text-blue-800 hover:underline">
									@mtsaljihadmedan
								</a>
							</p>
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-amber-500 mb-4">Lokasi Kami</h2>
						<div class="rounded-md overflow-hidden">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1456.6402304512299!2d98.70600200591302!3d3.6231765810391785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031331d39d65bad%3A0x33e398d0639d9ec5!2sMTs%20Al-Jihad%20Medan!5e1!3m2!1sid!2sid!4v1752911076849!5m2!1sid!2sid" class="w-full h-80 border-0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
								{' '}
							</iframe>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-amber-500 mb-4">Kirimkan Pesan</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-700">
								Nama Lengkap
							</label>
							<input type="text" name="nama_lengkap" value={formData.nama_lengkap} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
								Alamat Email
							</label>
							<input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
						</div>
						<div>
							<label htmlFor="subjek" className="block mb-2 text-sm font-medium text-gray-700">
								Subjek
							</label>
							<input type="text" name="subjek" value={formData.subjek} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" required />
						</div>
						<div>
							<label htmlFor="isi_pesan" className="block mb-2 text-sm font-medium text-gray-700">
								Isi Pesan
							</label>
							<textarea name="isi_pesan" value={formData.isi_pesan} onChange={handleChange} rows="5" className="w-full p-2 border border-gray-300 rounded-md" required></textarea>
						</div>
						<ReCAPTCHA
							ref={recaptchaRef}
							sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
							onChange={(token) => setRecaptchaToken(token)}
							onExpired={() => setRecaptchaToken(null)} // Tambahan: handle jika token kadaluarsa
						/>
						{message && <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">{message}</div>}
						{error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}
						<div>
							<button type="submit" disabled={!recaptchaToken} className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed">
								Kirim Pesan
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
export default Kontak;
