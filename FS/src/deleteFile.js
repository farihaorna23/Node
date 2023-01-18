const { unlink } = require("fs");

//delete a file
unlink("HelloWorld.txt", err => {
  if (err) {
    console.error(err);
  } else {
    console.log("deleted");
  }
});

//to delete a folder use rm. Node version above 11
//To delete a folder with files -> {recursive : true}
