import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    https: true,
    port: 3000,
    cors: true,
  },
  build: {
    sourcemap: true, // Enable source maps
  },
  optimizeDeps: {
    include: ['bootstrap'], // Explicitly include Bootstrap
  },
});
