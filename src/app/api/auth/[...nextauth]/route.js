import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			// Fungsi ini yang akan dieksekusi saat kita memanggil signIn()
			async authorize(credentials) {
				try {
					// Panggil API backend EXPRESS kita
					const { data } = await axios.post(`${process.env.API_URL}/api/users/login`, {
						username: credentials.username,
						password: credentials.password,
					});

					if (data) {
						// Jika login di backend berhasil, kembalikan data user
						// 'data' di sini adalah { _id, nama, username, token } dari API kita
						return data;
					} else {
						return null;
					}
				} catch (error) {
					// Tangkap error dari axios (misal: password salah 401)
					throw new Error(error.response.data.message || 'Login Gagal');
				}
			},
		}),
	],
	// Callback untuk mengelola sesi dan token
	callbacks: {
		async jwt({ token, user }) {
			// Saat login, 'user' akan berisi data dari 'authorize'
			// Kita sisipkan data backend kita ke dalam token JWT milik NextAuth
			if (user) {
				token.accessToken = user.token;
				token.id = user._id;
				token.nama = user.nama;
			}
			return token;
		},
		async session({ session, token }) {
			// Sediakan data di sisi klien
			session.user.id = token.id;
			session.user.nama = token.nama;
			session.user.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
	secret: process.env.NEXTAUTH_SECRET, // Sekret baru untuk NextAuth
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
