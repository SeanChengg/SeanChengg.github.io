import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/path_finder/',
  server: {
    port: 5173,
    host: true,
  },
})
