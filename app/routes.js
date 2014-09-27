var path = require('path');
//var User = require('./config/models/user.model.js');
var express = require('express');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = function(app) {
var router = express.Router();

  router.use(function(req, res, next) {
    console.log('ROUTING IN PROGRESS.');//this will happen everytime a request is sent to the api
    next();//make sure we go to the next routes and don't stop here
  });

  //server routes here
  router.route('/signup')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var create;
      var newUser;
      console.log('INSIDE SERVER /SINGUP ROUTE: ', req.body);

      var findOne = Q.nbind(User.findOne, User);
      findOne({username: username})
        .then(function(user) {
          if(user) {
            next(new Error('User already exists!'));
          } else {
            create = Q.nbind(User.create, User);
            newUser = {
              username: username,
              password: password,
              email: email
            };
            return create(newUser);
          }
        })
        .then(function (user) {
          // var token = jwt.encode(user, 'secret');
          res.json({message: 'SIGNING UP NEW USER'});
        })
        .fail(function (error) {
          next(error);
        });
    })

    .get(function(req, res) {
      User.find(function(err, users) {
        if(err) {
          res.send(err);
        }
        res.json(users);
      });
    });

  router.route('/login')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;

      console.log('INSIDE SERVER ROUTES FOR /LOGIN: ', req.body);
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: username})
      .then(function (user) {
        if(!user) {
          next(new Error('User does not exist'));
        } else {
          console.log('inside find user');
          return user.comparePasswords(password);
        }
      })
      .then(function (foundUser) {
        if(foundUser) {
          // var token = jwt.encode(foundUser, 'secret');
          // res.json({token: token});
          console.log('FOUND USER');
          res.json({message: 'USER FOUND'});
        }
      })
      .fail(function (error) {
        next(error);
      });
    });

  router.route('/transactions')
    .get(function(req, res) {
      Transaction.find(function(err, transactions) {
        if(err) {
          res.send(err);
        }
        res.json(transactions);
      });
    });
    
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.use('/api', router);
};
