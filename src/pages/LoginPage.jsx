import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';

function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const { login } = useAuth(); // Ambil fungsi login dari context

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await login(username, password);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<Helmet>
				<title>Login Admin</title>
			</Helmet>
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
						<button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
							Masuk
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
export default LoginPage;
