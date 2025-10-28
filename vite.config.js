import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    lib: {
      entry: 'src/embed.jsx',
      name: 'ChatbotWidget',
      fileName: 'chatbot-widget',
      formats: ['iife'],
    },
    rollupOptions: {
      external: [],
    },
  },
  define: {
    "process.env": {},
  },
})
