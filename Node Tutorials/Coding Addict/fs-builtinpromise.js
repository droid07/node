const path = require('path');
const fs = require('fs').promises;

const start = async () => {
  await fs.writeFile(
    path.join(__dirname, 'content', 'inbuiltpromise.txt'),
    'so this is awesome, node has an inbuilt promise based stuff 🔥'
  );

  const data = await fs.readFile(
    path.join(__dirname, 'content', 'inbuiltpromise.txt'),
    'utf-8'
  );
  console.log(data);
};

start();
