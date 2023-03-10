import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { tscPlugin } from 'vite-plugin-tsc-watch';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tscPlugin()]
});
