// lib 폴더의 currency 포함시키기
var currency = require('./lib/currency');


var dollars = currency.wonToUS(5000000);

console.log("500만 : " + dollars + "달러");

var won = currency.USToWon(dollars);

console.log("4472달러 : " + won. + "원");