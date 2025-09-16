import { Poppins } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	display: 'swap',
});

export const metadata = {
	title: 'MTs Al-Jihad Medan',
	description: 'Website resmi MTs Al-Jihad Medan.',
};

export default function RootLayout({ children }) {
	return (
		<html lang="id">
			<body className={poppins.className}>
				{' '}
				{/* Terapkan font ke seluruh body */}
				<div className="flex flex-col min-h-screen">
					<Header />
					<main className="flex-grow">
						{children} {/* Di sinilah semua halaman (page.jsx) akan ditampilkan */}
					</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
