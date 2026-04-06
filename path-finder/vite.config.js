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
  // Same URL as dev: open http://localhost:5173/path_finder/ — this is the *exact* bundle GitHub Pages serves after `npm run deploy`.
  preview: {
    port: 5173,
    host: true,
  },
})
