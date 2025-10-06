'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Fungsi untuk mengambil data (digunakan oleh useQuery)
const fetchProfil = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profil`);
	return data;
};

// Fungsi untuk mengupdate data (digunakan oleh useMutation)
const updateProfil = async (updatedData) => {
	const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/profil`, updatedData);
	return data;
};

function KelolaProfilPage() {
	const queryClient = useQueryClient();

	const {
		data: profilData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['profilAdmin'],
		queryFn: fetchProfil,
	});

	const [formData, setFormData] = useState({ sejarah_singkat: '', sejarah: '', visi: '', misi: '' });

	useEffect(() => {
		if (profilData) {
			setFormData(profilData);
		}
	}, [profilData]);

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const mutation = useMutation({
		mutationFn: updateProfil,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['profilAdmin'] });
			alert('Data profil berhasil diperbarui!');
		},
		onError: () => {
			alert('Gagal memperbarui data.');
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		mutation.mutate(formData);
	};

	if (isLoading) return <div className="p-8">Memuat data...</div>;
	if (isError) return <div className="p-8 text-red-500">Gagal memuat data.</div>;

	return (
		<div className="container mx-auto p-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-3xl">Kelola Halaman Profil</CardTitle>
					<CardDescription>Ubah konten yang akan tampil di halaman utama dan halaman profil publik.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-2">
								<Label htmlFor="sejarah_singkat">Sejarah Singkat (Halaman Utama)</Label>
								<Textarea id="sejarah_singkat" name="sejarah_singkat" rows="4" value={formData.sejarah_singkat || ''} onChange={handleChange} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="sejarah">Sejarah Lengkap (Halaman Profil)</Label>
								<Textarea id="sejarah" name="sejarah" rows="8" value={formData.sejarah || ''} onChange={handleChange} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="visi">Visi</Label>
								<Textarea id="visi" name="visi" rows="5" value={formData.visi || ''} onChange={handleChange} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="misi">Misi</Label>
								<Textarea id="misi" name="misi" rows="8" value={formData.misi || ''} onChange={handleChange} />
							</div>
							<div className="flex justify-end">
								<Button type="submit" disabled={mutation.isPending}>
									{mutation.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}

export default KelolaProfilPage;
