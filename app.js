var express 	= require('express');
var bodyparser 	= require('body-parser');
var cors 		= require('cors');

var app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended : true }));

app.use('/users', require('./routes/users'));

app.get('/', function(req, res, next){
	res.status(200).json({status: 'ok'});
});

app.listen(80, function(){
	console.log('listem server on port 80');
});

module.exports = app;