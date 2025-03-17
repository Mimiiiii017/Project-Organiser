import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://diy-project-organizer-default-rtdb.europe-west1.firebasedatabase.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // Ensure GitHub Pages loads assets correctly
  base: process.env.NODE_ENV === 'production' ? '/Project-Organiser/' : '/',
  build: {
    assetsDir: 'assets',
    outDir: 'dist', // Ensure the output directory is correct
  },
});
