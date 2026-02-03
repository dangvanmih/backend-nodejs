const http = require('http'); // node js

const hostname = '127.0.0.1'; //localhost
const port = 3000; // từ 0 - 65655 tránh 80 443 

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n Code learn with me');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
