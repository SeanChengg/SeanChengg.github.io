# Quick Figma Setup Guide
## Step-by-Step Instructions

---

## 🎯 Step 1: Create New Design File

1. Open Figma
2. Click "New design file"
3. Name it: **"Head Project - Scrollable"**

---

## 📐 Step 2: Set Up Main Frame

1. **Create Frame**:
   - Press `F` or select Frame tool
   - Choose "Desktop" preset OR
   - Custom size: **1440px × 6000px**
   - Name it: "Desktop - Full Page"

2. **Set Background**:
   - Select frame
   - Fill: **#000000** (Black)

3. **Add Layout Grid**:
   - Select frame
   - Right panel → Layout Grid
   - Type: **Columns**
   - Count: **12**
   - Gutter: **40px**
   - Margin: **120px** (left and right)
   - Color: #FFFFFF at 10% opacity (for visibility)

---

## 🎨 Step 3: Create Color Styles

1. **Create Color Styles** (for easy reuse):
   - Select any shape
   - Fill: #000000 → Create style → Name: "Background - Black"
   - Fill: #0a0a0a → Create style → Name: "Background - Dark Gray 1"
   - Fill: #111111 → Create style → Name: "Background - Dark Gray 2"
   - Fill: #FFFFFF → Create style → Name: "Text - White"

2. **Create Gradient Style**:
   - Create rectangle
   - Fill: Linear Gradient
   - Angle: 135deg
   - Stop 1: #1e2a3a (0%)
   - Stop 2: #2d3e50 (100%)
   - Create style → Name: "Gradient - Hero"

---

## ✍️ Step 4: Create Text Styles

1. **H1 Style**:
   - Create text: "Head Project"
   - Font: Inter or System Font
   - Size: **72px**
   - Weight: **300** (Light)
   - Color: #FFFFFF
   - Create style → Name: "Heading 1 - Hero"

2. **H2 Style**:
   - Create text: "About This Project"
   - Size: **48px**
   - Weight: **300** (Light)
   - Color: #FFFFFF
   - Create style → Name: "Heading 2 - Section"

3. **Body Style**:
   - Create text: "Body text example"
   - Size: **18px**
   - Weight: **400** (Regular)
   - Line Height: **1.8** (32.4px)
   - Color: #FFFFFF at **90% opacity**
   - Create style → Name: "Body - Paragraph"

---

## 📦 Step 5: Create Hero Section

1. **Section Container**:
   - Rectangle: **1440px × 900px**
   - Position: Top of frame (X: 0, Y: 0)
   - Fill: Apply "Gradient - Hero" style
   - Name: "Hero Section"

2. **Content Container** (inside hero):
   - Rectangle: **1200px × auto**
   - Center horizontally (X: 120px)
   - Center vertically (Y: center)
   - Fill: Transparent
   - Name: "Hero Content"

3. **Add Text**:
   - Inside "Hero Content":
   - Text: "Head Project" → Apply "Heading 1 - Hero" style
   - Center align
   - Text: "3D Facial Expression Control System" → 24px, 400 weight, white 80%
   - Position below title, 20px spacing

---

## 📄 Step 6: Create Content Sections

### **Introduction Section**

