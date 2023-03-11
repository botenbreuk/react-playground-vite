import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint src --ext js,jsx,ts,tsx --max-warnings=0"'
      },
      stylelint: {
        lintCommand: 'stylelint ./src/**/*.{css,scss}'
      }
    })
  ]
});
