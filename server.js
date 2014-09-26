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

require('./app/routes')(app); //configure routes

app.post('/signup', function(req,res){
 var username = req.body.username;
  var password = req.body.password;
  var newUser = new User({
          username: username,
          password: password
        });
 newUser.save(function(err, newUser) {
    if (err) {
      res.send(500, err);
    }
  res.redirect('/');
  });

});

app.post('/login', function(req,res){
 var username = req.body.username;
 var password = req.body.password;

    User.find({'username': username},function (err, users) {
            if (err) return console.error(err);
           
            if(users[0].password === password)
            {
              console.log("authenticated");
            }

          });
  res.redirect('/');
  });

app.post('/create', function(req,res){
  var username = req.body.username;
  var otherUser = req.body.otherUser;

   User.find({'username': username},function (err, users) {
    if (err) return console.error(err);
    var otherUser = req.body.otherUser;


    var tempWalletObj = {
      address: "1234",
      key1: "key",
      key2: '',
      otherUser: otherUser
    }
    users[0].transactions.push(tempWalletObj);
    users[0].save(function(err, newUser) {


  var username = req.body.username;
  var otherUser = req.body.otherUser;
   User.find({'username': otherUser},function (err, user) {
    if (err) return console.error(err);
    
          var tempWalletforOtherUser = {
      address: "5678",
      key1: 'rkey',
      key2: '',
      otherUser: username
    }

    user[0].transactions.push(tempWalletforOtherUser);

    user[0].save(function(err, newUser) {
      if (err) {
        res.send(500, err);
      }
    res.redirect('/');
    });
  });  


    });
  });
    });
/*
var addTransaction = function(username, transactionObj){

   User.find({'username': username},function (err, users) {
    if (err) return console.error(err);
    var otherUser = req.body.otherUser;



    users[0].transactions.push(transactionObj);;
    users[0].save(function(err, newUser) {
      if (err) {
        res.send(500, err);
      }
    res.redirect('/');
    });
  });

};
*/



app.post('/release', function(req,res){
              var username = req.body.username;
              User.find({'username': username},function (err, senderUser) {
                for(var i = 0; i < senderUser[0].transactions.length; i++)
                {
                  var otherUser = req.body.otherUser;

                  if(senderUser[0].transactions[i]['otherUser'] === otherUser)
                  {
                    var sentKey = senderUser[0].transactions[i]['key1'];
                    break;
                  }
                }


              User.find({'username': otherUser},function (err, users) {
            if (err) return console.error(err);
              users[0].transactions[0]['key2'] = sentKey;
              users[0].save(function(err, newUser) {
                if (err) {res.send(500, err);}
                res.redirect('/');
              });

          });

              });
  });

app.post('/transactions', function(req,res){

              var username = req.body.username;
            User.find({'username': username},function (err, users) {
            if (err) return console.error(err);
                res.send({transactions: users[0].transactions});
            
          });
  });









app.listen(port);
console.log('app listening in on port ', port);
exports = module.exports = app; //expose app

