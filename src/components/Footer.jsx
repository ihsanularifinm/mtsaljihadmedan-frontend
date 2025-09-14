function Footer() {
	return (
		<footer className="bg-blue-800/94 text-white pt-12 pb-8">
			<div className="container mx-auto px-6">
				<div className="grid md:grid-cols-3 gap-8">
					<div>
						<h4 className="text-lg font-bold mb-3">MTs Al-Jihad Medan</h4>
						<p className="text-gray-300">JL. Mesjid No. 33-A, Kel. Indra Kasih, Kec. Medan Tembung, Kota Medan, Sumatera Utara, 20221.</p>
					</div>
					<div>
						<h4 className="text-lg font-bold mb-3">Tautan Cepat</h4>
						<ul className="space-y-2">
							{/* Ganti <a> dengan <Link> nanti */}
							<li>
								<a href="/profil" className="text-gray-300 hover:text-white">
									Profil Sekolah
								</a>
							</li>
							<li>
								<a href="/akademik" className="text-gray-300 hover:text-white">
									Akademik
								</a>
							</li>
							<li>
								<a href="/pendaftaran" className="text-gray-300 hover:text-white">
									Pendaftaran
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-bold mb-3">Hubungi Kami</h4>
						<p className="text-gray-300 mb-2">
							Telepon:&nbsp;
							<a href="tel:06144031004" className="hover:underline">
								061 44031004
							</a>
						</p>
						<p className="text-gray-300 mb-2">
							Email:&nbsp;
							<a href="mailto:mtssaljihadmedan@gmail.com" className="hover:underline">
								mtssaljihadmedan@gmail.com
							</a>
						</p>
						<p className="text-gray-300 mb-2">
							Instagram:&nbsp;
							<a href="https://www.instagram.com/mtsaljihadmedan" target="_blank" rel="noopener noreferrer" className="hover:underline">
								@mtsaljihadmedan
							</a>
						</p>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
					<p>&copy; {new Date().getFullYear()} MTs Al-Jihad Medan. All Rights Reserved.</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
