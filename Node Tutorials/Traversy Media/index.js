const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(
      path.join(__dirname, 'public', 'index.html'),
      'utf-8',
      (err, data) => {
        if (err) throw err;
        res.end(data);
      }
    );
  }

  if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile(
      path.join(__dirname, 'public', 'about.html'),
      'utf-8',
      (err, data) => {
        if (err) throw err;
        res.end(data);
      }
    );
  }

  if (req.url === '/api/users') {
    const users = [
      { name: 'lisa', age: 25 },
      { name: 'rose', age: 25 },
      { name: 'jennie', age: 26 },
      { name: 'jisoo', age: 27 },
    ];

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(users));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running at ${PORT}`));
