# The Runaway Teapot

An Interactive Mechatronic Design project page.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── Sidebar.tsx      # Navigation sidebar
│   │   ├── lib/
│   │   │   ├── cdn.ts           # CDN image URLs
│   │   │   └── utils.ts         # Utility functions
│   │   ├── pages/
│   │   │   └── Home.tsx         # Main page
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Media Assets

All images are hosted on CloudFront CDN and referenced in `client/src/lib/cdn.ts`.
