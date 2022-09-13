import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'chrome63',
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'index',
      fileName: 'index'
    },
    rollupOptions: {
      external: ["react", "react-dom", "antd", "classnames"],
      output: {
        globals: {
          'react': 'React', 
          'react-dom': 'reactDom', 
          "antd": "antd",
          'classnames': 'classnames'
        }
      }
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  define: {
    global: {}
  }
})
