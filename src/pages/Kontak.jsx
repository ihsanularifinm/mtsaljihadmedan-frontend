import { useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Kontak() {
	const [formData, setFormData] = useState({
		nama_lengkap: '',
		email: '',
		subjek: '',
		isi_pesan: '',
	});
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage('Mengirim pesan...');
		setError('');
		try {
			const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/pesan`, formData);
			setMessage(response.data.message);
			setFormData({ nama_lengkap: '', email: '', subjek: '', isi_pesan: '' });
		} catch (err) {
			setError(err.response?.data?.message || 'Gagal mengirim pesan.');
			setMessage('');
		}
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Hubungi Kami - MTs Al-Jihad Medan</title>
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
						<div className="rounded-md overflow-hidden">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.89061615962!2d98.70141817472096!3d3.623889149959149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131c9644f331b%3A0xe2121e42754668e2!2sMTs%20Al-Jihad%20Medan!5e0!3m2!1sen!2sid!4v1725120239537!5m2!1sen!2sid" className="w-full h-80 border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
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
						{message && <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">{message}</div>}
						{error && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">{error}</div>}
						<div>
							<button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-600 transition-colors duration-300 cursor-pointer">
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
