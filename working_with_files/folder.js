const fs = require("fs");

let directoryPath = "./src";
//check if directory exist
let isDirectory = fs.existsSync(directoryPath);

//if directory exist
if (isDirectory) {
  //delete a directory
  //.rm can be used to delete file and folder. To use rm, nvm use 16.13.0
  fs.rm(directoryPath, { recursive: true }, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Deleted Succesfully");
    }
  });

  //reading a directory
  fs.readdir(directoryPath, (err, contents) => {
    if (err) {
      console.error(err);
    } else {
      console.log(contents); //will return an array. Items are all the files in the directory.
    }
  });
} else {
  //if directory doesn't exist
  fs.mkdir(directoryPath, err => {
    if (err) {
      console.error(err);
    } else {
      console.log("Succesfully created Directory" + directoryPath);
    }
  });
}
