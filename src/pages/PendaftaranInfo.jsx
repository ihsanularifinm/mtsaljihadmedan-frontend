// file: src/pages/PendaftaranInfo.jsx

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function PendaftaranInfo() {
	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Pendaftaran - MTs Al-Jihad Medan</title>
			</Helmet>

			<h1 className="text-4xl font-bold text-center text-blue-800 mb-12">Penerimaan Peserta Didik Baru (PPDB) TP. 2025/2026</h1>

			<section className="mb-16">
				<h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Alur Pendaftaran</h2>
				<div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
					<div className="flex flex-col items-center text-center w-48">
						<div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-xl">1</div>
						<h3 className="font-bold mt-2">Mengisi Formulir</h3>
						<p className="text-sm text-gray-600">Isi formulir online atau datang langsung ke sekolah.</p>
					</div>
					<div className="flex-1 h-1 bg-blue-800 hidden md:block"></div>
					<div className="flex flex-col items-center text-center w-48">
						<div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-xl">2</div>
						<h3 className="font-bold mt-2">Melengkapi Berkas</h3>
						<p className="text-sm text-gray-600">Serahkan semua dokumen persyaratan ke panitia PPDB.</p>
					</div>
					<div className="flex-1 h-1 bg-blue-800 hidden md:block"></div>
					<div className="flex flex-col items-center text-center w-48">
						<div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-xl">3</div>
						<h3 className="font-bold mt-2">Observasi & Wawancara</h3>
						<p className="text-sm text-gray-600">Mengikuti tes observasi dan wawancara orang tua.</p>
					</div>
					<div className="flex-1 h-1 bg-blue-800 hidden md:block"></div>
					<div className="flex flex-col items-center text-center w-48">
						<div className="w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-xl">4</div>
						<h3 className="font-bold mt-2">Pengumuman</h3>
						<p className="text-sm text-gray-600">Melihat hasil kelulusan di papan pengumuman atau website.</p>
					</div>
				</div>
			</section>

			<section className="mb-16">
				<div className="bg-white p-8 rounded-lg shadow-lg grid md:grid-cols-2 gap-10">
					<div>
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Jadwal Penting</h3>
						<ul className="text-gray-700 space-y-3">
							<li>
								<strong>Pembukaan Pendaftaran:</strong>
								<br />
								01 April - 03 Juli 2025
							</li>
							<li>
								<strong>Masa Pengenalan Lingkungan (MPLM):</strong>
								<br />
								04 Juli s/d 05 Juli 2025
							</li>
							<li>
								<strong>Awal Masuk Tahun Pelajaran Baru:</strong>
								<br />
								07 Juli 2025
							</li>
						</ul>
						<h3 className="text-2xl font-bold text-amber-500 mt-8 mb-4">Keunggulan & Program</h3>
						<ul className="list-disc list-inside text-gray-700 space-y-2">
							<li>
								<strong>GRATIS 3 TAHUN</strong> bagi Anak Yatim
							</li>
							<li>
								<strong>GRATIS</strong> Pembangunan Sekolah
							</li>
							<li>
								<strong>BEASISWA</strong> bagi siswa/i berprestasi (Akademik & Non Akademik)
							</li>
							<li>Bimbingan Baca Tulis Al-Quran (BTA)</li>
						</ul>
					</div>
					<div>
						<h3 className="text-2xl font-bold text-amber-500 mb-4">Syarat Pendaftaran</h3>
						<ol className="list-decimal list-inside text-gray-700 space-y-2">
							<li>Mengisi Formulir Pendaftaran</li>
							<li>Foto Copy Kartu Keluarga (2 lembar)</li>
							<li>Foto Copy KTP orang tua (2 lembar)</li>
							<li>Foto Copy NISN (2 lembar)</li>
							<li>Foto Copy SKL (2 lembar, jika sudah ada)</li>
							<li>Foto Copy IJAZAH (2 lembar, telah dilegalisir, jika sudah ada)</li>
							<li>Pas foto berwarna ukuran 3x4 (2 lembar)</li>
						</ol>
					</div>
				</div>
			</section>

			<section className="text-center">
				<h2 className="text-2xl font-bold text-blue-800 mb-4">Siap Bergabung dengan Keluarga Besar MTs Al-Jihad?</h2>
				<p className="text-gray-700 mb-6">Daftarkan putra/putri Anda sekarang juga melalui tautan di bawah ini atau hubungi kami untuk informasi lebih lanjut.</p>
				{/* Tombol ini sekarang mengarah ke halaman formulir */}
				<Link to="/pendaftaran/form" className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300">
					Formulir Pendaftaran Online
				</Link>
				<Link to="/kontak" className="ml-4 text-blue-800 font-semibold">
					Hubungi Panitia
				</Link>
			</section>
		</main>
	);
}

export default PendaftaranInfo;
