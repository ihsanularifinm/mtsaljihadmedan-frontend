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
				<meta name="description" content="Selamat datang di MTs Al-Jihad Medan. Sekolah menengah Islam berbasis IMTAQ dan IPTEK. Temukan informasi pendaftaran (PPDB), profil, galeri, dan berita terbaru." />
			</Helmet>

			<Hero />
			<ProfilSingkat />
			<Keunggulan />
			<BeritaTerbaru />
		</div>
	);
}

export default Beranda;
