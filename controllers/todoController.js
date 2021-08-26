//  var bodyParser = require('body-parser');
var express = require('express');
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb+srv://avantika:qlappzm12@todo.348ky.mongodb.net/todo?retryWrites=true&w=majority');

// create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'Send Help'}).save(function(err){
// 	if (err) throw err;
// 	console.log('item saved');
// });

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}, {item: 'check'}];

var urlencodedParser = express.urlencoded({
	extended: false
});
// console.log(data);
module.exports = function(app){

	app.get('/todo', function(req, res){
		Todo.find({}, function(err, data){
			if (err) throw (err);
			res.render('todo', { todos: data });
		});
	});

	app.post('/todo', urlencodedParser, function (req, res) {
		console.log(data);
		console.log("test");
		data.push(req.body);
		// var newTodo = Todo(req.body).save
		var newTodo = Todo(req.body).save(function(err, data){
			if (err) throw err;
			res.json(data);
		});
		// res.json(data);
		// res.render('todo', {todos: data});
	});

	app.delete('/todo:item', function(req, res){
		//delete
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if (err) throw (err);
			res.json(data);
		});
		// data = da;
	});
};
