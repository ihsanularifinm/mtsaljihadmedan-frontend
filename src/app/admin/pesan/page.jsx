'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Fungsi untuk mengambil data
const fetchPesan = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pesan`);
	return data;
};

function LihatPesanPage() {
	const {
		data: pesanList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['pesanAdmin'],
		queryFn: fetchPesan,
	});

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Pesan Masuk</h1>

			<div className="bg-white shadow-md rounded-lg border">
				{isLoading ? (
					<p className="p-4 text-center">Memuat pesan...</p>
				) : isError ? (
					<p className="p-4 text-center text-red-500">Gagal memuat data: {error.message}</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[200px]">Tanggal</TableHead>
								<TableHead>Pengirim</TableHead>
								<TableHead>Subjek</TableHead>
								<TableHead className="w-[100px]">Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pesanList && pesanList.length > 0 ? (
								pesanList.map((pesan) => (
									<TableRow key={pesan._id}>
										<TableCell>{new Date(pesan.tanggal_kirim).toLocaleString('id-ID')}</TableCell>
										<TableCell>
											<div className="font-medium">{pesan.nama_lengkap}</div>
											<div className="text-sm text-muted-foreground">{pesan.email}</div>
										</TableCell>
										<TableCell>{pesan.subjek}</TableCell>
										<TableCell>
											<Badge variant={pesan.status === 'Baru' ? 'outline' : 'default'}>{pesan.status}</Badge>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan="4" className="text-center h-24">
										Tidak ada pesan masuk.
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

export default LihatPesanPage;
