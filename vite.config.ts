import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	preview: {
		port: 10000,
		host: true,
	},
	server: {
		port: 10000,
		host: true,
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
	},
});
