//importing fs module
const fs = require("fs");

let filePath = "./path/table.html";
let content = "This is for the delete file";

//if file doesn't exist, will create a file
//if file does exist, will add new content after the original content
//append file doesn't overwrite unlike the writeFile
fs.appendFile(filePath, content, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Succesfully appended" + filePath);
  }
});
