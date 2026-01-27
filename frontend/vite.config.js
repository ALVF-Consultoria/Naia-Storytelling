// Depois (Usando o plugin padrão para JSX):
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // <--- O plugin correto para JS/JSX

export default defineConfig({
  plugins: [react()],
  base: '/',
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap']
        }
      }
    }
  }
});
