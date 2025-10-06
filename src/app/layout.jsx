import { Poppins } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

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
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
