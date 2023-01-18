const { writeFile } = require("fs");
let content = "Hello World";
writeFile("./HelloWorld.txt", content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Success");
  }
});
