# Dennis Snellenberg Template Analysis
## How to Adapt for Your Head Project Page

---

## 🔍 Key Technologies Used

### **1. Locomotive Scroll**
- **Purpose**: Smooth, momentum-based scrolling
- **File**: `assets/js/locomotive-scroll.min.js`
- **CSS**: `assets/css/locomotive-scroll.css`
- **Usage**: `data-scroll`, `data-scroll-section`, `data-scroll-speed` attributes

### **2. GSAP (GreenSock Animation Platform)**
- **Purpose**: Advanced animations and scroll triggers
- **Features**: ScrollTrigger plugin for scroll-based animations
- **Usage**: Timeline animations, scroll-triggered reveals

### **3. Barba.js (Page Transitions)**
- **Purpose**: Smooth page transitions without full reload
- **Usage**: `data-barba="wrapper"`, `data-barba="container"`

### **4. Custom Interactive Elements**
- Magnetic buttons (hover effects)
- Mouse position tracking
- Image reveals on hover
- Loading animations

---

## 📐 Page Structure

### **Standard Project Page Layout:**

```html
<main class="main" id="work-single">
    <div class="main-wrap" data-scroll-container>
        <!-- Header Section -->
        <header class="section case-header" data-scroll-section>
            <!-- Project title, description -->
        </header>
        
        <!-- Intro Section -->
        <section class="section case-intro" data-scroll-section>
            <!-- Introduction text -->
        </section>
        
        <!-- Image/Video Sections -->
        <section class="section case-intro-image" data-scroll-section>
            <!-- Media with parallax effects -->
        </section>
        
        <!-- Content Sections -->
        <section class="section" data-scroll-section>
            <!-- More content -->
        </section>
        
        <!-- Your ElectronBotStudio Section (Last) -->
        <section class="section electronbot-section" data-scroll-section>
            <!-- Your 3D viewer here -->
        </section>
    </div>
</main>
```

---

## 🎨 Key CSS Classes & Patterns

### **Scroll Sections:**
```css
[data-scroll-section] {
    /* Each section that scrolls */
}

[data-scroll] {
    /* Elements with scroll effects */
}

[data-scroll-speed="2"] {
    /* Parallax speed multiplier */
}
```

### **Animation Classes:**
- `.once-in` - Elements that animate in once
- `.block-padding-bottom` - Section spacing
- `.case-header` - Project header style
- `.case-intro` - Introduction section

---

## 🛠️ How to Adapt for Your Head Project

### **Step 1: Copy Essential Files**

Copy these files to your project:
```
denniss-template/
├── assets/
│   ├── css/
│   │   ├── locomotive-scroll.css
│   │   ├── normalize.css
│   │   └── components.css (for buttons, etc.)
│   └── js/
│       └── locomotive-scroll.min.js
```

### **Step 2: Create Your Scrollable Structure**

Replace your current `head.html` with this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Head Project - Sean Cheng</title>
    
    <!-- Locomotive Scroll CSS -->
    <link href="assets/css/locomotive-scroll.css" rel="stylesheet">
    <link href="assets/css/normalize.css" rel="stylesheet">
    
    <!-- Your custom styles -->
    <link href="head-styles.css" rel="stylesheet">
</head>
<body>
    <main class="main">
        <div class="main-wrap" data-scroll-container>
            
            <!-- Hero Section -->
            <section class="section hero-section" data-scroll-section>
                <h1>Head Project</h1>
                <p>3D Facial Expression Control System</p>
            </section>
            
            <!-- Introduction -->
            <section class="section intro-section" data-scroll-section>
                <h2>About This Project</h2>
                <p>Your project description here...</p>
            </section>
            
            <!-- Process/Workflow -->
            <section class="section process-section" data-scroll-section>
                <h2>Process</h2>
                <!-- Your process content -->
            </section>
            
            <!-- Technical Details -->
            <section class="section technical-section" data-scroll-section>
                <h2>Technical Details</h2>
                <!-- Technical information -->
            </section>
            
            <!-- Gallery/Images -->
            <section class="section gallery-section" data-scroll-section>
                <h2>Gallery</h2>
                <!-- Images or videos -->
            </section>
            
            <!-- ElectronBotStudio Section (LAST) -->
            <section class="section electronbot-section" data-scroll-section>
                <h2>Interactive 3D Viewer</h2>
                <!-- Your existing ElectronBotStudio interface here -->
                <div id="electronbot-container">
                    <!-- Paste your current head.html content here -->
                </div>
            </section>
            
        </div>
    </main>
    
    <!-- Locomotive Scroll JS -->
    <script src="assets/js/locomotive-scroll.min.js"></script>
    <script>
        const scroll = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            multiplier: 1,
            class: 'is-revealed'
        });
    </script>
    
    <!-- Your ElectronBotStudio scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script type="module" src="./west_world/js/main.js"></script>
</body>
</html>
```

---

## 🎯 Key Features to Implement

### **1. Smooth Scrolling**
```javascript
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});
```

### **2. Parallax Effects**
```html
<div data-scroll data-scroll-speed="2">
    <!-- Moves slower (parallax) -->
</div>
```

### **3. Scroll-Triggered Animations**
```html
<section class="section once-in" data-scroll-section>
    <!-- Animates in when scrolled into view -->
</section>
```

### **4. Section Spacing**
```css
.section {
    padding: 100px 0;
    min-height: 100vh; /* Optional: full viewport sections */
}
```

---

## 📋 Implementation Checklist

- [ ] Copy Locomotive Scroll files
- [ ] Create new scrollable HTML structure
- [ ] Add `data-scroll-section` to each section
- [ ] Move ElectronBotStudio to last section
- [ ] Add smooth scroll initialization
- [ ] Style sections with proper spacing
- [ ] Add parallax effects to images
- [ ] Test scroll performance
- [ ] Add scroll-triggered animations
- [ ] Make responsive for mobile

---

## 💡 Pro Tips

1. **Start Simple**: Begin with basic scroll, then add effects
2. **Performance**: Use `will-change` CSS property for animated elements
3. **Mobile**: Locomotive Scroll has touch support built-in
4. **Sections**: Each `data-scroll-section` should be a distinct content block
5. **Height**: Sections can be any height - scroll adapts automatically

---

## 🚀 Quick Start Template

I'll create a starter template file for you to use!
