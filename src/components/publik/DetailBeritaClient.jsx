'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const fetchDetailBerita = async (id) => {
	if (!id) return null;
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`);
	return data;
};

export default function DetailBeritaClient({ initialData }) {
	const params = useParams();
	const { id } = params;

	const {
		data: berita,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['berita', id],
		queryFn: () => fetchDetailBerita(id),
		initialData: initialData,
		enabled: !!id,
	});

	if (isLoading && !initialData)
		return (
			<main className="...">
				<p>Memuat detail berita...</p>
			</main>
		);
	if (isError)
		return (
			<main className="...">
				<p>Gagal memuat data: {error.message}</p>
			</main>
		);
	if (!berita)
		return (
			<main className="...">
				<p>Berita tidak ditemukan.</p>
			</main>
		);

	return (
		<main className="container mx-auto px-6 py-12">
			<article className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
				<h1 className="text-4xl font-bold text-blue-800 mb-2">{berita.judul}</h1>
				<p className="text-md text-gray-500 mb-6">Dipublikasikan pada {new Date(berita.tanggal_terbit).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
				<img src={berita.gambar} alt={berita.judul} className="w-full h-auto max-h-96 object-cover rounded-lg mb-6" />
				<div className="prose max-w-none text-gray-800 leading-relaxed">
					{berita.isi.split('\n').map((paragraf, index) => (
						<p key={index}>{paragraf || <br />}</p>
					))}
				</div>
				<Link href="/berita" className="inline-block mt-8 text-amber-500 font-semibold hover:underline">
					← Kembali ke Daftar Berita
				</Link>
			</article>
		</main>
	);
}
