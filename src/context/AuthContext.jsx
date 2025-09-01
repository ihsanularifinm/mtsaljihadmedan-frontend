import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const storedUserInfo = localStorage.getItem('userInfo');
		if (storedUserInfo) {
			setUserInfo(JSON.parse(storedUserInfo));
		}
		setLoading(false);
	}, []);

	const login = async (username, password) => {
		try {
			const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, { username, password });
			setUserInfo(data);
			localStorage.setItem('userInfo', JSON.stringify(data));
			navigate('/admin');
		} catch (error) {
			console.error('Login gagal:', error);
			if (error.response) {
				throw new Error(error.response.data.message || 'Login Gagal');
			} else {
				throw new Error('Tidak dapat terhubung ke server.');
			}
		}
	};

	const logout = () => {
		setUserInfo(null);
		localStorage.removeItem('userInfo');
		navigate('/login');
	};

	const value = { userInfo, login, logout };

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
