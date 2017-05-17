var fs = require('fs');

var userController = {};
var users = [];

// function to read file
function readFile(){
	users = JSON.parse(fs.readFileSync('./data/db.json', 'UTF8'));
}

function checkData(data){

	let fields = ['name', 'age', 'cars'];

	for (var i = 0; i < fields.length; i++) {
		if(!data[fields[i]]){
			return 'field ' + fields[i] + ' is required';
		}
	}

	return false;
}

function arraySearch(arr,val) {
	for (var i=0; i<arr.length; i++){
		if (arr[i].id === val){
			return i;
		}
	}

	return false;
}
// load users
readFile();

userController.getAll = function(){
	return users;
};

userController.get = function(id){
	return users.filter(function(index) {
		return index.id === id;
	});
};

userController.post = function(data){

	let msg = checkData(data);
	if(msg){
		throw msg;
	}

	users.push({
		"id": 	Math.random(0,9),
		"name": data.name,
		"age": 	data.age,
		"cars": data.cars
	});
};

userController.save = function(id,data){

	let msg = checkData(data);
	if(msg){
		throw msg;
	}

	let index = arraySearch(users,id);
	if(index === false){
		return false;
	}

	users[index] = {
		"id": 	id,
		"name": data.name,
		"age": 	data.age,
		"cars": data.cars
	};

	return true;
};

userController.delete = function(id){

	let index = arraySearch(users,id);
	if(index === false){
		return false;
	}

	console.log(index);
	users.splice(index, 1);

	return true;
};

module.exports = userController;