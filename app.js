const fs = require("fs");

//relative path
let filePath = "./jsQuestions.md";

fs.readFile(filePath, (err, content) => {
  if (err) {
    console.error(err);
  } else {
    //without toString we get a buffer. So we need to decode it
    let stats = content
      .toString()
      .split("")
      .reduce((counts, char) => {
        counts[char] = counts[char] ? counts[char] + 1 : 1;
        return counts;
      }, {});
    console.log(stats);
  }
});
