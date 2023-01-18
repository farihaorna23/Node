const fs = require("fs");
const path = require("path");

let files = ["createFile", "readFile", "updateFile", "deleteFile"];
let fileExt = ".js";
let fileTemplate = `const fs = require("fs")`;
let targetFolder = "src";

//check if folder exist cause we are going to create files in the targetfolder
if (fs.existsSync(targetFolder)) {
  generateFile();
} else {
  //create folder, if folder doesn't exist
  fs.mkdir(path.join(__dirname, targetFolder), err => {
    if (err) {
      console.error(err);
      console.log(`Failed to create Folder ${targetFolder}`);
    } else {
      console.log(`Successfully created folder ${targetFolder}`);
      //after creating folder, generate files
      generateFile();
    }
  });
}

function generateFile() {
  files.forEach(file => {
    fs.writeFile(
      path.join(__dirname, targetFolder, `${file}${fileExt}`),
      fileTemplate,
      err => {
        if (err) {
          console.error(err);
          console.log(`Failed to delete ${file}${fileExt}`);
        } else {
          console.log(`Succesfully deleted ${file}${fileExt}`);
        }
      }
    );
  });
}
