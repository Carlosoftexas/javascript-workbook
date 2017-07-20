'use strict';

// Complete each of the following exercises.
// length
// Create an array called cars which consists of 4 different types of cars. The first car type should be Ford.
// Console.log the length of the array.

var cars = ['Ford', 'Toyota', 'Telsa', 'Lexus'];
console.log(cars);

// concat
// Create another array called more cars with 4 more different types of cars. The last car type should be Honda.
// Use the concat method to combine the cars and moreCars arrays into an array called totalCars.

var cars = ['Ford', 'Toyota', 'Telsa', 'Lexus'];
var moreCars = ['Nissan', 'Chevy', 'Hyundai', 'Honda'];
var totalCars = cars.concat(moreCars);

// indexOf and lastIndexOf

var cars = ['Ford', 'Toyota', 'Telsa', 'Lexus'];
console.log(cars.indexOf('Honda'));

// Use the indexOf method to console.log the index of Honda.
// Use the lastIndexOf method to console.log the index of Ford.
var moreCars = ['Nissan', 'Chevy', 'Hyundai', 'Honda'];
console.log(cars.lastIndexOf('Ford'))


// join
// Use the join method to covert the array totalCars into a string called stringOfCars.
var stringOfCars = totalCars.join('');


// split
// Use the split method to convert stringOfCars back intro an array called totalCars.
var totalCars = stringOfCars.split('');

// reverse
// Use the reverse method to create an array carsInReverse which is the array totalCars in reverse.
var carsInReverse = totalCars.reverse();

// sort
// Use the sort method to put the array carsInReverse into alphabetical order.
carsInReverse.sort();
// Based on the types of cars you used, predict which item in the array should be at index 0.
// Use the following code to confirm or reject your prediction:
// alert(carsInReverse.indexOf('yourPrediction'));
alert(carsInReverse.indexOf('Nissan'))
// slice
// Use the slice method to remove Ford and Honda from the carsInReverse array and move them into a new array called removedCars.

var carsInReverse = removedCars.slice(1, 2);
// splice
// Use the splice method to remove the 2nd and 3rd items in the array carsInReverse and add Ford and Honda in their place.

carInreverse.splice(1, 2);
// push
// Use the push method to add the types of cars that you removed using the splice method to the carsInReverse array.
carsInReverse.push('');

// pop
// Use the pop method to remove and console.log the last item in the array carsInReverse.
carsInReverse.pop(''); 
// shift
// Use the shift method to remove and console.log the first item in the array carsInReverse.
// unshift
// Use the unshift method to add a new type of car to the array carsInReverse.
// forEach
// Create an array called numbers with the following items: 23, 45, 0, 2 Write code that will add 2 to each item in the array numbers
