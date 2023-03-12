const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url);
  res.write('<h1>Wrelcome</h1>');
  res.end();
});

server.listen(5000);
