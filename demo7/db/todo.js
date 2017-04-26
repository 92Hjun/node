var mongodb = require('mongodb');
var url ="mongodb://localhost:27017/mydb";

var client = mongodb.MongoClient;

// 저장하기
exports.addTodo = function(todo, callback){
	client.connect(url, function(err, db){
		if(err){
			console.log('addTodo 연결실패');
			callback(err);
			return;
		}
		db.collection('todos').insert(todo, function(err, result){
			if (err) {
				console.log('저장실패');
				callback(err);
				return;
				db.close();
			}
			db.close();
			callback(null);
		});
	});
}
// 전체 조회하기
exports.getAllTodos = function(callback){
	client.connect(url, function(err, db){
		if (err){
			// 연결 실패
			console.log('getAllTodos 연결실패');
			callback(err, null);
			return;
		}
		db.collection('todos').find({}).toArray(function(err, todos){
			if (err){
				// 조회 실패
				console.log('조회실패');
				callback(err, null);
				db.close();
				return;
			}
			//console.log(todos);
			db.close();
			callback(null, todos);

		});
	});
}
// 완료 처리하기
exports.completedTodo = function(id, callback){
	client.connect(url, function(err, db){
		if (err) {
			console.log('completedTodo 연결실패');
			callback(err);
			return;
		}
		var objectId = new mongodb.ObjectId(id);
		db.collection('todos').update({_id:objectId},{$set:{completed:true}}, function(err, result){
			if (err) {
				console.log('완료처리 실패');
				callback(err);
				return;
				db.close();
			}
			db.close();
			callback(null);
		});
	});
}
// 삭제하기
exports.deleteTodo = function(id, callback){
	client.connect(url, function(err, db){
		if (err) {
			console.log('deleteTodo 연결실패');
			callback(err);
			return;
		}
		var objectId = new mongodb.ObjectId(id);
		db.collection('todos').remove({_id:objectId}, function(err, result){
			if (err) {
				console.log('삭제처리 실패');
				callback(err);
				return;
				db.close();
			}
			db.close();
			callback(null);
		});
	});
};
// 하나 조회하기
exports.getTodo = function(id, callback){
	client.connect(url, function(err, db){
		if (err){
			console.log('getTodo 연결실패');
			callback(err, null);
			return;
		}
		var objectId = new mongodb.ObjectId(id);
		db.collection('todos').find({_id:objectId}).toArray(function(err, todo){
			if (err) {
				console.log('todo 조회실패');
				callback(err, null);
				return;
				db.close();
			}
			db.close();
			callback(null, todo[0]);
		});
	});
}