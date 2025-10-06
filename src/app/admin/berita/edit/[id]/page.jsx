'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import BeritaForm from '@/components/admin/BeritaForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- Definisi Fungsi ---
const fetchBeritaById = async (id) => {
	if (!id) return null;
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`);
	return data;
};

const updateBerita = async ({ id, formData }) => {
	const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/berita/${id}`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return data;
};

function EditBeritaPage() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	// 1. Ambil data berita yang ada dengan useQuery
	const { data: initialData, isLoading } = useQuery({
		queryKey: ['berita', id],
		queryFn: () => fetchBeritaById(id),
		enabled: !!id, // Hanya jalankan jika id ada
	});

	// 2. Gunakan useMutation untuk proses update
	const mutation = useMutation({
		mutationFn: updateBerita,
		onSuccess: () => {
			// Muat ulang data di halaman daftar dan halaman detail ini
			queryClient.invalidateQueries({ queryKey: ['beritaAdmin'] });
			queryClient.invalidateQueries({ queryKey: ['berita', id] });
			router.push('/admin/berita');
		},
		onError: (error) => {
			console.error('Gagal update berita:', error);
			alert('Gagal update berita.');
		},
	});

	const handleSave = (formData) => {
		mutation.mutate({ id, formData });
	};

	if (isLoading) return <div className="p-6">Memuat data berita...</div>;

	return (
		<div className="container mx-auto p-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Edit Berita</CardTitle>
				</CardHeader>
				<CardContent>{initialData ? <BeritaForm initialData={initialData} onSave={handleSave} loading={mutation.isPending} /> : <p>Memuat data berita...</p>}</CardContent>
			</Card>
		</div>
	);
}

export default EditBeritaPage;
