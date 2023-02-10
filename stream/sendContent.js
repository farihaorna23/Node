const fs = require("fs");

//creating a readble stream
//the files needs to exist
const fromSrc = fs.createReadStream("text1.txt");
//creating a writeable stream
const toSrc = fs.createWriteStream("text2.txt");

//read from fromSrc and write it to toSrc
//response body of createServer is writeable stream and request body is a readable stream
//fromSrc.pipe(res)
//readablestream.pipe(writeablestream)
fromSrc.pipe(toSrc);
