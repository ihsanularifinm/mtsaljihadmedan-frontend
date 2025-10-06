import DetailBeritaClient from '@/components/publik/DetailBeritaClient';

async function getInitialDetailBerita(id) {
	try {
		const res = await fetch(`${process.env.API_URL}/api/berita/${id}`, { cache: 'no-store' });
		if (!res.ok) return null;
		return res.json();
	} catch (error) {
		console.error(error);
		return null;
	}
}

// SEO dinamis
export async function generateMetadata({ params }) {
	const berita = await getInitialDetailBerita(params.id);
	if (!berita) return { title: 'Berita Tidak Ditemukan' };
	return {
		title: `${berita.judul} - MTs Al-Jihad Medan`,
		description: berita.isi.substring(0, 160),
	};
}

export default async function DetailBeritaPage({ params }) {
	const initialData = await getInitialDetailBerita(params.id);

	return <DetailBeritaClient initialData={initialData} />;
}
