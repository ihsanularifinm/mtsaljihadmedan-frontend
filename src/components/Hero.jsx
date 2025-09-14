import { Link } from 'react-router-dom';

function Hero() {
	// Style untuk background image, lebih mudah di-manage di sini
	const heroStyle = {
		backgroundImage: "url('/assets/images/hero-bg.jpg')",
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundColor: 'rgba(13, 71, 161, 0.7)',
		backgroundBlendMode: 'overlay',
	};

	return (
		<section className="text-white text-center py-20 px-6" style={heroStyle}>
			<div className="container mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold mb-4">Selamat Datang di MTs Al-Jihad Medan</h1>
				<p className="text-lg md:text-xl mb-2">Anggota Subrayon MTsN 2 Medan</p>
				<p className="font-semibold text-amber-500 text-2xl mb-8">"Calon Pemilik Masa Depan - Seragam Ku Masa Depan Ku"</p>
				<Link to="/pendaftaran" className="bg-amber-500 font-bold py-3 w-full md:w-auto px-8 rounded-full text-lg text-center hover:bg-amber-600 transition-colors duration-300">
					Info Pendaftaran 2025/2026
				</Link>
			</div>
		</section>
	);
}

export default Hero;
