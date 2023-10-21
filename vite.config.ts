import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/tax-calculator/': {
        target: 'http://localhost:5000/tax-calculator/',
        changeOrigin: true
      },
    },
    watch: {
      usePolling: true,
    },
    host: true,
  }
})
