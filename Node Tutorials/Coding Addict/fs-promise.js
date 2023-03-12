const fs = require('fs');
const path = require('path');

const writeToFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, 'testing .then and .catch ⚡', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

writeToFile(path.join(__dirname, 'content', 'thenTest.txt'))
  .then((data) => {
    console.log('callback fired 🔥');
  })
  .then((data) => {
    fs.readFile(
      path.join(__dirname, 'content', 'thenTest.txt'),
      'utf-8',
      (err, data) => {
        console.log(data);
      }
    );
  })
  .catch((err) => console.log(err));
