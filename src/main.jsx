import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async'; // 1. Impor

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HelmetProvider>
			{' '}
			{/* 2. Bungkus App */}
			<App />
		</HelmetProvider>
	</React.StrictMode>,
);
