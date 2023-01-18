//because modules are object, we can destructure
const { readFile } = require("fs");
readFile("HelloWorld.txt", (err, contents) => {
  if (err) {
    console.error(err);
  } else {
    let content = contents.toString(); //decoding
    console.log(content.replace(/l/g, 1));
  }
});
