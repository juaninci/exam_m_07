import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
    // 🚀 AÑADE ESTA SECCIÓN PARA VITEST
  test: {
    globals: true,         // Permite usar 'describe', 'it', 'expect' sin importarlos en cada archivo
    environment: 'jsdom',  // Simula el navegador (DOM) para que Vue pueda renderizarse
  },
})
