import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
  plugins: [
    laravel({
       input: 'resources/react/pages/index.jsx',
      refresh: true,
    }),
  ],
  server: {
    port: 3000, // Porta diferente do Laravel
  },
});
