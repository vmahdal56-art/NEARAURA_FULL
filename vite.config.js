import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Ensures the build is optimized and clean
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    // Helpful for local testing
    port: 3000,
    open: true
  }
})