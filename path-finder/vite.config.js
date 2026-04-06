import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//
// GitHub Pages URL: …/path_finder/index.html — Vite `base` must stay `/path_finder/`.
// Dev: use http://localhost:5174/path_finder/ (NOT `/` alone) or assets/`withBase()` break and layout/text won’t match production.
// Do not change `base` for “local convenience”; use `npm run dev` (opens the correct path) or `npm run preview:github`.
export default defineConfig({
  plugins: [react()],
  base: '/path_finder/',
  server: {
    port: 5174,
    host: true,
    open: '/path_finder/',
  },
  preview: {
    port: 5174,
    host: true,
    open: '/path_finder/',
  },
})
