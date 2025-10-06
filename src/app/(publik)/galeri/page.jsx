import GaleriClient from '@/components/publik/GaleriClient';

export const metadata = {
	title: 'Galeri - MTs Al-Jihad Medan',
	description: 'Dokumentasi foto kegiatan, fasilitas, dan prestasi siswa di MTs Al-Jihad Medan.',
};

async function getInitialGaleriData() {
	try {
		const apiUrl = process.env.API_URL;
		const resAlbums = await fetch(`${apiUrl}/api/galeri/album`, { cache: 'no-store' });
		const albums = await resAlbums.json();

		const allFotos = [];
		for (const album of albums) {
			const resFotos = await fetch(`${apiUrl}/api/galeri/album/${album._id}`, { cache: 'no-store' });
			const dataFotos = await resFotos.json();
			allFotos.push(...dataFotos.fotos);
		}
		return { albums, fotos: allFotos };
	} catch (error) {
		console.error('Gagal fetch data di server galeri:', error);
		return { albums: [], fotos: [] };
	}
}

export default async function GaleriPage() {
	const initialData = await getInitialGaleriData();

	return (
		<main className="container mx-auto px-6 py-12">
			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Galeri Foto Sekolah</h1>

			<GaleriClient initialData={initialData} />
		</main>
	);
}
