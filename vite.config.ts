import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  build: {
    target: 'chrome63',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'index',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd', 'polaris-react-component'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDom',
          antd: 'antd',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    global: {},
  },
  server: {
    port: 4399,
  },
});
