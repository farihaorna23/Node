//module is an obj, you can destructure
//depending on the url, the server will send a file by reading its content
const http = require("http");
const path = require("path");
const fs = require("fs");
http
  .createServer((req, res) => {
    const { url, method } = req;
    let statusCode = 200;
    let contentType = "application/json";
    let filePath = "./noPage.json";
    if (url == "/json" && method == "GET") {
      filePath = "./obj.json";
    } else if (url == "/csv" && method == "GET") {
      filePath = "./two.csv";
      contentType = "text/html";
    } else {
      statusCode = 400;
    }

    //creating a readable stream
    let src = fs.createReadStream(path.join(__dirname, filePath));
    res.writeHead(statusCode, { "Content-Type": contentType });
    //reading from the src and piping the content to response
    src.pipe(res);
    //don't need to end response. Pipe will trigger an end event for the write stream
  })
  .listen(3000, () => {
    console.log(`Server running...`);
  });
