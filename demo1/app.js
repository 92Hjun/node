// require() 함수는 내장모듈 혹은 서드파티모듈을 
// 이 프로그램에서 사용할 수 있도록 포함시킨다.
var mustache = require('mustache');

var template = "Hello, {{firstname}} {{lastname}}";

var message = mustache.render(template, {
	firstname:"장",
	lastname:"해영"
});

console.log(message);