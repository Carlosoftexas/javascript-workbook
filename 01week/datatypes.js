'use strict'


//1

function getDate() {
  return new Date();
}

getDate();

// 2

function stringConvert(var1) {
  return var1.toString();
}

stringConvert(15);

// 3
function numberConvert(number1) {
  return parseInt(number1);
}

numberConvert("12");

// 4

// Boolean
function isBoolean(boo) {
  return typeof(boo)=="boolean";
}

isBoolean(true);

// Null
function isNull(paraNull) {
  return paraNull===null;
}

isNull(null);

// // Undefined
function isUndefined(undef) {
  return typeof(undef)=="undefined";
}

isUndefined();


// Number

function isNum(num) {
  return typeof(num)=="number";
}

isNum(true);

// NaN

function isNotNumber(notnum) {
  return isNaN(notnum);
}

isNotNumber(true);

// String

function isString(strings) {
  return typeof(strings)=="string";
}

isString(true);


// 5

function add(number1, number2){
  return number1 + number2;
}

add(1, 2);

//6

function twoThingsTrue(para1, para2) {
  if (para1 && para2) {
    return 'twoThingsTrue';
  }
}

twoThingsTrue(true, true);


// // 7

function oneTrueOneFalse(para1, para2) {
  if (!para1 || !para2) {
    return 'oneTrueOneFalse';
  }
}

console.log(oneTrueOneFalse(false, true));
//8

function notTrue(para1, para2) {
  if (!para1 && !para2) {
    return 'bothFalse';
  }
}

notTrue(false, false);
