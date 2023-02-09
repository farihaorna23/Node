//before
const http = require("http");

http
  .createServer((req, res) => {
    const { method, url } = req;
    const chunks = [];

    req
      .on("error", err => {
        console.error(err);
        req.writeHead(400, { "Content-Type": "text/html" });
        req.write("An error occurred on the server :(");
        req.end();
      })
      .on("data", chunk => chunks.push(chunk))
      .on("end", () => {
        const body = Buffer.concat(chunks).toString();

        res.on("error", err => {
          console.error(err);
          req.writeHead(500, { "Content-Type": "text/html" });
          req.write("An error occurred on the server :(");
          req.end();
        });

        const responseBody = { method, url, body };

        // Echoes responseBody back to the client
        // Included are the request method (GET, POST, PUT, DELETE, etc)
        // Requested URL, and request body

        req.writeHead(200, { "Content-Type": "application/json" });
        req.write(JSON.stringify(responseBody));
        req.end();
      });
  })
  .listen(3000, () => console.log("Server listening on port 3000..."));
//to run this file, remember to comment out one of them
// Since our request and response are both streams (Readable and Writable respectively), we can use our new pipe() method to refactor our echo.
const http = require("http");

http
  .createServer((req, res) => {
    const { method, url } = req;
    const chunks = [];

    req.on("error", err => {
      console.error(err);
      req.writeHead(400, { "Content-Type": "text/html" });
      req.write("An error occurred on the server :(");
      req.end();
    });

    res.on("error", err => {
      console.error(err);
      req.writeHead(500, { "Content-Type": "text/html" });
      req.write("An error occurred on the server :(");
      req.end();
    });

    //read from the request and write down the content from request to res. Echoing.
    req.pipe(res);
  })
  .listen(3000, () => console.log("Server listening on port 3000..."));
