const fetch = require("isomorphic-fetch");
const path = require("path");
const fs = require("fs");

let fileExtensions = [".jpg", ".gif", ".png"];

//pull articles from api
async function getArticle() {
  let res = await fetch("https://reddit.com/r/programmingHumor.json");
  let datas = await res.json();
  //If the media of article is a .jpg, .gif, or a .png then downlaod the media
  datas.data.children.forEach(article => {
    if (fileExtensions.includes(path.extname(article.data.url))) {
      downloadMedia(article.data.url, article.data.id);
    }
  });
}

//fetch the media of each article using the url passed by getArticle
//create seperate file for each article's media
async function downloadMedia(src, fileId) {
  let res = await fetch(src);
  //the file that we are going to get is not going to be json
  //and when we write a content to a file, it has to be string or a buffer
  //arrayBuffer creates a new ArrayBuffer object.
  let data = await res.arrayBuffer();
  //create seperate file for each article's media inside the download folder
  let fileName = path.join(__dirname, `./download/fileId${path.extname(src)}`);
  //we write a content to a file, it has to be string or a buffer
  fs.writeFile(fileName, Buffer.from(data), err => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Succefully files are created. The url is ${src}`);
    }
  });
}

try {
  getArticle();
} catch (err) {
  console.error(err);
}
