const fs = require('fs');
const path = require('path');

const readFilesRecursively = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error reading the directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file.name);

      if (file.isDirectory()) {
        readFilesRecursively(filePath);
      } else {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error retrieving file stats:', err);
            return;
          }

          const fileName = path.basename(filePath, path.extname(filePath));
          const fileExtension = path.extname(filePath).slice(1);
          const fileBytesCount = stats.size;

          console.log(
            `${fileName} - ${fileExtension} - ${fileBytesCount} bytes`,
          );
        });
      }
    });
  });
};

const secretFolderPath = path.join(__dirname, 'secret-folder');
readFilesRecursively(secretFolderPath);
