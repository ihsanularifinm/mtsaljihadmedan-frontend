'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Skema validasi dengan Yup
const schema = yup.object().shape({
	nama_lengkap: yup.string().required('Nama lengkap wajib diisi'),
	email: yup.string().email('Format email tidak valid').required('Email wajib diisi'),
	subjek: yup.string().required('Subjek wajib diisi'),
	isi_pesan: yup.string().required('Isi pesan wajib diisi'),
});

function KontakPage() {
	const [serverMessage, setServerMessage] = useState('');
	const [serverError, setServerError] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	// Inisialisasi React Hook Form
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	// Fungsi onSubmit yang baru
	const onSubmit = async (data) => {
		setServerMessage('Mengirim pesan...');
		setServerError('');
		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/pesan`, { ...data, recaptchaToken });

			setServerMessage(response.data.message);
			reset(); // Mengosongkan form
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		} catch (err) {
			setServerError(err.response?.data?.message || 'Gagal mengirim pesan.');
			setServerMessage('');
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		}
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Hubungi Kami</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-lg shadow-lg">
				<div className="space-y-6">
					<div>
						<h2 className="text-2xl font-bold text-amber-500 mb-4">Informasi Kontak</h2>
						<div className="space-y-3 text-gray-700">
							<p>
								<strong>Alamat:</strong>
								<br />
								JL. Mesjid No. 33-A, Kel. Indra Kasih, Kec. Medan Tembung...
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
								<br />
								<a href="mailto:mtssaljihadmedan@gmail.com" className="text-blue-800 hover:underline">
									mtssaljihadmedan@gmail.com
								</a>
							</p>
							<p>
								<strong>Instagram:</strong>
								<br />
								<a href="https://www.instagram.com/mtsaljihadmedan" rel="noopener noreferrer" className="text-blue-800 hover:underline">
									@mtsaljihadmedan
								</a>
							</p>
						</div>
					</div>
					<div>
						<h2 className="text-2xl font-bold text-amber-500 mb-4">Lokasi Kami</h2>
						<div className="rounded-md overflow-hidden">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1456.6402304512299!2d98.70600200591302!3d3.6231765810391785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031331d39d65bad%3A0x33e398d0639d9ec5!2sMTs%20Al-Jihad%20Medan!5e1!3m2!1sid!2sid!4v1752911076849!5m2!1sid!2sid" className="w-full h-80 border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
						</div>
					</div>
				</div>
				<div>
					<h2 className="text-2xl font-bold text-amber-500 mb-4">Kirimkan Pesan</h2>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label htmlFor="nama_lengkap" className="block mb-2 text-sm font-medium text-gray-700">
								Nama Lengkap
							</label>
							<input type="text" {...register('nama_lengkap')} className="w-full p-2 border border-gray-300 rounded-md" />
							{errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap.message}</p>}
						</div>
						<div>
							<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
								Alamat Email
							</label>
							<input type="email" {...register('email')} className="w-full p-2 border border-gray-300 rounded-md" />
							{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
						</div>
						<div>
							<label htmlFor="subjek" className="block mb-2 text-sm font-medium text-gray-700">
								Subjek
							</label>
							<input type="text" {...register('subjek')} className="w-full p-2 border border-gray-300 rounded-md" />
							{errors.subjek && <p className="text-red-500 text-sm mt-1">{errors.subjek.message}</p>}
						</div>
						<div>
							<label htmlFor="isi_pesan" className="block mb-2 text-sm font-medium text-gray-700">
								Isi Pesan
							</label>
							<textarea {...register('isi_pesan')} rows="5" className="w-full p-2 border border-gray-300 rounded-md"></textarea>
							{errors.isi_pesan && <p className="text-red-500 text-sm mt-1">{errors.isi_pesan.message}</p>}
						</div>
						<ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={(token) => setRecaptchaToken(token)} onExpired={() => setRecaptchaToken(null)} />
						{serverMessage && <div className="p-3 bg-green-100 text-green-800 rounded-md text-sm">{serverMessage}</div>}
						{serverError && <div className="p-3 bg-red-100 text-red-800 rounded-md text-sm">{serverError}</div>}
						<div>
							<button type="submit" disabled={!recaptchaToken} className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-600 ...">
								Kirim Pesan
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
export default KontakPage;
