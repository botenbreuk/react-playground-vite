import react from '@vitejs/plugin-react-swc';
import dns from 'dns';
import * as path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

// Used to change 127.0.0.1 to localhost for node version prior to 17
dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint src --ext js,jsx,ts,tsx --max-warnings=0"'
      },
      enableBuild: false
    })
  ],
  root: path.resolve(__dirname),
  build: {
    emptyOutDir: true,
    outDir: './build',
    minify: 'terser',
    terserOptions: { output: { comments: false } },
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo?.name?.split('.').at(1);
          if (
            /png|jpe?g|svg|gif|tiff|ttf|woff|woff2|eot|bmp|ico/i.test(
              `${extType}`
            )
          ) {
            extType = 'img';
          }
          return `static/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js'
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    VITE_VERSION: JSON.stringify(process.env.npm_package_version)
  }
}));
