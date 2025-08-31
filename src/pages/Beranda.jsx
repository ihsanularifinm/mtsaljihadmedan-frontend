import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ProfilSingkat from '../components/ProfilSingkat';
import Keunggulan from '../components/Keunggulan';
import BeritaTerbaru from '../components/BeritaTerbaru';

function Beranda() {
	return (
		<div>
			<Helmet>
				<title>Beranda - MTs Al-Jihad Medan</title>
				<meta name="description" content="Selamat datang di website resmi MTs Al-Jihad Medan. Temukan informasi pendaftaran, profil, visi & misi, kegiatan, prestasi, dan kontak sekolah kami." />
			</Helmet>

			<Hero />
			<ProfilSingkat />
			<Keunggulan />
			<BeritaTerbaru />
		</div>
	);
}

export default Beranda;
