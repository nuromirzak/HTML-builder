const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(outputDir, 'bundle.css');

async function createCssBundle(stylesDir, outputFile) {
  try {
    const outputDir = path.dirname(outputFile);
    await fs.promises.mkdir(outputDir, { recursive: true });

    const files = await fs.promises.readdir(stylesDir, { withFileTypes: true });
    const cssFiles = files.filter(
      (file) => file.isFile() && path.extname(file.name) === '.css',
    );

    let bundleContent = '';

    for (const file of cssFiles) {
      const filePath = path.join(stylesDir, file.name);
      const content = await fs.promises.readFile(filePath, 'utf-8');
      bundleContent += content + '\n';
    }

    await fs.promises.writeFile(outputFile, bundleContent);
    console.log('bundle.css has been created successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
}

createCssBundle(stylesDir, outputFile);

module.exports = createCssBundle;
