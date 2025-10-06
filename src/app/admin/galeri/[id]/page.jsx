'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft, Trash2 } from 'lucide-react'; // Impor ikon

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const fetchAlbumDetail = async (id) => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/album/${id}`);
	return data;
};
const uploadPhotos = async ({ id, formData }) => {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/foto`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};
const deletePhoto = async (idFoto) => {
	const { data } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/galeri/foto/${idFoto}`);
	return data;
};

function KelolaAlbumDetailPage() {
	const queryClient = useQueryClient();
	const params = useParams();
	const { id } = params;
	const [selectedFiles, setSelectedFiles] = useState(null);

	// Tanstack Query untuk mengambil data album & foto
	const { data: albumData, isLoading } = useQuery({
		queryKey: ['albumDetail', id],
		queryFn: () => fetchAlbumDetail(id),
		enabled: !!id,
	});

	// Tanstack Mutation untuk upload foto
	const uploadMutation = useMutation({
		mutationFn: uploadPhotos,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['albumDetail', id] });
			setSelectedFiles(null); // Reset input file
			document.getElementById('file-input').value = ''; // Reset input file
		},
		onError: () => alert('Gagal upload foto.'),
	});

	// Tanstack Mutation untuk hapus foto
	const deleteMutation = useMutation({
		mutationFn: deletePhoto,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['albumDetail', id] });
		},
		onError: () => alert('Gagal hapus foto.'),
	});

	const handleFileChange = (e) => setSelectedFiles(e.target.files);

	const handleUpload = (e) => {
		e.preventDefault();
		if (!selectedFiles) return;
		const formData = new FormData();
		formData.append('id_album', id);
		for (let i = 0; i < selectedFiles.length; i++) {
			formData.append('foto', selectedFiles[i]);
		}
		uploadMutation.mutate({ id, formData });
	};

	const handleHapusFoto = (idFoto) => {
		if (window.confirm('Yakin ingin menghapus foto ini?')) {
			deleteMutation.mutate(idFoto);
		}
	};

	if (isLoading) return <div className="p-6">Memuat data album...</div>;

	const { album, fotos } = albumData || {};

	return (
		<div className="container mx-auto p-6 grid gap-6">
			<div>
				<Button variant="outline" size="sm" asChild>
					<Link href="/admin/galeri">
						<ArrowLeft className="mr-2 h-4 w-4" />
						Kembali ke Daftar Album
					</Link>
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Kelola Foto</CardTitle>
					<CardDescription>Album: "{album ? album.nama_album : ''}"</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleUpload} className="mb-8">
						<div className="flex items-center space-x-2">
							<Input id="file-input" type="file" onChange={handleFileChange} multiple required />
							<Button type="submit" disabled={uploadMutation.isPending}>
								{uploadMutation.isPending ? 'Mengunggah...' : 'Upload Foto'}
							</Button>
						</div>
					</form>

					<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
						{fotos &&
							fotos.map((foto) => (
								<div key={foto._id} className="relative group">
									<img src={foto.nama_file} alt="Foto galeri" className="w-full h-40 object-cover rounded-lg border" />
									<Button variant="destructive" size="icon" onClick={() => handleHapusFoto(foto._id)} className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
							))}
					</div>
					{fotos && fotos.length === 0 && <p className="text-center text-muted-foreground py-10">Belum ada foto di dalam album ini.</p>}
				</CardContent>
			</Card>
		</div>
	);
}

export default KelolaAlbumDetailPage;
