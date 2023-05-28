import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: './src',
    publicDir: '../public',
    build: {
        outDir: '../dist',
        target: 'es2015',
    },
    server: {
        port: 3000,
    },
});
