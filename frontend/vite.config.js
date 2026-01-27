// Depois (Usando o plugin padrão para JSX):
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <--- O plugin correto para JS/JSX

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
});
