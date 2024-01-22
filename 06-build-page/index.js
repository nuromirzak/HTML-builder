const fs = require('fs');
const path = require('path');
const util = require('util');
const copyDir = require('../04-copy-directory');
const createCssBundle = require('../05-merge-styles');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

const projectDist = path.join(__dirname, 'project-dist');

async function createProjectDist() {
  await mkdir(projectDist, { recursive: true });
}

async function buildHtml() {
  const templatePath = path.join(__dirname, 'template.html');
  let template = await readFile(templatePath, 'utf-8');

  const componentsDir = path.join(__dirname, 'components');
  const components = await readdir(componentsDir);

  for (const component of components) {
    if (path.extname(component) === '.html') {
      const name = path.basename(component, '.html');
      const data = await readFile(path.join(componentsDir, component), 'utf-8');
      template = template.replace(new RegExp(`{{${name}}}`, 'g'), data);
    }
  }

  await writeFile(path.join(projectDist, 'index.html'), template);
}

async function buildPage() {
  await createProjectDist();

  await buildHtml();

  const stylesDir = path.join(__dirname, 'styles');
  const outputFile = path.join(projectDist, 'style.css');

  await createCssBundle(stylesDir, outputFile);

  const srcAssets = path.join(__dirname, 'assets');
  const destAssets = path.join(projectDist, 'assets');
  await copyDir(srcAssets, destAssets);
}

buildPage().catch((err) => console.error(err));
