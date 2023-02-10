//build in modules --> http
const http = require("http");
//local modules -> modules we write. We could have also written it as import {requestRoute} from './module1.js'

http
  .createServer((request, response) => {
    let chunks = [];
    //collecting data chunks
    request.on("data", chunk => {
      chunks.push(chunk);
    });
    //Handle the response, after data chunks has been collected
    request.on("end", () => {
      const { url, method } = request;
      let statusCode = 200;
      let resbody;
      let contentType = "text/html";

      if (url === "/" && method == "GET") {
        resbody = "<h1>Home Page</h1>";
      } else if (url === "/about" && method == "GET") {
        let info = {
          name: "Fariha",
          hobby: "books",
          age: 25,
          gender: "female"
        };
        //converting the object into string so that it can be send back to the client
        resbody = JSON.stringify(info);
        contentType = "application/json";
      } else if (url === "/echo" && method == "POST") {
        let body = Buffer.concat(chunks).toString();
        let echo = {
          method: method,
          url: url,
          body: body
        };
        resbody = JSON.stringify(echo);
        contentType = "application/json";
      } else {
        statusCode = 404;
        resbody = "<h1>Client Error. Route Doesn't Exist.</h1>";
      }
      response.statusCode = statusCode;
      response.setHeader("content-type", contentType);
      response.write(resbody);
      response.end();
    });
  })
  .listen(3000, () => {
    console.log("server running");
  });

// Finish setting up the server
