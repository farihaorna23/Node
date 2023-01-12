const fs = require("fs");
let filePath = "./delete.txt";
fs.unlink(filePath, err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Succesfully deleted");
  }
});
