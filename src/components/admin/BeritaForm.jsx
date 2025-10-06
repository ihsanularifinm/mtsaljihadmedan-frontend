'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function BeritaForm({ initialData = {}, onSave, loading }) {
	const [judul, setJudul] = useState(initialData.judul || '');
	const [isi, setIsi] = useState(initialData.isi || '');
	const [gambar, setGambar] = useState(null);
	const [previewGambar, setPreviewGambar] = useState(initialData.gambar || null);
	const router = useRouter();

	const handleGambarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setGambar(file);
			setPreviewGambar(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('judul', judul);
		formData.append('isi', isi);
		if (gambar) {
			formData.append('gambar', gambar);
		}
		await onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="grid gap-6">
				<div className="grid gap-2">
					<Label htmlFor="judul">Judul</Label>
					<Input id="judul" type="text" value={judul} onChange={(e) => setJudul(e.target.value)} required />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="isi">Isi Berita</Label>
					<Textarea id="isi" value={isi} onChange={(e) => setIsi(e.target.value)} rows="10" required />
				</div>
				<div className="grid gap-2">
					<Label htmlFor="gambar">Gambar Unggulan</Label>
					<Input id="gambar" type="file" accept="image/*" onChange={handleGambarChange} />
					{previewGambar && (
						<div className="mt-4">
							<p className="text-sm text-muted-foreground">Preview:</p>
							<img src={previewGambar} alt="Preview" className="w-48 h-auto rounded-md object-cover mt-2" />
						</div>
					)}
				</div>
				<div className="flex justify-end gap-2">
					<Button type="button" variant="outline" onClick={() => router.push('/admin/berita')}>
						Batal
					</Button>
					<Button type="submit" disabled={loading}>
						{loading ? 'Menyimpan...' : 'Simpan Berita'}
					</Button>
				</div>
			</div>
		</form>
	);
}
