import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const stylelint =
    mode === 'development'
      ? {
          lintCommand: 'stylelint ./src/**/*.{css,scss}',
          dev: {
            logLevel: []
          }
        }
      : undefined;

  return {
    server: {
      port: 3000,
      open: true
    },
    plugins: [
      react(),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint src --ext js,jsx,ts,tsx --max-warnings=0"'
        },
        stylelint
      })
    ],
    define: {
      VITE_VERSION: JSON.stringify(process.env.npm_package_version)
    }
  };
});
