import BeritaClient from '@/components/publik/BeritaClient';

export const metadata = {
	title: 'Berita & Kegiatan - MTs Al-Jihad Medan',
	description: 'Kumpulan berita, pengumuman, dan informasi kegiatan terbaru dari MTs Al-Jihad Medan.',
};

async function getInitialBeritaList() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/berita`, { cache: 'no-store' });
		if (!res.ok) return [];
		return res.json();
	} catch (error) {
		console.error('Gagal fetch daftar berita di server:', error);
		return [];
	}
}

export default async function BeritaPage() {
	const initialData = await getInitialBeritaList();

	return <BeritaClient initialData={initialData} />;
}
