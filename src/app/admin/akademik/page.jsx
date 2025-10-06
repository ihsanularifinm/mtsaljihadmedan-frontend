'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Fungsi untuk mengambil data (digunakan oleh useQuery)
const fetchAkademik = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/akademik`);
	return data;
};

// Fungsi untuk mengupdate data (digunakan oleh useMutation)
const updateAkademik = async (updatedData) => {
	const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/akademik`, updatedData);
	return data;
};

function KelolaAkademikPage() {
	const queryClient = useQueryClient();

	const {
		data: akademikData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['akademikAdmin'],
		queryFn: fetchAkademik,
	});

	const [formData, setFormData] = useState({ kurikulum: '', program_unggulan: '', ekstrakurikuler: '' });

	useEffect(() => {
		if (akademikData) {
			setFormData(akademikData);
		}
	}, [akademikData]);

	const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const mutation = useMutation({
		mutationFn: updateAkademik,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['akademikAdmin'] });
			alert('Data akademik berhasil diperbarui!');
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
					<CardTitle className="text-3xl">Kelola Halaman Akademik</CardTitle>
					<CardDescription>Ubah konten yang akan tampil di halaman akademik publik.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-2">
								<Label htmlFor="kurikulum">Kurikulum</Label>
								<Textarea id="kurikulum" name="kurikulum" rows="5" value={formData.kurikulum || ''} onChange={handleChange} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="program_unggulan">Program Unggulan</Label>
								<Textarea id="program_unggulan" name="program_unggulan" rows="8" value={formData.program_unggulan || ''} onChange={handleChange} />
								<p className="text-sm text-muted-foreground">Tips: Gunakan '*' di awal baris untuk membuat daftar poin.</p>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="ekstrakurikuler">Ekstrakurikuler</Label>
								<Textarea id="ekstrakurikuler" name="ekstrakurikuler" rows="8" value={formData.ekstrakurikuler || ''} onChange={handleChange} />
								<p className="text-sm text-muted-foreground">Tips: Pisahkan setiap item dengan koma, contoh: OSIS, Pramuka, Futsal</p>
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

export default KelolaAkademikPage;
