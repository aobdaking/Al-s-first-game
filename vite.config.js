import { defineConfig } from 'vite';

export default defineConfig({
  // Use correct repository name as base path for GitHub Pages
  base: '/Al-s-first-game/',
  server: {
    port: 3000,
    open: true,
    host: true, // Listen on all local IPs
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    target: 'esnext' // Modern browser target for optimal performance
  }
});
