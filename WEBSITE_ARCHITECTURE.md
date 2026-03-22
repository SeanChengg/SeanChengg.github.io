# Website Architecture & Technology Breakdown
## Sean Cheng Portfolio - https://seanchengg.github.io/

---

## 📁 Project Structure

```
cursor01/
├── index.html                 # Main portfolio homepage (3D carousel)
├── index.css                  # Standalone CSS (if used separately)
├── shared.css                 # Shared styles across pages
├── shared.js                  # Shared JavaScript utilities
│
├── Project Detail Pages:
│   ├── path_finder.html       # Path Finder project
│   ├── shelf.html             # Shelf project
│   ├── head.html              # Head/face project
│   ├── reverse-01.html        # Reverse kinematics ARM project
│   ├── reverse-02.html        # Reverse kinematics continuation
│   ├── Breaking-concept.html  # Wrist/Breaking concept
│   ├── Breaking-direct.html   # Breaking direct variant
│   ├── Breaking.svg.html      # Breaking SVG version
│   ├── Breaking2-direct.html  # Breaking 2 direct
│   ├── Breaking2.svg.html     # Breaking 2 SVG
│   ├── jaw.html               # JAW project
│   ├── jaw2.html              # JAW variant
│   ├── Wrist1.html            # Wrist project page 1
│   ├── Wrist2.html            # Wrist project page 2
│   ├── Wrist3.html            # Wrist project page 3
│   ├── runaway-teapot-01.html # Runaway Teapot project
│   ├── runaway-teapot-02.html # Runaway Teapot continuation
│   └── runaway-teapot-video.html # Runaway Teapot video page
│
├── Next.js Setup (src/):
│   └── src/app/               # Next.js app directory
│       ├── page.js            # Next.js main page
│       ├── layout.js          # Root layout
│       ├── globals.css        # Global styles
│       ├── style.css          # Additional styles
│       ├── figma-design.css   # Figma-exported styles
│       └── slider.css         # Slider component styles
│
├── 3D Model Viewer (west_world/):
│   ├── js/
│   │   ├── ElectronBotStudio.js    # Main 3D robot control
│   │   ├── main.js                # Bootstrap/initialization
│   │   └── orientationCube.js     # 3D orientation helper
│   └── CAD-Model/
│       ├── Emoji/                  # Emoji animation videos
│       └── Head3.0/                # 3D head model files
│
├── Assets:
│   ├── images/                 # All project images (68 files)
│   └── videos/                 # Project videos
│
├── Build Tools:
│   ├── package.json            # Node.js dependencies
│   ├── next.config.js          # Next.js configuration
│   ├── tailwind.config.js      # Tailwind CSS config
│   ├── tsconfig.json           # TypeScript config
│   ├── postcss.config.js       # PostCSS config
│   └── optimize-images.js      # Image optimization script
│
└── Deployment:
    ├── out/                    # Next.js build output
    ├── _headers                # Netlify/Vercel headers
    └── .nojekyll               # GitHub Pages config
```

---

## 🗣️ Languages & Technologies Used

### **1. HTML5**
**Why Used:**
- **Semantic structure**: Provides the foundation for all content
- **Accessibility**: Native semantic elements improve screen reader support
- **SEO-friendly**: Search engines can easily parse HTML structure
- **Universal compatibility**: Works in all browsers without compilation

**Usage in Your Site:**
- Main structure for all pages
- Semantic elements (`<main>`, `<section>`, `<nav>`)
- Data attributes (`data-js="..."`) for JavaScript hooks
- Embedded SVG icons

---

### **2. CSS3**
**Why Used:**
- **Styling & Layout**: Complete visual design control
- **Animations**: Keyframe animations for smooth transitions
- **Responsive Design**: Media queries for mobile/desktop
- **3D Transforms**: CSS 3D transforms for the carousel effect
- **Performance**: Hardware-accelerated CSS animations

**Key CSS Features in Your Site:**
- **3D Carousel**: `transform-style: preserve-3d`, `perspective`
- **Animations**: `@keyframes`, `transition`
- **Gradients**: Background gradients for depth
- **Flexbox/Grid**: Layout systems
- **Custom Properties**: CSS variables for theming

**Files:**
- `index.html` (embedded `<style>` tag)
- `shared.css` (shared styles)
- `index.css` (standalone CSS file)

---

### **3. JavaScript (ES6+)**
**Why Used:**
- **Interactivity**: User interactions, animations, dynamic content
- **DOM Manipulation**: Control HTML elements dynamically
- **Event Handling**: Click, scroll, hover, wheel events
- **Animation Control**: `requestAnimationFrame` for smooth 60fps animations
- **No Build Step**: Vanilla JS works directly in browsers

