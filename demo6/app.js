// mongodb 모듈을 포함시키기
var mongodb = require('mongodb');

// url = "mongodb://ip주소:포트번호/데이터베이스이름"
var url = "mongodb://localhost:27017/mydb";

// mongodb Client객체 획득하기
// mongodb client는 실행중인 mongodb의 연결을 지원하는 객체다.
var client = mongodb.MongoClient;

// client.connection(url, function(err, db){ ... })
// 지정된 url이 가르키는 db와 연결이 성공하면 err는 undifind이다.
// db에는 연결된 몽고DB를 대상으로 CRUD작업을 수행할 수 있는 
// db.collection('컬렉션이름').insert();
// db.collection('컬렉션이름').insertOne();

client.connect(url, function(err, db){
	if (err){
		err.stack;
		return;
	}
	db.collection('contacts').removeMany();
	console.log('모든 연락처 삭제');
	db.close();
});

client.connect(url, function(err, db){
	if(err) {
		console.log(err.stack);
		return;
	}
	var contactData = [
		{name:'홍길동',phone:'010-1111-1111', email:'hong@gmail.com'},
		{name:'이순신',phone:'010-1111-2222', email:'lee@gmail.com'},
		{name:'김유신',phone:'010-1111-3333', email:'kim@gmail.com'}
	];

	db.collection('contacts').insertMany(contactData);

	db.close();
	console.log('새로운 연락처 정보 저장');
});

client.connect(url, function(err, db){
	if (err) {
		console.log(err.stack);
		return;
	}

	// db.collection('컬렉션명').find({쿼리}).toArray(함수)
	// toArray는 조회된 결과를 배열로 반환해서 콜백함수의 매개변수로 전달된다.
	db.collection('contacts').find({name:'김유신'},{fields:{name:1}}).toArray(function(err, docs){
		if (err){
			console.log(err.stack);
			return;
		}
		console.log(docs);
		db.close();
	});
});