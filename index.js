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

//mongoose TEST
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("acceptable");
});

var kittySchema = mongoose.Schema({
    name: String,
    message: String
})

kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema)


var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'


var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak() // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});


  var getData = function(){
    var result = [];

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    var results = [];
    for(var i=0; i< kittens.length;i++)
    {
      results[i] = JSON.stringify(kittens[i].message);
    console.log(results[i]);
    }
});

};
getData();
  //mongoose test over






var port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json()); // app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.get('/', function(req,res){
	 Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    var results = [];
    for(var i=0; i< kittens.length;i++)
    {
      results[i] = JSON.stringify(kittens[i].message);
    console.log(results[i]);
    }
});
});
require('./app/routes')(app); //configure routes

app.listen(port);
console.log('app listening in on port ', port);
exports = module.exports = app; //expose app