**Key JavaScript Features in Your Site:**
- **3D Carousel Control**: Manual rotation with scroll, auto-rotation
- **Event Listeners**: Click navigation, hover effects, scroll control
- **Animation Loop**: `requestAnimationFrame` for smooth rotation
- **State Management**: Rotation state, hover state, navigation state
- **Page Transitions**: Fade in/out effects

**Files:**
- Embedded in `index.html` (`<script>` tag)
- `shared.js` (shared utilities)
- `west_world/js/*.js` (3D model viewer)

---

### **4. TypeScript (Optional/Partial)**
**Why Used:**
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Autocomplete, refactoring
- **Code Documentation**: Types serve as inline documentation
- **Scalability**: Easier to maintain large codebases

**Usage:**
- Configured in `tsconfig.json`
- Used in Next.js setup (`src/app/`)
- Type definitions for React/Next.js

**Files:**
- `tsconfig.json` (configuration)
- `next-env.d.ts` (Next.js type definitions)

---

### **5. React (via Next.js)**
**Why Used:**
- **Component-Based**: Reusable UI components
- **State Management**: Efficient UI updates
- **Server-Side Rendering**: Better SEO and performance
- **Modern Development**: Hot reload, fast refresh
- **Ecosystem**: Large library ecosystem

**Usage:**
- Next.js app in `src/app/` directory
- Currently minimal (just a placeholder page)
- Can be expanded for dynamic content

**Files:**
- `src/app/page.js`
- `src/app/layout.js`

---

### **6. Three.js (3D Graphics)**
**Why Used:**
- **3D Rendering**: WebGL-based 3D graphics in browser
- **Model Loading**: GLTF/GLB file support
- **Animations**: 3D object animations
- **Interactivity**: Mouse/touch controls for 3D scenes
- **Performance**: Hardware-accelerated rendering

**Usage:**
- 3D robot model viewer (`west_world/js/ElectronBotStudio.js`)
- Loads GLTF models (Head3.0)
- Camera controls, lighting, materials
- Trajectory visualization

**Files:**
- `west_world/js/ElectronBotStudio.js`
- `head.html` (uses Three.js)

---

### **7. GLTF/GLB (3D Model Format)**
**Why Used:**
- **Efficient**: Binary format, smaller file sizes
- **Standard**: Industry standard for web 3D
- **Rich Data**: Supports animations, materials, textures
- **Web-Optimized**: Designed for web delivery

**Usage:**
- 3D head model (`west_world/CAD-Model/Head3.0/`)
- Robot components
- Animated emoji models

---

### **8. SVG (Scalable Vector Graphics)**
**Why Used:**
- **Scalable**: Vector graphics that scale without quality loss
- **Small File Size**: Often smaller than raster images
- **Stylable**: Can be styled with CSS
- **Interactive**: Can be animated and manipulated with JS

**Usage:**
- Icons (scroll indicators, navigation)
- Embedded in HTML
- Some project pages use SVG versions

---

## 🛠️ Tools & Build Systems

### **1. Next.js 14.1.0**
**Why Used:**
- **React Framework**: Production-ready React framework
- **Static Site Generation**: Pre-render pages for performance
- **File-Based Routing**: Automatic routing from file structure
- **Optimization**: Built-in image optimization, code splitting
- **Deployment**: Easy deployment to Vercel/Netlify

**Configuration:**
- `next.config.js` - Basic configuration
- `package.json` - Dependencies and scripts

---

### **2. Tailwind CSS 3.4.17**
**Why Used:**
- **Utility-First**: Rapid UI development with utility classes
- **Customizable**: Highly configurable design system
- **Performance**: Purges unused CSS in production
- **Responsive**: Built-in responsive design utilities
- **Modern**: Latest CSS features

**Configuration:**
- `tailwind.config.js` - Content paths, theme customization

**Note:** Currently configured but may not be heavily used in main HTML files (using custom CSS instead)

---

### **3. PostCSS 8.5.3**
**Why Used:**
- **CSS Processing**: Transform CSS with JavaScript plugins
- **Autoprefixer**: Automatically adds vendor prefixes
- **Tailwind Integration**: Required for Tailwind CSS
- **Future CSS**: Use future CSS features today

**Configuration:**
- `postcss.config.js` - PostCSS plugins

---

### **4. ESLint 8.0.0**
**Why Used:**
- **Code Quality**: Find and fix JavaScript errors
- **Consistency**: Enforce coding standards
- **Next.js Integration**: `eslint-config-next` for Next.js best practices
- **Catch Bugs**: Identify potential issues before runtime

**Configuration:**
- `eslint.config.mjs` - ESLint rules

---

