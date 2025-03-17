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
  // ✅ Ensure correct base path for GitHub Pages
  base: '/Project-Organiser/', // 👈 Change this to match your GitHub repo name
  build: {
    assetsDir: 'assets', // Keeps assets organized
    outDir: 'dist', // Ensure build output is in "dist"
  },
});
