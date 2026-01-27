// postcss.config.js
// NOVO/CORRETO
export default {
  plugins: {
    // Use a string do pacote instalado, não apenas "tailwindcss"
    '@tailwindcss/postcss': {}, 
    'autoprefixer': {},
  },
};