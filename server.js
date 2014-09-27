var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var partials = require('express-partials');

var db = require('./app/config/db');
var User = require('./app/config/models/user');
var handler = require('./app/request-handler');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // console.log("Connected to MONGODB!");
});

var port = process.env.PORT || 8000;

app.use(partials());
app.use(cors());
app.use(bodyParser.json()); // app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// require('./app/routes')(app); //configure routes


app.post('/signup', handler.signupUser);

app.post('/login', handler.loginUser);

app.post('/create', handler.createTransaction);

app.post('/release', handler.releaseKey);

app.post('/transactions', handler.getTransactions);


app.listen(port);
console.log('app listening in on port ', port);
exports = module.exports = app; //expose app

