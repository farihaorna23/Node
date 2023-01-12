//importing fs module
const fs = require("fs");

let filePath = "./delete.txt";
let content = "This is for the delete file";

fs.appendFile(filePath, content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Succesfully appended" + filePath);
  }
});
