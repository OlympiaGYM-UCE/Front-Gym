import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.20.30.108:8080', // Dirección de tu API
        changeOrigin: true,
        secure: false, // Si la API usa HTTPS, cambia esto a true
      },
    },
  },
});
