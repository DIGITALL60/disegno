import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'src', 'assets', 'images');

async function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      console.log(`Optimizing: ${fullPath}`);
      const tempPath = fullPath + '.tmp';
      
      try {
        await sharp(fullPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .jpeg({ quality: 75, progressive: true })
          .toFile(tempPath);
          
        fs.renameSync(tempPath, fullPath);
        console.log(`Done: ${file}`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }
}

processDirectory(baseDir).then(() => console.log('Finished optimizing images.')).catch(console.error);
