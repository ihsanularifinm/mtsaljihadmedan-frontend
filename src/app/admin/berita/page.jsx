'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Fungsi untuk mengambil data (digunakan oleh useQuery)
const fetchBerita = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`);
	return data;
};

// Fungsi untuk menghapus data (digunakan oleh useMutation)
const deleteBerita = async (id) => {
	const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`);
	return data;
};

function KelolaBeritaPage() {
	const queryClient = useQueryClient();

	const {
		data: beritaList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['beritaAdmin'],
		queryFn: fetchBerita,
	});

	const deleteMutation = useMutation({
		mutationFn: deleteBerita,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['beritaAdmin'] });
		},
		onError: (error) => {
			console.error('Gagal menghapus berita:', error);
			alert('Gagal menghapus berita.');
		},
	});

	const handleDelete = (id) => {
		if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
			deleteMutation.mutate(id);
		}
	};

	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Kelola Berita</h1>
				<Button asChild>
					<Link href="/admin/berita/tambah">+ Tambah Berita Baru</Link>
				</Button>
			</div>

			<div className="bg-white rounded-lg border">
				{isLoading && <p className="p-4 text-center">Memuat data...</p>}
				{isError && <p className="p-4 text-center text-red-500">Gagal memuat data: {error.message}</p>}

				{!isLoading && !isError && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Judul Artikel</TableHead>
								<TableHead>Tanggal Terbit</TableHead>
								<TableHead className="text-right">Aksi</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{beritaList && beritaList.length > 0 ? (
								beritaList.map((berita) => (
									<TableRow key={berita._id}>
										<TableCell className="font-medium">{berita.judul}</TableCell>
										<TableCell>{new Date(berita.tanggal_terbit).toLocaleDateString('id-ID')}</TableCell>
										<TableCell className="text-right space-x-2">
											<Button variant="outline" size="sm" asChild>
												<Link href={`/admin/berita/edit/${berita._id}`}>Edit</Link>
											</Button>
											<Button variant="destructive" size="sm" onClick={() => handleDelete(berita._id)} disabled={deleteMutation.isPending}>
												Hapus
											</Button>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan="3" className="h-24 text-center">
										Belum ada data berita.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				)}
			</div>
		</div>
	);
}

export default KelolaBeritaPage;
