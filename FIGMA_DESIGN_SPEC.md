# Figma Design Specification
## Head Project - Scrollable Page Template

Use this guide to recreate the scrollable head project page in Figma.

---

## 🎨 Frame Setup

### **Main Frame**
```
Name: "Head Project - Desktop"
Width: 1440px
Height: 6000px (or Auto - will expand as you add content)
Background: #000000 (Black)
```

### **Content Container**
```
Width: 1200px
Position: Centered (120px margins on each side)
```

---

## 📐 Section Specifications

### **1. Hero Section**
```
Height: 100vh (900px for design purposes)
Background: Linear Gradient
  - Color 1: #1e2a3a (Position: 0%)
  - Color 2: #2d3e50 (Position: 100%)
  - Angle: 135deg

Content:
  - Title: "Head Project"
    Font: System Font / Sans-serif
    Size: 72px
    Weight: 300 (Light)
    Color: #FFFFFF
    Alignment: Center
    Position: Vertical center
    
  - Subtitle: "3D Facial Expression Control System"
    Font: System Font / Sans-serif
    Size: 24px
    Weight: 400 (Regular)
    Color: #FFFFFF (80% opacity)
    Alignment: Center
    Position: Below title, 20px spacing
```

### **2. Introduction Section**
```
Height: Auto (min 100vh = 900px)
Background: #0a0a0a (Very dark gray)
Padding: 120px top/bottom, 60px left/right

Content Width: 1200px (centered)

Elements:
  - Heading: "About This Project"
    Size: 48px
    Weight: 300
    Color: #FFFFFF
    Margin Bottom: 40px
    
  - Body Text (2 paragraphs)
    Size: 18px
    Weight: 400
    Color: #FFFFFF (90% opacity)
    Line Height: 1.8
    Margin Bottom: 30px between paragraphs
```

### **3. Process Section**
```
Height: Auto (min 100vh = 900px)
Background: #111111 (Dark gray)
Padding: 120px top/bottom, 60px left/right

Content Width: 1200px (centered)

Same typography as Introduction Section
```

### **4. Technical Details Section**
```
Height: Auto (min 100vh = 900px)
Background: #0a0a0a (Very dark gray)
Padding: 120px top/bottom, 60px left/right

Content Width: 1200px (centered)

Same typography as Introduction Section
```

### **5. Gallery Section**
```
Height: Auto (min 100vh = 900px)
Background: #111111 (Dark gray)
Padding: 120px top/bottom, 60px left/right

Content Width: 1200px (centered)

Grid Layout:
  - 3 columns (desktop)
  - Gap: 40px
  - Item Size: Auto (flexible)
  - Item Height: 400px
  - Item Background: #222222
  - Border Radius: 8px
```

### **6. ElectronBotStudio Section (Last)**
```
Height: 100vh (900px minimum)
Background: Linear Gradient
  - Color 1: #1e2a3a (Position: 0%)
  - Color 2: #2d3e50 (Position: 50%)
  - Color 3: #34495e (Position: 100%)
  - Angle: 135deg

Content:
  - Heading: "Interactive 3D Viewer"
    Size: 48px
    Weight: 300
    Color: #FFFFFF
    Alignment: Center
    Padding: 60px top, 40px bottom
    
  - Container: Full width, remaining height
    Background: Transparent or #000000 (for 3D viewer)
    Height: calc(100vh - 200px)
```

---

## 🎨 Color Palette

```
Primary Background: #000000 (Black)
Section Background 1: #0a0a0a (Very dark gray)
Section Background 2: #111111 (Dark gray)
Gradient Start: #1e2a3a (Dark blue-gray)
Gradient Middle: #2d3e50 (Medium blue-gray)
Gradient End: #34495e (Light blue-gray)

Text Primary: #FFFFFF (White)
Text Secondary: #FFFFFF at 90% opacity
Text Tertiary: #FFFFFF at 80% opacity

Gallery Item: #222222 (Dark gray)
```

---

## 📝 Typography System

### **Headings**
```
H1 (Hero Title):
  - Size: 72px
  - Weight: 300 (Light)
  - Line Height: 1.2
  - Color: #FFFFFF

H2 (Section Headings):
  - Size: 48px
  - Weight: 300 (Light)
  - Line Height: 1.3
  - Color: #FFFFFF
  - Margin Bottom: 40px

H3 (Subheadings):
  - Size: 32px
  - Weight: 400 (Regular)
  - Line Height: 1.4
  - Color: #FFFFFF
```

### **Body Text**
```
Paragraph:
  - Size: 18px
  - Weight: 400 (Regular)
  - Line Height: 1.8
  - Color: #FFFFFF at 90% opacity
  - Margin Bottom: 30px
```

### **Font Family**
```
Primary: System Font Stack
  - -apple-system
  - BlinkMacSystemFont
  - 'Segoe UI'
  - sans-serif

Alternative (if available in Figma):
  - Inter
  - SF Pro Display
  - Helvetica Neue
```

---

## 📏 Spacing System

```
Base Unit: 10px

Spacing Scale:
  - XS: 10px
  - SM: 20px
  - MD: 30px
  - LG: 40px
  - XL: 60px
  - XXL: 120px

Section Padding:
  - Top/Bottom: 120px (XXL)
  - Left/Right: 60px (XL)

Content Padding:
  - Left/Right: 60px (XL)

Element Spacing:
  - Between paragraphs: 30px (MD)
  - Heading to text: 40px (LG)
  - Gallery gap: 40px (LG)
```

