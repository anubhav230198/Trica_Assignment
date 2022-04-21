import { airlines, flights_jan_01_2008 } from "./airline-data.js";

//function for getting the optimized data
function saprateByTime(flightCode) {
  const finalObject = flights_jan_01_2008
    //here we are filtering all the flights that are of a same airline
    .filter((flight) => {
      if (
        flight != null &&
        flight.airline &&
        flight.time &&
        flight.airline === flightCode
      ) {
        return true;
      }
    })
    // here we are calculating total flights of that airline in diffrent hours
    .reduce((acc, curr) => {
      if (acc[curr.time.substring(0, 2)]) {
        acc[curr.time.substring(0, 2)] = ++acc[curr.time.substring(0, 2)];
      } else {
        acc[curr.time.substring(0, 2)] = 1;
      }
      return acc;
    }, {});

  mainArray.push(finalObject);
}

//this function adds the flights names in the UI
function addFlightNames(flightCode) {
  let data = airlines[`${flightCode}`];
  document.getElementById(`${flightCode}`).innerHTML = data;
}

//this function fills the data of specific flights in diffrent hours
function addDetailsInCells(index, flightCode) {
  for (var i = 1; i <= 24; i++) {
    let detail = mainArray[index];
    let data;
    if (i <= 10) {
      data = detail[`0${i - 1}`];
    } else if (i > 10) {
      data = detail[`${i - 1}`];
    }

    if (data == undefined) {
      data = "-";
    }
    document.getElementById(`${flightCode}-hour-${i}-p`).innerHTML = data;
  }
}

const mainArray = [];

const keys = Object.getOwnPropertyNames(airlines);

keys.map((flightCode) => {
  saprateByTime(flightCode);
});

console.log(mainArray);

for (var i = 0; i <= 11; i++) {
  let flightCode = keys[i];
  addFlightNames(flightCode);
  addDetailsInCells(i, flightCode);
}
