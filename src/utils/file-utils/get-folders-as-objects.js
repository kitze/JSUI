const fs = window.require('fs');
const path = window.require('path');

const ignoredFiles = [
  'instruction.md',
  'image.png',
  'video.mp4',
  'yarn.lock',
  'favicon.ico',
  'preview.js',
  '.DS_Store',
  'manifest.json'
];

const ignoredFolders = ['node_modules', '.git', '.idea', 'build', 'dist'];

let entries;

const traverse = dir => {
  const structure = [];
  entries = fs.readdirSync(dir);
  entries.forEach(entry => {
    if (ignoredFolders.includes(entry)) {
      return false;
    }
    const fullPath = `${dir}/${entry}`;
    let isFolder = fs.lstatSync(fullPath).isDirectory();

    if (isFolder) {
      return structure.push({
        name: path.basename(fullPath),
        contents: traverse(fullPath)
      });
    } else {
      let isNotIgnored = ignoredFiles.every(ignoredFile => fullPath.indexOf(ignoredFile) === -1);
      if (isNotIgnored) {
        const extension = path.extname(fullPath).substring(1);
        return structure.push({
          name: path.basename(fullPath),
          path: fullPath,
          extension
        });
      }
    }
  });
  return structure;
};

export default traverse;
