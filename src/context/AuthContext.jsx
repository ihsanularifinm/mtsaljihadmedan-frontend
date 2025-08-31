import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		// Cek localStorage saat aplikasi pertama kali dimuat
		const storedUserInfo = localStorage.getItem('userInfo');
		if (storedUserInfo) {
			setUserInfo(JSON.parse(storedUserInfo));
		}
		setLoading(false);
	}, []);

	// Fungsi untuk login
	const login = async (username, password) => {
		try {
			const { data } = await axios.post('http://localhost:5000/api/users/login', { username, password });
			setUserInfo(data);
			localStorage.setItem('userInfo', JSON.stringify(data));
			navigate('/admin'); // Arahkan ke dasbor admin setelah login
		} catch (error) {
			console.error('Login gagal:', error);
			throw new Error(error.response.data.message || 'Login Gagal');
		}
	};

	// Fungsi untuk logout
	const logout = () => {
		setUserInfo(null);
		localStorage.removeItem('userInfo');
		navigate('/login'); // Arahkan ke halaman login setelah logout
	};

	return <AuthContext.Provider value={{ userInfo, login, logout }}>{!loading && children}</AuthContext.Provider>;
};

// Hook kustom untuk mempermudah penggunaan context
export const useAuth = () => {
	return useContext(AuthContext);
};
