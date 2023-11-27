import http from "node:http";

const server = http.createServer((req, res) => {
  return res.end("Primeiro Projeto NodeJS!");
});

server.listen(3333);
