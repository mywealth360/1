import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    host: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      timeout: 120000, // Increase timeout to 2 minutes
    },
    watch: {
      usePolling: true, // Enable polling
      interval: 1000, // Check for changes every second
    },
  },
  preview: {
    port: 4173,
    strictPort: false,
    host: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  publicDir: 'public',
  assetsInclude: ['**/*.jpg', '**/*.png', '**/*.svg'],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});