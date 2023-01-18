const { appendFile } = require("fs");
let content = "\nHello World".repeat(100);
//appendFile doesn't overwrite like writeFile. It adds to the original content
appendFile("HelloWorld.txt", content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Success");
  }
});
