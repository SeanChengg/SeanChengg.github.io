import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Absolute path from site root so scripts/images load even when the URL is
// /runaway-teapot (no trailing slash) — relative ./assets/ would wrongly resolve to /assets/.
// For GitHub Pages, if the site is not at domain root, change this to e.g. "/repo-name/runaway-teapot/".
export default defineConfig({
  base: "/runaway-teapot/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname),
    emptyOutDir: false,
  },
  server: {
    port: 3000,
    host: true,
  },
});
