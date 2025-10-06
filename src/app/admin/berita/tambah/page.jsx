'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import BeritaForm from '@/components/admin/BeritaForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Fungsi untuk mengirim data (digunakan oleh useMutation)
const createBerita = async (formData) => {
	const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/berita`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

function TambahBeritaPage() {
	const queryClient = useQueryClient();
	const router = useRouter();

	// Gunakan useMutation untuk menangani proses pembuatan berita
	const mutation = useMutation({
		mutationFn: createBerita,
		onSuccess: () => {
			// Beri tahu Tanstack Query untuk memuat ulang data di halaman daftar berita
			queryClient.invalidateQueries({ queryKey: ['beritaAdmin'] });
			router.push('/admin/berita'); // Arahkan kembali ke halaman daftar
		},
		onError: (error) => {
			console.error('Gagal menambah berita:', error);
			alert('Gagal menambah berita.');
		},
	});

	const handleSave = (formData) => {
		mutation.mutate(formData); // Jalankan mutasi
	};

	return (
		<div className="container mx-auto p-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Tambah Berita Baru</CardTitle>
				</CardHeader>
				<CardContent>
					<BeritaForm onSave={handleSave} loading={mutation.isPending} />
				</CardContent>
			</Card>
		</div>
	);
}

export default TambahBeritaPage;
