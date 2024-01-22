const fs = require('fs');
const path = require('path');

async function copyDir() {
  const srcDir = path.join(__dirname, 'files');
  const destDir = path.join(__dirname, 'files-copy');

  try {
    await fs.promises.mkdir(destDir, { recursive: true });
  } catch (err) {
    console.error('Error creating destination directory:', err);
    return;
  }

  try {
    const files = await fs.promises.readdir(srcDir, { withFileTypes: true });

    const existingFiles = await fs.promises.readdir(destDir);
    for (const file of existingFiles) {
      await fs.promises.unlink(path.join(destDir, file));
    }

    for (const file of files) {
      const srcFilePath = path.join(srcDir, file.name);
      const destFilePath = path.join(destDir, file.name);
      await fs.promises.copyFile(srcFilePath, destFilePath);
    }

    console.log('Directory copied successfully.');
  } catch (err) {
    console.error('Error copying directory:', err);
  }
}

copyDir();
