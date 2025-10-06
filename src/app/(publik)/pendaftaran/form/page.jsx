'use client';

import { useRef, useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
	nama_lengkap: yup.string().required('Nama lengkap wajib diisi'),
	nisn: yup.string().required('NISN wajib diisi'),
	asal_sekolah: yup.string().required('Asal sekolah wajib diisi'),
	nama_wali: yup.string().required('Nama wali wajib diisi'),
	kontak_wali: yup.string().required('Kontak wali wajib diisi'),
});

function PendaftaranFormPage() {
	const [serverMessage, setServerMessage] = useState('');
	const [serverError, setServerError] = useState('');
	const [recaptchaToken, setRecaptchaToken] = useState(null);
	const recaptchaRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema), // Hubungkan dengan skema Yup
	});

	const onSubmit = async (data) => {
		setServerMessage('Mengirim data...');
		setServerError('');

		try {
			const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/pendaftar`, { ...data, recaptchaToken });

			setServerMessage(response.data.message);
			reset(); // Fungsi dari useForm untuk mengosongkan form
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		} catch (err) {
			setServerError(err.response?.data?.message || 'Terjadi kesalahan saat pendaftaran.');
			setServerMessage('');
			recaptchaRef.current.reset();
			setRecaptchaToken(null);
		}
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Formulir Pendaftaran Siswa Baru</h1>

			<div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="nama_lengkap" className="block text-sm font-medium text-gray-700">
								Nama Lengkap Siswa
							</label>
							<input type="text" {...register('nama_lengkap')} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
							{errors.nama_lengkap && <p className="text-red-500 text-sm mt-1">{errors.nama_lengkap.message}</p>}
						</div>
						<div>
							<label htmlFor="nisn" className="block text-sm font-medium text-gray-700">
								NISN
							</label>
							<input type="text" {...register('nisn')} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
							{errors.nisn && <p className="text-red-500 text-sm mt-1">{errors.nisn.message}</p>}
						</div>
					</div>
					<div>
						<label htmlFor="asal_sekolah" className="block text-sm font-medium text-gray-700">
							Asal Sekolah (SD/MI)
						</label>
						<input type="text" {...register('asal_sekolah')} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
						{errors.asal_sekolah && <p className="text-red-500 text-sm mt-1">{errors.asal_sekolah.message}</p>}
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label htmlFor="nama_wali" className="block text-sm font-medium text-gray-700">
								Nama Orang Tua/Wali
							</label>
							<input type="text" {...register('nama_wali')} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
							{errors.nama_wali && <p className="text-red-500 text-sm mt-1">{errors.nama_wali.message}</p>}
						</div>
						<div>
							<label htmlFor="kontak_wali" className="block text-sm font-medium text-gray-700">
								Nomor Telepon/WA Wali
							</label>
							<input type="text" {...register('kontak_wali')} className="mt-1 w-full p-2 border border-gray-300 rounded-md" />
							{errors.kontak_wali && <p className="text-red-500 text-sm mt-1">{errors.kontak_wali.message}</p>}
						</div>
					</div>

					<ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} onChange={(token) => setRecaptchaToken(token)} onExpired={() => setRecaptchaToken(null)} />

					{serverMessage && <div className="p-4 bg-green-100 text-green-800 rounded-md">{serverMessage}</div>}
					{serverError && <div className="p-4 bg-red-100 text-red-800 rounded-md">{serverError}</div>}

					<div>
						<button type="submit" disabled={!recaptchaToken} className="w-full bg-amber-500 text-white font-bold py-3 px-4 rounded-md hover:bg-amber-600 ...">
							Kirim Formulir Pendaftaran
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
export default PendaftaranFormPage;
