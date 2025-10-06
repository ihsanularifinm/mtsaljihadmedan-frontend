'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchAkademik = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/akademik`);
	return data;
};

export default function AkademikClient({ initialData }) {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['akademik'],
		queryFn: fetchAkademik,
		initialData: initialData,
	});

	const renderContent = () => {
		if (isLoading && !initialData) return <p className="text-center">Memuat data...</p>;
		if (isError) return <p className="text-center text-red-500">Gagal memuat data: {error.message}</p>;
		if (!data) return <p className="text-center">Data akademik belum tersedia.</p>;

		return (
			<>
				<section className="mb-16 bg-white p-8 rounded-lg shadow-lg">
					<h2 className="text-3xl font-bold text-amber-500 mb-4">Kurikulum</h2>
					<p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.kurikulum}</p>
				</section>
				<section className="mb-16">
					<h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Program Unggulan</h2>
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<ul className="list-disc list-inside text-gray-700 space-y-2">{data.program_unggulan.split('*').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}</ul>
					</div>
				</section>
				<section>
					<h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Ekstrakurikuler</h2>
					<div className="flex flex-wrap justify-center gap-4">
						{data.ekstrakurikuler.split(',').map((item, index) => (
							<div key={index} className="bg-white py-2 px-4 rounded-full shadow text-center font-semibold text-blue-800">
								{item.trim()}
							</div>
						))}
					</div>
				</section>
			</>
		);
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Informasi Akademik</h1>
			{renderContent()}
		</main>
	);
}
