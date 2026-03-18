# Runaway Teapot — All Images & SVGs Used

Extracted and documented from the Runaway_Teapot_Clean page.

---

## Local Extracted Files

All CDN images have been downloaded to `client/assets/extracted/`:

| File | Source | Used In |
|------|--------|---------|
| `teapot_hero.webp` | CloudFront CDN | Hero section (optimized) |
| `teapot_hero_full.png` | CloudFront CDN | Hero section (full-res) |
| `teapot_concept.webp` | CloudFront CDN | Concept section |
| `teapot_concept_full.png` | CloudFront CDN | Concept section (full-res) |
| `teapot_components.webp` | CloudFront CDN | Components section |
| `teapot_prototype.webp` | CloudFront CDN | Prototype section |
| `teapot_brewing.webp` | CloudFront CDN | Brewing section |
| `instagram.svg` | Inline SVG (extracted) | Footer social link |
| `linkedin.svg` | Inline SVG (extracted) | Footer social link |
| `grain-texture.svg` | CSS data URI (extracted) | Body background (index.css) |

---

## Original CDN URLs

```
teapot_hero:     https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_hero-7MuyABqmpxohaSFhTEBsSP.webp
teapot_prototype: https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_prototype-P9id3fyWChfScrvMYGM2bd.webp
teapot_concept:   https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_concept-CRKv6L3oCee73ARacX57pt.webp
teapot_components: https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_components-DFFVn2Ectjri4HGEWJchvM.webp
teapot_brewing:   https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_brewing-dby3Tu8HGLJLkCc5bP6bDR.webp
teapot_hero_full: https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_hero-HesC652JKKXBbXG4ijxVGa.png
teapot_concept_full: https://d2xsxph8kpxj0f.cloudfront.net/.../teapot_concept-NPtsfWc6jv9XwVPT3z4bH6.png
```

---

## Inline Assets (in code)

- **Instagram icon** — `client/src/lib/cdn.ts` (data URI)
- **LinkedIn icon** — `client/src/lib/cdn.ts` (data URI)
- **Grain texture** — `client/src/index.css` (data URI in `background-image`)

---

## Summary

| Type | Count |
|------|-------|
| WebP images | 5 |
| PNG images | 2 |
| SVG icons | 2 (extracted from data URIs) |
| SVG texture | 1 (extracted from CSS) |
