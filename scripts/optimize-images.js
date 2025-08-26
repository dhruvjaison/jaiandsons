const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const MEDIA_DIR = path.join(PUBLIC_DIR, 'media');

// Image directories to process
const IMAGE_DIRS = [
  path.join(MEDIA_DIR, 'features'),
  path.join(MEDIA_DIR, 'amenities'),
  path.join(MEDIA_DIR, 'floor-plans'),
  MEDIA_DIR // Root media directory
];

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// WebP quality settings
const WEBP_QUALITY = 85;
const THUMBNAIL_QUALITY = 70;

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const { width, height, quality = WEBP_QUALITY } = options;
    
    let pipeline = sharp(inputPath);
    
    // Resize if dimensions specified
    if (width || height) {
      pipeline = pipeline.resize(width, height, {
        fit: 'cover',
        position: 'center'
      });
    }
    
    // Convert to WebP
    pipeline = pipeline.webp({ quality });
    
    await pipeline.toFile(outputPath);
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${savings}% smaller)`);
    
    return {
      original: inputStats.size,
      optimized: outputStats.size,
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function createThumbnail(inputPath, outputPath, maxWidth = 400) {
  try {
    await sharp(inputPath)
      .resize(maxWidth, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: THUMBNAIL_QUALITY })
      .toFile(outputPath);
    
    console.log(`📷 Created thumbnail: ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`❌ Error creating thumbnail ${inputPath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`⚠️  Directory not found: ${dirPath}`);
    return { processed: 0, totalSavings: 0 };
  }
  
  const files = fs.readdirSync(dirPath);
  let processed = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    
    // Skip if not a supported image format
    if (!SUPPORTED_FORMATS.includes(ext)) {
      continue;
    }
    
    // Skip if WebP version already exists
    const webpFileName = path.basename(file, ext) + '.webp';
    const webpPath = path.join(dirPath, webpFileName);
    
    if (fs.existsSync(webpPath)) {
      console.log(`⏭️  Skipping ${file} (WebP already exists)`);
      continue;
    }
    
    console.log(`🔄 Processing: ${file}`);
    
    // Optimize main image
    const result = await optimizeImage(filePath, webpPath);
    
    if (result) {
      totalOriginalSize += result.original;
      totalOptimizedSize += result.optimized;
      processed++;
      
      // Create thumbnail for large images
      const stats = fs.statSync(filePath);
      if (stats.size > 500000) { // > 500KB
        const thumbnailName = path.basename(file, ext) + '-thumb.webp';
        const thumbnailPath = path.join(dirPath, thumbnailName);
        await createThumbnail(filePath, thumbnailPath);
      }
    }
  }
  
  return {
    processed,
    totalSavings: totalOriginalSize > 0 ? ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100) : 0,
    originalSize: totalOriginalSize,
    optimizedSize: totalOptimizedSize
  };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  
  let totalProcessed = 0;
  let grandTotalOriginal = 0;
  let grandTotalOptimized = 0;
  
  for (const dir of IMAGE_DIRS) {
    const dirName = path.relative(PUBLIC_DIR, dir);
    console.log(`📁 Processing directory: ${dirName}`);
    
    const result = await processDirectory(dir);
    totalProcessed += result.processed;
    grandTotalOriginal += result.originalSize;
    grandTotalOptimized += result.optimizedSize;
    
    if (result.processed > 0) {
      console.log(`   ✨ Processed ${result.processed} images (${result.totalSavings.toFixed(1)}% savings)\n`);
    } else {
      console.log(`   📝 No new images to process\n`);
    }
  }
  
  console.log('🎉 Image optimization complete!');
  console.log(`📊 Total processed: ${totalProcessed} images`);
  
  if (grandTotalOriginal > 0) {
    const totalSavings = ((grandTotalOriginal - grandTotalOptimized) / grandTotalOriginal * 100);
    console.log(`💾 Total size reduction: ${formatBytes(grandTotalOriginal - grandTotalOptimized)} (${totalSavings.toFixed(1)}%)`);
    console.log(`📈 Original size: ${formatBytes(grandTotalOriginal)}`);
    console.log(`📉 Optimized size: ${formatBytes(grandTotalOptimized)}`);
  }
  
  console.log('\n💡 Tips:');
  console.log('   - Use WebP images in your components for better performance');
  console.log('   - Add lazy loading with loading="lazy" attribute');
  console.log('   - Consider using next/image for automatic optimization');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage, createThumbnail, processDirectory }; 