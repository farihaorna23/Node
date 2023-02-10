//module is an obj, you can destructure
//Objective: depending on the url, the server will send a file by reading its content
//just reading from the file and directly piping the content to the response body without storing it in the memory

//if the content from a readstream needs to be handles, it needs to be read and stored in the memory to be evaluated it, do what needs to be done and send the content as the response
//our request and response are both streams (Readable and Writable respectively), we can use our new pipe() method to directly read the content and pipe the content to the responsebody
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
    //reading from the src (the readable stream)and piping the content to response
    src.pipe(res);
    //don't need to end response. Pipe will trigger an end event for the write stream
  })
  .listen(3000, () => {
    console.log(`Server running...`);
  });
