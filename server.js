var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./app/config/db');
var connectionString = process.env.CUSTOMCONNSTR_MONGOLAB_URI || db.url;
mongoose.connect(connectionString);
console.log(process.env.CUSTOMCONNSTR_MONGOLAB_URI);

var db = mongoose.connection;

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.resolve(__dirname, '../public')));

require('./app/routes')(app); //configure routes

app.listen(port);
console.log('app listening in on port ', port);
exports = module.exports = app; //expose app

