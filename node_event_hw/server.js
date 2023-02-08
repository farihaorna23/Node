//a server that can handle a post request to an url
// must read and decode the request body (which will contain a name and email), and append the contact information to a csv file (your newsletter list)
const { EventEmitter } = require("events");
const http = require("http");
const fs = require("fs");
//creating a new EventEmitter instance called NewsLetter
const NewsLetter = new EventEmitter();
const port = 3050;

NewsLetter.on("signup", contact => {
  //appendFile will create a file if a file doesn't exist
  //contact is an obj with name and email
  //second parameter of appendFile is the content that we needed to add
  fs.appendFile("contact.csv", `${contact.name} ${contact.email}\n`, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Successfully added content");
    }
  });
});

http
  .createServer((req, res) => {
    const chunks = [];
    //collecting data
    //listenng for the data event
    req.on("data", chunk => chunks.push(chunk));

    //after data has been collected
    ////listenng for the end event
    req.on("end", () => {
      const { url, method } = req;
      let resBody;
      if (url == "/" && method == "GET") {
        resBody = "<h1>Home Page</h1>";
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(resBody);
        res.end();
      } else if (url == "/newsletter_signup" && method == "GET") {
        let content;
        fs.readFile("./form.html", (err, contents) => {
          let response = contents;
          let status = 200;
          let contentType = "text/html";
          if (err) {
            console.error(err);
            status = 500;
            response = "<h1>Server Error. Can't Read</h1>";
          }
          res.writeHead(status, { Content_Type: contentType });
          res.write(response);
          res.end();
        });
      } else if (url == "/newsletter_signup" && method == "POST") {
        try {
          resBody = JSON.parse(Buffer.concat(chunks).toString()); //{name: Fariha, email:far@mail.com}
        } catch (err) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.write(
            JSON.stringify({
              msg: "You didn't give the correct response body details"
            })
          );
          res.end();
        }
        NewsLetter.emit("signup", resBody);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ msg: "Thank You For Siging Up !" }));
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write("<h1>404 Page Not Found</h1>");
        res.end();
      }
    });
  })
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
