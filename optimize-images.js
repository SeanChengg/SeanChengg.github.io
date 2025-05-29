// Image optimization script
// To use: npm install sharp
// Then run: node optimize-images.js

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'images');
const optimizedDir = path.join(__dirname, 'images-optimized');

// Create optimized directory if it doesn't exist
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

// Process all image files
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    return;
  }

  // Filter image files
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
  });

  console.log(`Found ${imageFiles.length} images to optimize`);

  // Process each image
  imageFiles.forEach(file => {
    const inputPath = path.join(imagesDir, file);
    const fileExt = path.extname(file);
    const fileName = path.basename(file, fileExt);
    const outputPath = path.join(optimizedDir, `${fileName}${fileExt}`);
    
    // Get file size before optimization
    const stats = fs.statSync(inputPath);
    const fileSizeBefore = stats.size / 1024; // KB

    // Optimize the image with Sharp
    sharp(inputPath)
      .resize(1920) // Limit max width to 1920px
      .withMetadata() // Preserve metadata
      .toFormat(fileExt === '.png' ? 'png' : 'jpeg', {
        quality: 80,
        progressive: true,
        optimizeScans: true,
        mozjpeg: true
      })
      .toFile(outputPath)
      .then(() => {
        // Get file size after optimization
        const optimizedStats = fs.statSync(outputPath);
        const fileSizeAfter = optimizedStats.size / 1024; // KB
        const savings = ((fileSizeBefore - fileSizeAfter) / fileSizeBefore * 100).toFixed(1);
        
        console.log(`✅ ${file}: ${fileSizeBefore.toFixed(1)} KB → ${fileSizeAfter.toFixed(1)} KB (${savings}% saved)`);
      })
      .catch(err => {
        console.error(`❌ Error optimizing ${file}:`, err);
      });
  });
});

console.log('Image optimization started. Please wait...'); 