import Hero from '@/components/publik/Hero';
import ProfilSingkat from '@/components/publik/ProfilSingkat';
import Keunggulan from '@/components/publik/Keunggulan';
import BeritaTerbaru from '@/components/publik/BeritaTerbaru';
import { Suspense } from 'react';

export const metadata = {
	title: 'Beranda - MTs Al-Jihad Medan',
	description: 'Selamat datang di website resmi MTs Al-Jihad Medan. Temukan informasi pendaftaran (PPDB), profil, visi & misi, kegiatan, prestasi, dan kontak sekolah kami.',
};

export default function Beranda() {
	return (
		<div>
			<Hero />
			<ProfilSingkat />
			<Keunggulan />
			<Suspense fallback={<div className="text-center p-16">Memuat berita...</div>}>
				<BeritaTerbaru />
			</Suspense>
		</div>
	);
}
