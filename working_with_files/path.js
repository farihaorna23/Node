const fs = require("fs");
const path = require("path");

let dir = "./src";
console.log(path.parse(dir)); //{ root: '', dir: '.', base: 'src', ext: '', name: 'src' }

//__dirname will give us the aboslute path to the directory that we are in
let dirPath = path.join(__dirname, dir);
console.log(dirPath); ///Users/farihahossain/Desktop/Node/src

//check if dierctory exists
let isDirectory = fs.existsSync(dir);

if (isDirectory) {
  //lets read the directory content if it exist
  fs.readdir(dir, (err, content) => {
    if (err) {
      console.error(err);
    } else {
      console.log(content); //prints empty array because there is no file in the src folder
    }
  });
} else {
  //if the folder doesn't exist, create a new one
  fs.mkdir(dir, err => {
    if (err) {
      console.error(err);
    } else {
      console.error("Succesfully added");
    }
  });
}
