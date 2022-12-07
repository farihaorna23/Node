//Running js in local computer
//console.log("Hello");

const http = require("http");

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Hello, testing from the server");
    response.end();
  })
  .listen(5000, () => {
    console.log("Server Running...");
  });
