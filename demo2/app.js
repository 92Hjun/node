var connect = require('connect');

var app = connect();			// connect() 함수는 connect 객체를 반환한다.

// 미들웨어 함수
// Request객체에 새로운 속성을 추가
app.use(function(req,res,next){
	var remoteAddr = req.connection.remoteAddress;
	req['ip'] = remoteAddr;
	next();
});

// 미들웨어 함수 등록
app.use(logger);

// use() 함수에 첫번째 인자가 문자열이면 커넥터는 url과 일치할때만 미들웨어 함수를 실행한다.
app.use('/home', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.end('Home Page');
});
app.use('/about', function(req, res){
	res.setHeader('Content-Type', 'text/plain');
	res.end('About Page');
});
app.use(hello);


app.listen(3000);

// 미들웨어 함수 정의하기
function logger(req, res, next){

	console.log('요청 메소드: ' + req.method);
	console.log('요청 URL: ' + req.url);
	console.log('클라이언트 ip: ' + req.ip);

	next();
}

function hello(req, res, next) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello');
}