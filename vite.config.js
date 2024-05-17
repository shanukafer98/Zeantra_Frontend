import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
  },
  define: {
    'process.env.ENDPOINT': JSON.stringify('http://16.171.31.24:8001'),
  },
});
