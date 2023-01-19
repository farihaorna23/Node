const { EventEmitter } = require("events");
const result = new EventEmitter();

//when the specific event is triggered, call the handler function
result.on("correct", val => {
  console.log(`${val} was correct`); //12 was correct
});
result.on("incorrect", val => {
  console.log(`${val} was incorrect`);
});

//like calling a function?
//triggering an event and passing a value
result.emit("correct", 12);

//20:00
