const fs = require("fs");

fs.rename("./text.txt", "./server.js", err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Renamed Succesfully");
  }
});
