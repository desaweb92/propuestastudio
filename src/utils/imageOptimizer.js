const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const optimizeImage = async (inputPath, outputPath, width = 1200, quality = 80) => {
  try {
    await sharp(inputPath)
      .resize(width)
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath)
    
    console.log(`Optimized: ${outputPath}`)
    return true
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error)
    return false
  }
}

const processDirectory = async (dir) => {
  const files = fs.readdirSync(dir)
  
  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath)
    } else if (/\.(jpe?g|png|webp)$/i.test(file)) {
      const outputPath = path.join('optimized', path.relative('src/assets/images', dir), file)
      const outputDir = path.dirname(outputPath)
      
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }
      
      await optimizeImage(fullPath, outputPath)
    }
  }
}

// Ejecutar al construir el proyecto
processDirectory('src/assets/images')