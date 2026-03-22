# How to Edit Imported Web Designs in Figma

## Problem: Can't Click/Edit Images

When you import a webpage using `html.to.design` or similar plugins, images become **flattened/rasterized** and nested in complex groups. This makes them hard to edit directly.

---

## Solution 1: Ungroup Layers (Most Common Fix)

### Steps:
1. **Select the frame** that contains the image you want to edit
2. **Press `Cmd + Shift + G`** (Mac) or `Ctrl + Shift + G` (Windows) to ungroup
3. **Repeat** until you can see the actual image layer
4. **Look for layers named:**
   - `Image` (RECTANGLE with image fill)
   - `FRAME` with image fill
   - Filenames like `Screenshot...avif` or `image.png`

### Once you find the image layer:
- **To replace:** Select it → Right panel → Fill section → Click image → Replace
- **To delete:** Select it → Press `Delete` → Import your own image

---

## Solution 2: Replace Image Fill Directly

### Steps:
1. **Click on the frame** that shows the image (even if it's grouped)
2. **In the right panel**, look for the **Fill** section
3. **Click the image thumbnail** in the Fill section
4. **Choose one:**
   - Click "Replace image" button
   - Drag a new image file onto the fill
   - Paste a copied image (`Cmd + V`)

---

## Solution 3: Use Layers Panel to Navigate

### Steps:
1. **Open Layers Panel** (left sidebar, or `Cmd + Option + 3`)
2. **Expand the nested groups** by clicking the arrow icons
3. **Look for:**
   - Frames with image fills (shown as image icon)
   - Layers named after image files
4. **Click directly on the layer** in the Layers panel
5. **Edit or replace** the image

---

## Solution 4: Delete and Recreate

### Steps:
1. **Select the entire image frame/group**
2. **Note the position and size** (check Properties panel)
3. **Delete it** (`Delete` key)
4. **Import your image:**
   - Drag & drop from Finder/Files
   - Or: `Shift + Cmd + K` → Choose image
5. **Position it** in the same location
6. **Resize** to match original dimensions

---

## Solution 5: Use Figma Plugins

### Recommended Plugins:
1. **"Ungroup All"** - Automatically ungroups all nested groups
2. **"Image Replacer"** - Batch replace images
3. **"Flatten"** - Converts complex groups to simpler structure

### How to use:
1. Go to **Plugins** → **Browse plugins**
2. Search for the plugin name
3. Install and run it on your selection

---

## Tips for Working with Imported Designs

### ✅ Best Practices:
1. **Work from bottom to top** in Layers panel
2. **Use `Cmd + Click`** to select nested elements
3. **Lock layers** you don't want to accidentally move (`Cmd + L`)
4. **Create components** from elements you'll reuse
5. **Use Auto Layout** for responsive sections

### ⚠️ Common Issues:
- **Images are too small/blurry:** They were rasterized at low resolution
  - Solution: Replace with high-res versions
- **Text is not editable:** It was converted to paths
  - Solution: Recreate text layers manually
- **Colors are wrong:** Color profiles may differ
  - Solution: Check color mode (RGB vs CMYK)

---

## Quick Keyboard Shortcuts

| Action | Mac | Windows |
|--------|-----|---------|
| Ungroup | `Cmd + Shift + G` | `Ctrl + Shift + G` |
| Group | `Cmd + G` | `Ctrl + G` |
| Lock Layer | `Cmd + L` | `Ctrl + L` |
| Unlock Layer | `Cmd + Shift + L` | `Ctrl + Shift + L` |
| Select Parent | `Esc` | `Esc` |
| Select All in Frame | `Cmd + A` | `Ctrl + A` |
| Import Image | `Shift + Cmd + K` | `Shift + Ctrl + K` |

---

## For Your Specific Case (Dapper Agency Design)

Based on your imported design, here's what I see:

### Image Locations:
1. **Hero section images** - Nested in `Container` → `Image` frames
2. **Service cards images** - Inside `Container` frames with image fills
3. **Team member photos** - In `Listitem` frames
4. **Background images** - As `RECTANGLE` with image fills

### To Edit:
1. **Select the section** you want to edit
2. **Ungroup** until you see the image layer
3. **Replace** the image fill or delete and add new image
4. **Adjust positioning** if needed

---

## Need Help?

If you're stuck on a specific image:
1. **Select it** in Figma
2. **Tell me which section** (e.g., "hero image", "service card image")
3. **I can help you** navigate to it or suggest the best approach
