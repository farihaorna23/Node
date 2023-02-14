const fs = require("fs");
const fetch = require("isomorphic-fetch");

let result = [];
fetch("https://reddit.com/r/programmingHumor.json")
  .then(res => res.json())
  .then(datas => {
    datas.data.children.forEach(article => {
      result.push({
        title: article.data.title,
        author: article.data.author,
        url: article.data.url
      });
    });
  })
  .then(() => {
    fs.writeFile("popular-articles.json", JSON.stringify(result), err => {
      if (err) {
        console.error(err);
      } else {
        console.log("Content Written");
      }
    });
  })
  .catch(err => console.error(err));

//console.log(result); will be undefined because fetch is asyncronus and this line will try to access the array before result array has been populated from the api. That is why we have a third then.
