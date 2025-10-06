import AkademikClient from '@/components/publik/AkademikClient';

// SEO diatur di Server Component
export const metadata = {
	title: 'Informasi Akademik - MTs Al-Jihad Medan',
	description: 'Informasi mengenai kurikulum, program unggulan, dan kegiatan ekstrakurikuler yang ditawarkan di MTs Al-Jihad Medan.',
};

// Fungsi untuk mengambil data awal di server
async function getInitialAkademikData() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/akademik`, { cache: 'no-store' });
		if (!res.ok) return null;
		return res.json();
	} catch (error) {
		console.error('Gagal fetch data akademik di server:', error);
		return null;
	}
}

export default async function AkademikPage() {
	const initialData = await getInitialAkademikData();

	return <AkademikClient initialData={initialData} />;
}
