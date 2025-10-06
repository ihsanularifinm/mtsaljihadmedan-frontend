import ProfilClient from '@/components/publik/ProfilClient';

export const metadata = {
	title: 'Profil Sekolah - MTs Al-Jihad Medan',
	description: 'Pelajari lebih lanjut tentang sejarah, visi, dan misi MTs Al-Jihad Medan...',
};

async function getInitialProfilData() {
	try {
		const res = await fetch(`${process.env.API_URL}/api/profil`, { cache: 'no-store' });
		if (!res.ok) return null;
		return res.json();
	} catch (error) {
		return null;
	}
}

export default async function ProfilPage() {
	const initialData = await getInitialProfilData();

	return <ProfilClient initialData={initialData} />;
}
