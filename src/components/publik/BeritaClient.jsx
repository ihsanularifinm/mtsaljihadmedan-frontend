'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const fetchBeritaList = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`);
	return data;
};

export default function BeritaClient({ initialData }) {
	const {
		data: beritaList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['semuaBerita'],
		queryFn: fetchBeritaList,
		initialData: initialData,
	});

	const renderContent = () => {
		if (isLoading && !initialData) return <p className="text-center">Memuat semua berita...</p>;
		if (isError) return <p className="text-center text-red-500">Gagal memuat data: {error.message}</p>;
		if (!beritaList || beritaList.length === 0) return <p className="text-center col-span-3">Belum ada berita untuk ditampilkan.</p>;

		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{beritaList.map((item) => (
					<div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
						<div className="overflow-hidden">
							<img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
						</div>
						<div className="p-6 flex flex-col flex-grow">
							<p className="text-sm text-gray-500">{new Date(item.tanggal_terbit).toLocaleDateString('id-ID')}</p>
							<h3 className="font-bold text-lg mb-2 text-blue-800 flex-grow mt-1">{item.judul}</h3>
							<p className="text-gray-700 mb-4 text-sm">{item.isi.substring(0, 100)}...</p>
							<Link href={`/berita/${item._id}`} className="font-semibold text-amber-500 hover:text-amber-700 mt-auto self-start">
								Baca Selengkapnya →
							</Link>
						</div>
					</div>
				))}
			</div>
		);
	};

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Berita & Informasi Sekolah</h1>
			{renderContent()}
		</main>
	);
}