---

## 🖼️ Layout Grid

### **Desktop (1440px)**
```
Columns: 12
Gutter: 40px
Margin: 120px (each side)

Content Area: 1200px
  - Uses columns 2-11 (10 columns)
```

### **Tablet (768px)**
```
Columns: 8
Gutter: 24px
Margin: 30px (each side)

Content Area: 708px
```

### **Mobile (375px)**
```
Columns: 4
Gutter: 16px
Margin: 20px (each side)

Content Area: 335px
```

---

## 🎯 Component Specifications

### **Section Container**
```
Width: 100% (1440px)
Min Height: 900px (100vh)
Padding: 120px 60px
Display: Flex
Direction: Column
Justify: Center
Align: Center
```

### **Content Wrapper**
```
Width: 1200px
Max Width: 100%
Margin: 0 auto (centered)
Padding: 0 60px
```

### **Gallery Grid**
```
Display: Grid
Columns: 3 (desktop)
Gap: 40px
Item Aspect Ratio: Flexible
Item Min Height: 400px
Item Background: #222222
Border Radius: 8px
```

---

## 📱 Responsive Breakpoints

### **Desktop: 1440px**
- Full layout as specified above

### **Tablet: 768px - 1024px**
```
- Content width: 708px
- Section padding: 80px top/bottom
- H1: 48px
- H2: 36px
- Body: 16px
- Gallery: 2 columns
```

### **Mobile: 375px - 767px**
```
- Content width: 335px
- Section padding: 60px top/bottom, 30px left/right
- H1: 36px
- H2: 28px
- Body: 16px
- Gallery: 1 column
```

---

## 🎨 Visual Effects (for Reference)

### **Gradients**
```
Hero & ElectronBotStudio:
  Type: Linear
  Angle: 135deg
  Stops:
    - 0%: #1e2a3a
    - 50%: #2d3e50 (ElectronBotStudio only)
    - 100%: #2d3e50 or #34495e
```

### **Shadows** (if needed)
```
Gallery Items:
  - Type: Drop Shadow
  - X: 0
  - Y: 4px
  - Blur: 12px
  - Spread: 0
  - Color: #000000 at 30% opacity
```

---

## 📋 Figma Setup Checklist

### **Step 1: Create Frames**
- [ ] Create main frame: 1440px × 6000px
- [ ] Create content container: 1200px width
- [ ] Set up layout grid (12 columns, 40px gutter, 120px margins)

### **Step 2: Create Sections**
- [ ] Hero section (900px height)
- [ ] Introduction section (900px+ height)
- [ ] Process section (900px+ height)
- [ ] Technical section (900px+ height)
- [ ] Gallery section (900px+ height)
- [ ] ElectronBotStudio section (900px height)

### **Step 3: Typography Styles**
- [ ] Create H1 style (72px, Light, White)
- [ ] Create H2 style (48px, Light, White)
- [ ] Create Body style (18px, Regular, White 90%)

### **Step 4: Color Styles**
- [ ] Create background colors (#000, #0a0a0a, #111)
- [ ] Create gradient styles
- [ ] Create text colors

### **Step 5: Components**
- [ ] Create section container component
- [ ] Create content wrapper component
- [ ] Create gallery item component

### **Step 6: Responsive Variants**
- [ ] Create tablet frame (768px)
- [ ] Create mobile frame (375px)
- [ ] Adjust spacing and typography

---

## 🚀 Quick Start in Figma

1. **Create New File**: "Head Project - Scrollable"

2. **Set Up Frame**:
   - Frame size: 1440 × 6000px
   - Background: #000000
   - Add layout grid (12 columns)

3. **Create First Section (Hero)**:
   - Rectangle: 1440 × 900px
   - Apply gradient background
   - Add text: "Head Project" (72px, center)
   - Add subtitle text below

4. **Duplicate for Other Sections**:
   - Copy hero section
   - Change background color
   - Update text content
   - Adjust height as needed

5. **Add Content Containers**:
   - Rectangle: 1200px width, auto height
   - Center horizontally
   - Add padding: 60px left/right

6. **Create Gallery Grid**:
   - Use auto-layout with 3 columns
   - Gap: 40px
   - Item size: flexible

7. **Final Section (ElectronBotStudio)**:
   - Full width section
   - Gradient background
   - Placeholder for 3D viewer

---

## 💡 Pro Tips

1. **Use Auto Layout**: Makes sections flexible and easy to adjust
2. **Create Styles**: Save colors and typography as styles for consistency
3. **Use Components**: Make reusable section components
4. **Name Layers**: Keep organized with clear naming
5. **Use Constraints**: Set up proper constraints for responsive design
6. **Export Settings**: Set up 2x exports for retina displays

---

## 📐 Exact Measurements Reference

```
Frame: 1440px × 6000px
Content: 1200px (centered, 120px margins)

Hero:
  - Height: 900px
  - Title: 72px, 300 weight
  - Subtitle: 24px, 400 weight
  - Spacing: 20px between title/subtitle

Sections:
  - Padding: 120px vertical, 60px horizontal
  - Heading: 48px, 40px margin bottom
  - Text: 18px, 1.8 line height, 30px margin bottom

Gallery:
  - 3 columns
  - 40px gap
  - 400px item height
  - 8px border radius
```

This specification gives you everything needed to recreate the design in Figma!
