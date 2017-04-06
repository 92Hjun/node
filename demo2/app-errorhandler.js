var connect = require('connect');

var app = connect();			// 커넥터객체 생성하기

// 정상처리 미들웨어
app.use(findUser);
app.use(findPet);


// 404 처리 미들웨어 함수
app.use(function(req,res,next){
	res.setStatusCode = 404;
	res.setHeader('Content-Type','text/plain');
	res.end('404 - Not found');
});

app.use(errorHandler);

app.listen(3000);

var db = {
	users:[
		{name:'홍길동'},
		{name:'이순신'},
		{name:'김유신'},

	],
	pets: [
		{name:'고양이'},
		{name:'강아지'},
		{name:'송아지'},
	]
}
// 에러처리 미들웨어 함수
function findUser(req, res, next){
	// 요청 url : /user/1
	var match = req.url.match(/^\/user\/(.+)/);
	console.log('match: ' + match);
	if (match){
		var user = db.users[match[1]];
		if (user){
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(user));
		}else {

			// 에러를 발생시킨다.
			var err = new Error('User not found');
			err.notfound = true;

			// 에러를 담아서 다음 미들웨어 함수를 실행한다.
			next(err);
		}
	} else {
		// 다음미들웨어 실행
		next();
	}
};
function findPet(req, res, next){
	// 요청 url : /pat/1
	var match = req.url.match(/^\/pet\/(.+)/);
	console.log('match: ' + match);
	if (match){
		var pet = db.pets[match[1]];
		if (pet){
			res.setHeader('Content-Type','application/json');
			res.end(JSON.stringify(pet));
		}else {

			// 에러를 발생시킨다.
			var err = new Error('Pet not found');
			err.notfound = true;
			err.message = "펫이 없음..";
			// 에러를 담아서 다음 미들웨어 함수를 실행한다.
			next(err);
		}
	} else {
		// 다음미들웨어 실행
		next();
	}
};

// 에러 발생시 실행되는 미들웨어 함수
// 에러처리 미들웨어 함수는 매개변수를 4개 가진다.
function errorHandler(err, req, res, next){
	console.log(err);

	if(err.notfound){
		res.setHeader('Content-Type', 'text/plain');
		res.setStatusCode = 400;
		res.end('Invalid User/Pet Index');
	}else{
		res.setHeader('Content-Type', 'text/plain');
		res.setStatusCode = 500;
		res.end('Server Error');	
	}
};