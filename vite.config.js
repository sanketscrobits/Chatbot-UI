import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: 'chatbot-widget.[ext]',
      },
    },
    cssCodeSplit: false,
  },
})
