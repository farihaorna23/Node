// Node.js is event driven. We can harness the power of events by listening for, and handling events with functions
// The EventEmitter class can be imported from the events module, and used to create our own EventEmitter instance for creating and handling events
// Fire an event with the emit("event") method.
//Listen and handle an event with the on("event", handleEvent) method

const { EventEmitter } = require("events");
const result = new EventEmitter();

//when the specific event is triggered, call the handler function
//on is adding listener to an event
result.on("correct", val => {
  console.log(`${val} was correct`); //12 was correct
});
result.on("incorrect", val => {
  console.log(`${val} was incorrect`);
});

//like calling a function?
//triggering an event and passing a value for the handler function
result.emit("correct", 12);

//will emit an eveit every 5 seconds
result.on("start", () => {
  setTimeout(() => {
    //to get a number between 0-10
    let num = Math.round(Math.random() * 10);
    if (num < 5) {
      result.emit("correct", num); //triggering an event
    } else {
      result.emit("incorrect", num); //triggering an event
    }
  }, 5000);
});

//will only run once, handle it once and then remove it. Doesn't matter how many times you emit the event
//with on, the function will keep on running every 5 second
result.once("start", () => {
  setTimeout(() => {
    //to get a number between 0-10
    let num = Math.round(Math.random() * 10);
    if (num < 5) {
      result.emit("correct", num);
    } else {
      result.emit("incorrect", num);
    }
  }, 5000);
  result.emit("start");
});

result.emit("start");
