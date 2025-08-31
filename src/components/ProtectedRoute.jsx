import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute() {
	const { userInfo } = useAuth();

	// Jika ada info user (sudah login), tampilkan halaman yang diminta (Outlet).
	// Jika tidak, arahkan ke halaman login.
	return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
