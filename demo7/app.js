var path = require('path');				// 경로 관련 모듈
var logger = require('morgan'); 		// 로그 출력 관련 모듈
var express = require('express'); 		// 웹 애플리케이션 미들웨어 지원
var ejs = require('ejs');				// 뷰 템플릿 엔진모듈
var bodyParser = require('body-parser');// 폼 입력값 처리 모듈
var dateformat = require('dateformat'); // 날짜를 지정된 형식의 문자열로 변환하는 모듈

var Todo = require('./db/todo.js');

var app = express();

// 뷰 템플릿 설정
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile); // 템플릿 파일의 확장자를 .html로 사용할 수 있게 한다.

// 정적 컨텐츠(css, js, image 파일) 제공 미들웨어 함수 설정
var staticpath = path.resolve(__dirname, 'public');
app.use(express.static(staticpath));

// 로그를 출력하는 미들웨어 함수 설정
app.use(logger('dev'));

// 폼 입결값을 처리해서 req.body에 저장하는 미들웨어 함수 설정
app.use(bodyParser.urlencoded({extended:true}));


// 라우팅 설정
app.get('/todos', function(req, res, next){
	Todo.getAllTodos(function(err, todos){
		if (err){
			next(err);
			return;
		}
		res.render('index.html', {'todos':todos, 'df':dateformat});
	});

});

app.get('/create', function(req, res){
	res.render('form.html');
});
app.post('/create', function(req, res, next){
	var todo ={
		title: req.body.title,
		type: req.body.type,
		description: req.body.description,
		regdate: new Date(),
		completed: false
	}
	Todo.addTodo(todo, function(err){
		if (err) {
			next(err);
			return;
		}
		res.redirect('/todos');
	});
});

app.get("/completed/:id", function(req, res, next){
	var id = req.params.id;
	Todo.completedTodo(id, function(err){
		if(err){
			next(err);
			return;
		}
		res.redirect('/todos');
	});
});

app.get("/delete/:id", function(req, res, next){
	var id = req.params.id;

	Todo.deleteTodo(id, function(err){
		if (err) {
			next(err);
			return;
		}
		res.redirect('/todos');
	});
});

app.get("/detail/:id", function(req, res, next){
	var id = req.params.id;

	Todo.getTodo(id, function(err, todo){
		if (err) {
			next(err);
			return;
		}
		console.log(todo);
		res.render('detail.html', {'todo':todo, 'df':dateformat});
	});
});

// 요청 url과 일치하는 라우팅 정보가 없을때 에러페이지를 제공하는 미들웨어 함수
app.use(function(req,res){
	res.render('404.html');
});
// 에러발생시 에러를 화면에 표시하는 미들웨어 함수
app.use(function(err, req, res, next){
	console.log(err);
	next(err);
});
// 에러 발생시 사용자에게 에러 페이지를 제공하는 미들웨어 함수
app.use(function(err,req,res,next){
	res.render('500.html')
});


app.listen(3000, function(){
	console.log('Server start...');
});