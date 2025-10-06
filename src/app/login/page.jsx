'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		try {
			const result = await signIn('credentials', {
				redirect: false,
				username: username,
				password: password,
			});

			if (result.error) {
				setError(result.error || 'Username atau password salah');
			} else {
				router.push('/admin');
			}
		} catch (err) {
			setError('Gagal terhubung ke server.');
		}
	};

	return (
		<div className="bg-gray-100 flex items-center justify-center h-screen">
			<div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
				<div className="text-center mb-8">
					<img src="/logo.png" className="w-20 mx-auto mb-4" alt="Logo" />
					<h1 className="text-2xl font-bold text-gray-800">Dasbor Admin</h1>
				</div>
				<form onSubmit={handleSubmit}>
					{error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</p>}
					<div className="mb-4">
						<label htmlFor="username" className="block text-sm font-medium text-gray-700">
							Username
						</label>
						<input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
					</div>
					<button type="submit" className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
						Masuk
					</button>
				</form>
			</div>
		</div>
	);
}

export default LoginPage;
