import { Link } from 'react-router-dom';

function ProfilSingkat() {
	return (
		<section id="profil" className="py-16">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-3xl font-bold text-primary mb-4">Profil Madrasah</h2>
				<p className="max-w-3xl mx-auto text-gray-700 mb-8">MTs Al-Jihad adalah lembaga pendidikan Islam yang berkomitmen mencetak generasi cerdas, berakhlak mulia, dan siap menghadapi tantangan zaman dengan landasan Iman dan Taqwa serta penguasaan Ilmu Pengetahuan dan Teknologi.</p>
				<div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-accent mb-4">Visi</h3>
						<p className="text-gray-700">Menjadi lembaga pendidikan yang berkompeten dan berdedikasi tinggi serta mampu bersaing dalam pembangunan nasional di era globalisasi & informasi dengan dilandasi IMTAQ & IPTEK.</p>
					</div>
					<div className="md:w-1/2 bg-white p-8 rounded-lg shadow-lg text-left">
						<h3 className="text-2xl font-bold text-accent mb-4">Misi</h3>
						<p className="text-gray-700">Menerapkan Aqidah yang kokoh, membentuk peserta didik yang cerdas dan berakhlakul Karimah, serta mengembangkan pengetahuan dan keterampilan yang produktif.</p>
					</div>
				</div>
				<Link to="/profil" className="mt-8 inline-block btn-accent font-bold py-2 px-6 rounded-full">
					Selengkapnya Tentang Kami
				</Link>
			</div>
		</section>
	);
}

export default ProfilSingkat;