### **5. Node.js & npm**
**Why Used:**
- **Package Management**: Install and manage dependencies
- **Build Tools**: Run build scripts, development server
- **Modern JavaScript**: Use latest JS features via Babel/transpilers
- **Ecosystem**: Access to millions of packages

**Scripts (from package.json):**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

### **6. Git & GitHub**
**Why Used:**
- **Version Control**: Track changes, collaborate
- **GitHub Pages**: Free hosting for static sites
- **Deployment**: Automatic deployment from repository
- **Backup**: Cloud backup of code

**Deployment:**
- Repository: `seanchengg.github.io`
- Hosting: GitHub Pages
- URL: `https://seanchengg.github.io/index.html`

---

### **7. Figma (Design Tool)**
**Why Used:**
- **Design**: Create visual designs and mockups
- **Export**: Export designs to code
- **Collaboration**: Share designs with team/clients
- **Prototyping**: Interactive prototypes

**Evidence:**
- `figma-export/` folder
- `figma-styles.css` - Exported Figma styles
- `figma-styles.json` - Design tokens

---

### **8. Image Optimization**
**Why Used:**
- **Performance**: Reduce file sizes for faster loading
- **Bandwidth**: Save user bandwidth
- **SEO**: Faster sites rank better

**Tool:**
- `optimize-images.js` - Custom image optimization script
- 68 image files in `images/` folder

---

## 🎯 Architecture Decisions

### **Why Vanilla HTML/CSS/JS for Main Site?**
1. **Performance**: No framework overhead, faster load times
2. **Simplicity**: Easier to understand and maintain
3. **Control**: Full control over every aspect
4. **Compatibility**: Works everywhere, no build step needed
5. **SEO**: Static HTML is perfectly indexed by search engines

### **Why Next.js in Parallel?**
1. **Future Expansion**: Can migrate to React if needed
2. **Modern Development**: Better developer experience
3. **Dynamic Content**: Can add dynamic features later
4. **Learning**: Experiment with modern frameworks

### **Why Three.js for 3D?**
1. **Industry Standard**: Most popular web 3D library
2. **Rich Features**: Lighting, materials, animations, cameras
3. **Performance**: Hardware-accelerated WebGL
4. **Community**: Large community, lots of examples
5. **GLTF Support**: Native support for modern 3D formats

### **Why Separate Project Pages?**
1. **Organization**: Each project gets dedicated space
2. **Performance**: Only load what's needed
3. **SEO**: Better SEO with dedicated URLs
4. **Sharing**: Can share individual project links
5. **Maintainability**: Easier to update individual projects

---

## 📊 Technology Stack Summary

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Markup** | HTML5 | Structure & semantics |
| **Styling** | CSS3 | Visual design & animations |
| **Scripting** | JavaScript (ES6+) | Interactivity & animations |
| **3D Graphics** | Three.js | 3D model rendering |
| **3D Format** | GLTF/GLB | 3D model files |
| **Framework** | Next.js 14 | React framework (optional) |
| **Language** | TypeScript | Type safety (optional) |
| **CSS Framework** | Tailwind CSS | Utility-first CSS |
| **Build Tool** | PostCSS | CSS processing |
| **Linting** | ESLint | Code quality |
| **Package Manager** | npm | Dependency management |
| **Version Control** | Git | Source control |
| **Hosting** | GitHub Pages | Free static hosting |
| **Design Tool** | Figma | Design & export |

---

## 🚀 Development Workflow

1. **Design**: Create designs in Figma
2. **Export**: Export assets and styles from Figma
3. **Code**: Write HTML/CSS/JS in editor
4. **Test**: Test locally (can use `python -m http.server` or Next.js dev server)
5. **Optimize**: Run image optimization scripts
6. **Commit**: Use Git to track changes
7. **Deploy**: Push to GitHub, auto-deploys to GitHub Pages

---

## 💡 Why This Architecture Works

1. **Hybrid Approach**: Combines simple static HTML with modern tools
2. **Performance**: Minimal JavaScript, optimized assets
3. **Flexibility**: Can add React/Next.js features when needed
4. **Maintainability**: Clear structure, organized files
5. **Scalability**: Easy to add new projects or features
6. **Cost-Effective**: Free hosting on GitHub Pages
7. **Modern**: Uses latest web standards and best practices

---

## 🔄 Current State

- **Main Site**: Vanilla HTML/CSS/JS (fully functional)
- **Next.js Setup**: Configured but minimal usage
- **3D Viewer**: Fully functional Three.js implementation
- **Project Pages**: Individual HTML pages for each project
- **Deployment**: Live on GitHub Pages

This architecture gives you the best of both worlds: simple, fast static pages with the option to add modern framework features when needed!
