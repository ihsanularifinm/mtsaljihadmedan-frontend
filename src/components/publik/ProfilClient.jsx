'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProfil = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profil`);
	return data;
};

export default function ProfilClient({ initialData }) {
	const {
		data: profilData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profil'],
		queryFn: fetchProfil,
		initialData: initialData, // Gunakan data dari server sebagai data awal
	});

	if (isLoading && !initialData)
		return (
			<main className="...">
				<p>Memuat data profil...</p>
			</main>
		);
	if (isError)
		return (
			<main className="...">
				<p>Gagal memuat data.</p>
			</main>
		);

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Profil MTs Al-Jihad</h1>
			{profilData ? (
				<>
					<section className="mb-16">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-3xl font-bold text-amber-500 mb-4">Sejarah Sekolah</h2>
							<p className="text-gray-700 leading-relaxed whitespace-pre-line">{profilData.sejarah}</p>
						</div>
					</section>
					<section className="mb-16">
						<div className="flex flex-col md:flex-row gap-8">
							<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
								<h3 className="text-2xl font-bold text-amber-500 mb-4">Visi</h3>
								<p className="text-gray-700 whitespace-pre-line">{profilData.visi}</p>
							</div>
							<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
								<h3 className="text-2xl font-bold text-amber-500 mb-4">Misi</h3>
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
