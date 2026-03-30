/** URLs for files in `public/` — must include Vite `base` on GitHub Pages subpaths. */
export function withBase(path) {
  const p = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${p}`;
}
