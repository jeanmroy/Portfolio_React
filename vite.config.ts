import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '192.168.0.195', // Ensure it uses your local network IP or 'localhost'
		port: 3000,
		https: false, // Disable HTTPS for development
	},
})
