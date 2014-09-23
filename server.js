var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');


var db = require('./app/config/db');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || db.url;
mongoose.connect(connectionString);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected to MONGODB!");
});


var port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json()); // app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes')(app); //configure routes

app.listen(port);
console.log('app listening in on port ', port);
exports = module.exports = app; //expose app

