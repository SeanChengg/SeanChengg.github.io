// CDN URLs for Runaway Teapot assets

// Social icons as inline SVG data URIs
const instagram = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>')}`;

const linkedin = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>')}`;

export const CDN = {
  // Social icons
  instagram,
  linkedin,

  // Runaway Teapot images (hosted on CloudFront)
  teapotHero: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_hero-7MuyABqmpxohaSFhTEBsSP.webp",
  teapotPrototype: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_prototype-P9id3fyWChfScrvMYGM2bd.webp",
  teapotConcept: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_concept-CRKv6L3oCee73ARacX57pt.webp",
  teapotComponents: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_components-DFFVn2Ectjri4HGEWJchvM.webp",
  teapotBrewing: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_brewing-dby3Tu8HGLJLkCc5bP6bDR.webp",

  // High-res versions for hero (base path for GitHub Pages subfolder)
  teapotHeroFull: `${import.meta.env.BASE_URL}teapot_hero_full.png`,
  teapotConceptFull: "https://d2xsxph8kpxj0f.cloudfront.net/310519663449836526/USHBnzKQf8N2zHuZbyb8Ls/teapot_concept-NPtsfWc6jv9XwVPT3z4bH6.png",

  // Assets from public/ (base path for GitHub Pages)
  meccanum1: `${import.meta.env.BASE_URL}Meccanum1.png`,
  meccanum2: `${import.meta.env.BASE_URL}Meccanum2.png`,
  meccanum3: `${import.meta.env.BASE_URL}Meccanum3.png`,
  electronics: `${import.meta.env.BASE_URL}Electronics.png`,
  video: `${import.meta.env.BASE_URL}runaway-teapot-demo.MOV`,
  arrow: `${import.meta.env.BASE_URL}Arrow.svg`,
};
