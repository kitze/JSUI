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
  entries = fs.readdirSync(dir);
  return entries.reduce((accum, entry) => {
    if (ignoredFolders.includes(entry)) {
      return accum;
    }

    const fullPath = `${dir}/${entry}`;
    let isFolder = fs.lstatSync(fullPath).isDirectory();

    if (isFolder) {
      return [
        ...accum,
        {
          name: path.basename(fullPath),
          path: fullPath
        },
        ...traverse(fullPath)
      ];
    } else {
      let isNotIgnored = ignoredFiles.every(ignoredFile => fullPath.indexOf(ignoredFile) === -1);
      if (isNotIgnored) {
        const extension = path.extname(fullPath).substring(1);
        let fileObject = {
          name: path.basename(fullPath),
          path: fullPath,
          extension
        };
        accum.push(fileObject);
      }
      return accum;
    }
  }, []);
};

export default traverse;
