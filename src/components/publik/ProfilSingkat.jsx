import Link from 'next/link';

async function getProfilData() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/profil`, {
			cache: 'no-store', // Memastikan data selalu baru
		});

		if (!res.ok) {
			return null; // Handle error jika API gagal
		}
		return res.json();
	} catch (error) {
		console.error('Gagal fetch profil di server:', error);
		return null;
	}
}

export default async function ProfilSingkat() {
	const profilData = await getProfilData();

	return (
		<section id="profil" className="py-16 bg-gray-50">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold text-blue-800 mb-4">Profil Madrasah</h2>

				<p className="max-w-3xl mx-auto text-gray-700 mb-8">{profilData ? profilData.sejarah_singkat : 'Data sejarah tidak ditemukan.'}</p>

				<div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Visi</h3>
						<p className="text-gray-700 whitespace-pre-line">{profilData ? profilData.visi : 'Data visi tidak ditemukan.'}</p>
					</div>
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Misi</h3>
						<p className="text-gray-700 whitespace-pre-line">{profilData ? profilData.misi : 'Data misi tidak ditemukan.'}</p>
					</div>
				</div>

				<Link href="/profil" className="mt-8 inline-block bg-amber-500 text-white font-bold py-2 px-6 rounded-full hover:bg-amber-600 transition-colors duration-300">
					Selengkapnya Tentang Kami
				</Link>
			</div>
		</section>
	);
}
