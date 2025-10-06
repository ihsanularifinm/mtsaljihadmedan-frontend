import Link from 'next/link';

// Fungsi untuk mengambil data berita
async function getBerita() {
	try {
		const apiUrl = `${process.env.API_URL}/api/berita?limit=3`;
		// Gunakan cache: 'no-store' agar data selalu baru
		const res = await fetch(apiUrl, { cache: 'no-store' });

		if (!res.ok) {
			throw new Error('Gagal mengambil data berita');
		}
		return res.json();
	} catch (error) {
		console.error(error);
		return []; // Kembalikan array kosong jika terjadi error
	}
}

export default async function BeritaTerbaru() {
	const berita = await getBerita(); // Ambil data langsung di server

	return (
		<section className="py-16 bg-gray-50">
			<div className="container mx-auto px-6">
				<h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Berita Terbaru</h2>

				<div className="grid md:grid-cols-3 gap-8">
					{berita.length > 0 ? (
						berita.map((item) => (
							<div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group">
								<div className="overflow-hidden">
									<img src={item.gambar} alt={item.judul} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
								</div>
								<div className="p-6 flex flex-col flex-grow">
									<p className="text-sm text-gray-500">{new Date(item.tanggal_terbit).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
									<h3 className="font-bold text-lg mb-2 text-blue-800 mt-1 flex-grow">{item.judul}</h3>
									<p className="text-gray-700 mb-4 text-sm">{item.isi.substring(0, 100)}...</p>
									<Link href={`/berita/${item._id}`} className="font-semibold text-amber-500 hover:text-amber-700 mt-auto self-start">
										Baca Selengkapnya →
									</Link>
								</div>
							</div>
						))
					) : (
						<p className="text-center col-span-3">Belum ada berita untuk ditampilkan.</p>
					)}
				</div>

				<div className="text-center mt-12">
					<Link href="/berita" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-6 rounded-full transition duration-300">
						Lihat Semua Berita
					</Link>
				</div>
			</div>
		</section>
	);
}
