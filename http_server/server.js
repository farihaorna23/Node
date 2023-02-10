const http = require("http");
const fs = require("fs");
const path = require("path");
const port = 3000;

const server = http.createServer((req, res) => {
  const { url, method } = req;
  let statusCode = 200;
  let contentType = "text/html";
  let filePath;

  //The path.extname() method returns the extension of a file path.
  //The index.html file might have css files, pictures, videos, audios that needs to be rendered
  //for static asset
  //google MIME types for refernce
  if (path.extname(url)) {
    //console.log(url); //   /index.css, /images/pic1.png, /agentCruz.png, /music.mp3
    filePath = "./public" + url;
    switch (path.extname(url)) {
      case ".css":
        contentType = "text/css";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".gif":
        contentType = "image/gif";
        break;
      case ".mp4":
        contentType = "video/mp4";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".js":
        contentType = "text/javascript";
        break;
      default:
        contentType = "text/html";
    }
  }
  if (url == "/" && method == "GET") {
    filePath = "./path/index.html";
  } else if (url == "/form" && method == "GET") {
    filePath = "./path/form.html";
  } else if (url == "/table" && method == "GET") {
    filePath = "./path/table.html";
  } else {
    statusCode = 404;
    filePath = "./path/error.html";
  }

  //read the file, get the content and send the content back to the client side
  //response needs to be sent in the format of string/buffer
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(err);
      res.writeHead(5000, { "Content-Type": "text/html" });
      res.write("<h1>Server Error. Try again later. </h1>");
    } else {
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.write(content);
    }
    res.end();
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
