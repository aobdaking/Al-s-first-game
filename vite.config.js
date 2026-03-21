import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base path so assets load correctly on GitLab Pages (or any sub-path)
  base: './',
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
