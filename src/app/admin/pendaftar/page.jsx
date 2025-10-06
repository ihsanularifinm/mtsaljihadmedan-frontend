'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Fungsi untuk mengambil data
const fetchPendaftar = async () => {
	const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pendaftar`);
	return data;
};

function LihatPendaftarPage() {
	// Gunakan useQuery untuk mengambil data pendaftar
	const {
		data: pendaftarList,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['pendaftarAdmin'],
		queryFn: fetchPendaftar,
	});

	const getStatusVariant = (status) => {
		switch (status) {
			case 'Diterima':
				return 'default';
			case 'Ditolak':
				return 'destructive';
			default:
				return 'outline';
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold text-gray-800 mb-6">Data Pendaftar Siswa Baru</h1>

			<div className="bg-white shadow-md rounded-lg border">
				{isLoading ? (
					<p className="p-4 text-center">Memuat data pendaftar...</p>
				) : isError ? (
					<p className="p-4 text-center text-red-500">Gagal memuat data: {error.message}</p>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Tanggal Daftar</TableHead>
								<TableHead>Nama Lengkap</TableHead>
								<TableHead>NISN</TableHead>
								<TableHead>Asal Sekolah</TableHead>
								<TableHead>Kontak Wali</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{pendaftarList && pendaftarList.length > 0 ? (
								pendaftarList.map((pendaftar) => (
									<TableRow key={pendaftar._id}>
										<TableCell>{new Date(pendaftar.tanggal_daftar).toLocaleDateString('id-ID')}</TableCell>
										<TableCell className="font-medium">{pendaftar.nama_lengkap}</TableCell>
										<TableCell>{pendaftar.nisn}</TableCell>
										<TableCell>{pendaftar.asal_sekolah}</TableCell>
										<TableCell>{pendaftar.kontak_wali}</TableCell>
										<TableCell>
											<Badge variant={getStatusVariant(pendaftar.status)}>{pendaftar.status}</Badge>
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell colSpan="6" className="text-center h-24">
										Belum ada data pendaftar.
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

export default LihatPendaftarPage;