1. **Section Container**:
   - Rectangle: **1440px × 900px**
   - Position: Below hero (Y: 900px)
   - Fill: Apply "Background - Dark Gray 1" (#0a0a0a)
   - Name: "Introduction Section"

2. **Content Wrapper**:
   - Rectangle: **1200px × auto**
   - Position: X: 120px, Y: 120px from top
   - Padding: 60px left/right (use auto-layout)
   - Name: "Introduction Content"

3. **Add Content**:
   - Heading: "About This Project" → Apply "Heading 2 - Section"
   - Body text (2 paragraphs) → Apply "Body - Paragraph"
   - Spacing: 40px between heading and text, 30px between paragraphs

### **Repeat for Other Sections**:
- Process Section (Background: #111111)
- Technical Section (Background: #0a0a0a)
- Gallery Section (Background: #111111)

---

## 🖼️ Step 7: Create Gallery Section

1. **Gallery Container**:
   - Use Auto Layout (Shift + A)
   - Direction: Horizontal
   - Gap: **40px**
   - Width: **1200px** (centered)
   - Padding: 60px left/right

2. **Gallery Items** (3 items):
   - Rectangle: **Flexible width** (auto-layout will calculate)
   - Height: **400px**
   - Fill: **#222222**
   - Border Radius: **8px**
   - Name: "Gallery Item"

3. **Add Placeholder**:
   - Inside each item: Text "Image 1", "Image 2", "Image 3"
   - Center align, gray color (#666)

---

## 🎮 Step 8: Create ElectronBotStudio Section (Last)

1. **Section Container**:
   - Rectangle: **1440px × 900px**
   - Position: At bottom
   - Fill: Linear Gradient
     - #1e2a3a (0%)
     - #2d3e50 (50%)
     - #34495e (100%)
   - Angle: 135deg
   - Name: "ElectronBotStudio Section"

2. **Heading**:
   - Text: "Interactive 3D Viewer"
   - Apply "Heading 2 - Section" style
   - Center align
   - Position: 60px from top

3. **Viewer Container**:
   - Rectangle: **1440px × 840px** (remaining height)
   - Position: Below heading
   - Fill: #000000 (for 3D viewer background)
   - Name: "3D Viewer Container"
   - Add placeholder text: "ElectronBotStudio Interface"

---

## 🔄 Step 9: Use Auto Layout (Recommended)

For each section:

1. **Select Section Container**
2. **Enable Auto Layout** (Shift + A)
3. **Direction**: Vertical
4. **Padding**: 120px top/bottom, 0 left/right
5. **Alignment**: Center
6. **Spacing**: Auto

This makes sections flexible and easy to adjust!

---

## 📱 Step 10: Create Responsive Variants

### **Tablet Frame (768px)**

1. **Duplicate Desktop Frame**
2. **Resize**: 768px width
3. **Adjust**:
   - Content width: 708px
   - Margins: 30px
   - H1: 48px
   - H2: 36px
   - Body: 16px
   - Gallery: 2 columns
   - Section padding: 80px

### **Mobile Frame (375px)**

1. **Duplicate Desktop Frame**
2. **Resize**: 375px width
3. **Adjust**:
   - Content width: 335px
   - Margins: 20px
   - H1: 36px
   - H2: 28px
   - Body: 16px
   - Gallery: 1 column
   - Section padding: 60px

---

## ✅ Final Checklist

- [ ] Main frame created (1440px × 6000px)
- [ ] Layout grid set up (12 columns)
- [ ] Color styles created
- [ ] Text styles created
- [ ] Hero section complete
- [ ] All content sections created
- [ ] Gallery section with 3 items
- [ ] ElectronBotStudio section (last)
- [ ] Auto-layout applied to sections
- [ ] Responsive variants created (optional)
- [ ] All layers properly named
- [ ] Design matches specifications

---

## 🎨 Visual Reference

```
┌─────────────────────────────────────────┐
│  Frame: 1440px × 6000px                 │
│  ┌───────────────────────────────────┐  │
│  │  Hero (900px) - Gradient          │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Content: 1200px centered    │  │  │
│  │  └─────────────────────────────┘  │  │
│  ├───────────────────────────────────┤  │
│  │  Intro (900px+) - #0a0a0a         │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ Content: 1200px             │  │  │
│  │  └─────────────────────────────┘  │  │
│  ├───────────────────────────────────┤  │
│  │  Process (900px+) - #111          │  │
│  ├───────────────────────────────────┤  │
│  │  Technical (900px+) - #0a0a0a     │  │
│  ├───────────────────────────────────┤  │
│  │  Gallery (900px+) - #111          │  │
│  │  ┌──────┐ ┌──────┐ ┌──────┐     │  │
│  │  │ Item │ │ Item │ │ Item │     │  │
│  │  └──────┘ └──────┘ └──────┘     │  │
│  ├───────────────────────────────────┤  │
│  │  ElectronBotStudio (900px)        │  │
│  │  Gradient Background              │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │ 3D Viewer Full Width         │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 💾 Export Settings

When ready to export assets:

1. **Select element** → Right panel → Export
2. **Settings**:
   - Format: PNG or JPG
   - Size: 2x (for retina displays)
   - Quality: 80-90%

---

You now have everything needed to create this design in Figma! 🎨
