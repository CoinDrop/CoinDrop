var path = require('path');
var User = require('./config/models/user.model.js');
var Transaction = require('./config/models/transaction.model.js');
var express = require('express');
var Q = require('q');
var jwt = require('jwt-simple');
var btcUtil = require('./bitcoinUtilities.js');

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
      console.log('GET ALL SERVER SIDE');
      Transaction.find(function(err, transactions) {
        if(err) {
          res.send(err);
        }
        res.json(transactions);
      });
    })
    .post(function(req, res) {
      var greeting = req.body.greeting;
      var otherUsername = req.body.otherUsername;
      var btc = req.body.btc;
      var memo = req.body.memo;
      var me = req.body.me;
      var create;
      var newTransaction;

      var findTransaction = Q.nbind(Transaction.findOne, Transaction);
      var findUser = Q.nbind(User.findOne, User);

      findTransaction({ otherUsername: otherUsername, memo: memo, greeting: greeting, btc: btc, me: me})
        .then(function(transaction) {
        var wallet = btcUtil.makeWallet();
          if(transaction) {
            next(new Error('Transaction already Exists'));
          } else {
            var deal = new Transaction({
              otherUsername: otherUsername,
              me: me,
              memo: memo,
              greeting: greeting,
              btc: btc,
              address: wallet.address,
              key1: wallet.privateKey1,
              key2: 'n/a'
            });
            console.log('inside find transaction *******:', deal);
            deal.save();
              findUser({otherUsername: otherUsername})
                .then(function(user) {
                  if(found) {
                    var otherUserDeal  = new Transaction({
                      memo: memo,
                      greeting: greeting,
                      btc: btc,
                      me: otherUsername,
                      otherUsername: me,
                      address: wallet.addres,
                      key1: 'n/a',
                      key2: wallet.privateKey2
                    });
                    otherUserDeal.save();
                  }
                })
            }
        })
        .then(function(transaction) {
          res.json({message: 'NEW TRANSACTION IS CREATED'});
        })
        .fail(function(error) {
          next(error);
        });
      });

  router.route('/transactions/:_id')
    .get(function(req, res) {
      console.log('INSIDE SERVER FOR TRANS ID:', req.params);
      Transaction.findById(req.params._id, function(err, transaction) {
        if(err) {
          res.send(err);
        } else {
          res.json(transaction);
        }
      });
    });







    
  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.use('/api', router);
};


