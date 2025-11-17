import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const colorPalette = process.env.VITE_COLOR_PALETTE || "default";

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/scss/variables/_${colorPalette}-palette.scss" as *;
        `,
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      // Use local shim to avoid deprecated React findDOMNode calls in rc-util
      'rc-util/lib/Dom/findDOMNode': '/src/shims/findDOMNode.js'
    },
  },
  optimizeDeps: {
    include: ['antd'],
  },
  define: {
    'process.env' : process.env
  }
});