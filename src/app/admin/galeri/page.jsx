'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// --- Fungsi Pengambilan & Modifikasi Data ---
const fetchAlbums = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/album`);
	return data;
};

const createAlbum = async (namaAlbum) => {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/album`, { nama_album: namaAlbum });
	return data;
};

function KelolaGaleriPage() {
	const queryClient = useQueryClient();
	const [namaAlbumBaru, setNamaAlbumBaru] = useState('');

	// Mengambil daftar album dengan useQuery
	const { data: albums, isLoading } = useQuery({
		queryKey: ['albumsAdmin'],
		queryFn: fetchAlbums,
	});

	// Menangani pembuatan album baru dengan useMutation
	const mutation = useMutation({
		mutationFn: createAlbum,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['albumsAdmin'] }); // Refresh daftar album
			setNamaAlbumBaru('');
		},
		onError: (error) => {
			console.error('Gagal menambah album:', error);
			alert('Gagal menambah album.');
		},
	});

	const handleTambahAlbum = (e) => {
		e.preventDefault();
		mutation.mutate(namaAlbumBaru);
	};

	return (
		<div className="container mx-auto p-6 grid gap-6">
			<h1 className="text-3xl font-bold">Kelola Album Galeri</h1>

			<Card>
				<CardHeader>
					<CardTitle>Buat Album Baru</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleTambahAlbum}>
						<div className="flex items-center space-x-2">
							<Input type="text" value={namaAlbumBaru} onChange={(e) => setNamaAlbumBaru(e.target.value)} placeholder="Nama Album Baru" required />
							<Button type="submit" disabled={mutation.isPending}>
								{mutation.isPending ? 'Membuat...' : 'Buat Album'}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Daftar Album</CardTitle>
				</CardHeader>
				<CardContent>
					{isLoading ? (
						<p className="text-center">Memuat album...</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nama Album</TableHead>
									<TableHead className="text-right">Aksi</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{albums &&
									albums.map((album) => (
										<TableRow key={album._id}>
											<TableCell className="font-medium">{album.nama_album}</TableCell>
											<TableCell className="text-right">
												<Button variant="outline" size="sm" asChild>
													<Link href={`/admin/galeri/${album._id}`}>Kelola Foto</Link>
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

export default KelolaGaleriPage;
