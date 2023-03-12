const fs = require('fs');
const path = require('path');

const writeToFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, 'testing async and await ⚡', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const start = async () => {
  await writeToFile(path.join(__dirname, 'content', 'asyncawaitTest.txt'));

  fs.readFile(
    path.join(__dirname, 'content', 'asyncawaitTest.txt'),
    'utf-8',
    (err, data) => {
      console.log(data);
    }
  );
};

start();
