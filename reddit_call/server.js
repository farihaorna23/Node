const fs = require("fs");
const path = require("path");

const books = [
  {
    title: "The Notebook",
    author: "Nicholas Sparks"
  },
  {
    title: "Percy Jackson",
    author: "Rick Rodian"
  },
  {
    title: "Twilight",
    author: "Stephen Meyers"
  },
  {
    title: "Harry Potter",
    author: "J K Rowling"
  },
  {
    title: "The Selection",
    author: "Kiera Cass"
  }
];

const fileName = path.join(__dirname, "./chirps.json");

//Write the array to a file in the root of the project called chirps.json.
fs.writeFile(fileName, JSON.stringify(books), err => {
  if (err) {
    console.error(err);
  } else {
    console.log("Content written");
  }
});

//reads the file and outputs the chirps to the console
fs.readFile(fileName, (err, content) => {
  if (err) {
    console.error(err);
  } else {
    //content is buffer
    //store the buffer in an array and then conact and convert to string and parse it to json for access
    let body = [];
    body.push(content);
    let books = JSON.parse(Buffer.concat(body).toString());
    books.forEach(book => {
      console.log(`The title of the book is ${book.title} by ${book.author}`);
    });
  }
});
