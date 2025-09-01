import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

function Akademik() {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/akademik`);
			setData(data);
			setLoading(false);
		};
		fetchData();
	}, []);

	if (loading) return <div className="text-center p-8">Memuat...</div>;

	return (
		<main className="container mx-auto px-6 py-12">
			<Helmet>
				<title>Akademik - MTs Al-Jihad Medan</title>
			</Helmet>
			<h1 className="text-4xl font-bold text-center text-primary mb-12">Informasi Akademik</h1>

			{data && (
				<>
					<section className="mb-16 bg-white p-8 rounded-lg shadow-lg">
						<h2 className="text-3xl font-bold text-accent mb-4">Kurikulum</h2>
						<p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.kurikulum}</p>
					</section>
					<section className="mb-16">
						<h2 className="text-3xl font-bold text-primary mb-8 text-center">Program Unggulan</h2>
						<div className="grid md:grid-cols-1 gap-8">
							<div className="bg-white p-6 rounded-lg shadow-lg">
								<ul className="list-disc list-inside text-gray-700 space-y-2">{data.program_unggulan.split('*').map((item, index) => item.trim() && <li key={index}>{item.trim()}</li>)}</ul>
							</div>
						</div>
					</section>
					<section>
						<h2 className="text-3xl font-bold text-primary mb-8 text-center">Ekstrakurikuler</h2>
						<div className="flex flex-wrap justify-center gap-4">
							{data.ekstrakurikuler.split(',').map((item, index) => (
								<div key={index} className="bg-white py-2 px-4 rounded-full shadow text-center font-semibold text-primary">
									{item.trim()}
								</div>
							))}
						</div>
					</section>
				</>
			)}
		</main>
	);
}
export default Akademik;
