const fs = require('fs');
const path = require('path');

async function copyDir(srcDir, destDir) {
  try {
    await fs.promises.mkdir(destDir, { recursive: true });
    const entries = await fs.promises.readdir(srcDir, { withFileTypes: true });

    for (let entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(destDir, entry.name);

      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.promises.copyFile(srcPath, destPath);
      }
    }

    console.log('Directory copied successfully.');
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

copyDir(srcDir, destDir);

module.exports = copyDir;
