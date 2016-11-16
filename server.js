var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cfenv = require('cfenv');

// set up mongodb
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url;
if(process.env.NODE_ENV === 'development'){
	url = 'mongodb://localhost:27017/test';
}
else if(process.env.NODE_ENV === 'production'){
	// url = 'mongodb://abhinandan:abhinandan@aws-us-east-1-portal.15.dblayer.com:15615/abhinandan-first?ssl=true';
	url = 'mongodb://abhinandan:abhinandan@aws-us-east-1-portal.15.dblayer.com:15615,aws-us-east-1-portal.16.dblayer.com:15615/abhinandan-first?ssl=true';
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


var insert = function(db, callback, collection, document) {
	db.collection(collection)
	.insertOne(document, function(err, result) {
		assert.equal(err, null);
		console.log("Inserted new", document.constructor.name, "!");
		callback();
	});
};


var login = function(db, callback, account) {
	var cursor = db.collection('accounts')
	.find(account);
	cursor.toArray(callback);
};

var search = function(db, callback, query) {
	console.log('query:',query);
	var cursor = db.collection('recipes')
	.find({name: new RegExp(query, 'i') });
	cursor.toArray(callback);
}

var getRecipes = function(db, callback) {
	var cursor = db.collection('recipes')
	.find();
	cursor.toArray(callback);
}

// app.use(function (req, res, next) {
//     console.log("first middle ware");                                                                                                             
//     next();
// });

app.use('/', express.static(__dirname + '/'));


app.get('/', function (req, res) {
	console.log('got req!');
});


app.post('/recipe-add', (req, res) => {
	console.log('got a post req!\n', req.body);

	MongoClient.connect(url, (err, db) => {
	  assert.equal(null, err);
	  insert(db, () => db.close(), 'recipes', req.body);
	});

	res.send();
});

app.post('/register', function(req, res) {
	console.log('got a post req for new account!\n', req.body);

	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  insert(db, function() { db.close(); }, 'accounts', req.body);
	});

	res.send();
});

app.post('/', function (req, res) {
	// console.log('req.body:', req.body);
	// if(req.body.query) {
	// console.log('term: ',req.body.query.term);
	if(req.body.query) {
		MongoClient.connect(url, function(err, db) {
			console.log('receives req!');
		  assert.equal(null, err);
		  search(db, function(err, resultArr) {
		  	console.log('resultArr:',resultArr);
		  	// console.log('err', err);
		  	if(err == null) {
		  		res.send({resultArr: resultArr.map(function (object, index) { return object.name; })});
		  	}
		  	db.close();
		  	
		  }, req.body.query.term);
		});
	}
});

app.post('/menu', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		console.log('receives req!');
	  assert.equal(null, err);
	  getRecipes(db, function(err, resultArr) {
	  	console.log('resultArr:',resultArr);
	  	if(err == null) {
	  		console.log(resultArr);
	  		res.send({resultArr: resultArr});
	  	}
	  	db.close();
	  	
	  });
	});
});

app.post('/login', function(req, res) {


	MongoClient.connect(url, function(err, db) {
	  assert.equal(null, err);
	  login(db, function(err, documents) {
	  	db.close();
	  	if(err != null)
	  		console.log(err);
	  	if(documents.length === 0) {
	  		console.log('not successful');
	  		res.send({redirect: 'null'});
	  	}
	  	else if(documents.length === 1) {
	  		console.log('successful');
	  		res.send({redirect: '/'});
	  	}
	  	
	  }, req.body);
	});

	console.log('got a post req for login!\n', req.body);
	
});

if(process.env.NODE_ENV === 'production') {
	var appEnv = cfenv.getAppEnv();
	app.listen(appEnv.port, appEnv.bind, function() {
	  console.log("server starting on " + appEnv.url);
	});
}
else if(process.env.NODE_ENV === 'development') {
	app.listen(3000, function() {
	  console.log('Food Geek server listening on port 3000!');
	});

}
