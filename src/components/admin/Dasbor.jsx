import { Helmet } from 'react-helmet-async';

function Dasbor() {
	return (
		<div className="container mx-auto p-6">
			<Helmet>
				<title>Dasbor - Admin MTs Al-Jihad</title>
			</Helmet>
			<h1 className="text-3xl font-bold text-gray-800">Selamat Datang di Dasbor Admin</h1>
			<p className="mt-2 text-gray-600">Pilih menu di sidebar kiri untuk mulai mengelola konten website.</p>
		</div>
	);
}

export default Dasbor;
