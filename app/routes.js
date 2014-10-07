var path = require('path');
var express = require('express');
var Q = require('q');
var app = require('../server.js');
var jwt = require('jwt-simple');
var btcUtil = require('./bitcoinUtilities.js');
var User = require('./config/models/user.model.js');
var Deal = require('./config/models/deal.model.js');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var basicAuth = require('basic-auth');
var mongoose = require('mongoose');
var secret = 'Base-Secret';



module.exports = function(app) {

  var router = express.Router();


  app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'secret',
    store: new mongoStore({
      db: 'test',
    }),
    genid: function(req) {
      return jwt.encode({id: req.user_id}, secret);
    }
  }));

  router.use(function(req, res, next){
    if(req.path === '/signup' || req.path === '/login') {
      return next();
    }
    if(req.headers.authorization){
      console.log(req);
      User.findById(jwt.decode(req.headers.authorization, secret).id, function(err, user){
        if(user) {
          next();
        }
      });
    } else {
      // res.status(404);
      res.redirect('http://www.google.com');
    }
  });

  router.route('/signup')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var newUser;
      // console.log('INSIDE SERVER /SINGUP ROUTE: ', req.body);

      var findOne = Q.nbind(User.findOne, User);
      // console.log('REQ SESSION HERE:', req.session);
      findOne({username: username})
        .then(function(err, user) {
          if(user) {
            return res.json(new Error('User already exists!', err));
          } else {
            newUser = {
              username: username,
              password: password,
              email: email
            };
            // create = Q.nbind(User.create, User);
            User.create(newUser, function(err, user) {
              if(err) {
                return res.json(new Error('Error creating user!', err));
              }
              req.user_id = user._id;
              req.session.regenerate(function (err) {
                res.json({user: user, token: req.sessionID});
              });
            });
          }
        })
        .catch(function (error) {
          res.json(error);
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

      //creates a promise returning function
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: username})
      .then(function (user) {
        if(!user) {
          throw new Error('ERROROROR');
        }
        //if user found
        user.comparePasswords(password).then(function (isMatch) {
        console.log('COMPARING THE PASSWORD HERE:', isMatch);
          if(isMatch) {
            req.user_id = user._id;
            req.session.regenerate(function (err) {
              res.json({user: user, token: req.sessionID});
            });
          }
          else {
            throw new Erorr('MISMATCHED PASSWORD');
          }
        });
      })
      .catch(function (error) {
        res.json(error);
      });
    });


  router.route('/users/:id/deals')
    .get(function(req, res) {
      User.findById(req.params.id)
      .populate('buying selling').exec(function(err, data) {
        if(err) {
          res.json(err);
        } else {
          res.json(data);
        }
      });
    });


  router.route('/deals/new')
    .get(function(req, res) {
      Deal.find(function(err, deals) {
        if(err) {
          res.send(err);
        }
        res.json(deals);
      });
    })

    .post(function(req, res) {
      var buyerId = jwt.decode(req.headers.authorization, secret).id;
      var sellerId;
      var buyerName = req.body.buyer;
      var sellerName = req.body.seller;
      var greeting = req.body.greeting;
      var btc = req.body.btc;
      var memo = req.body.memo;
      var newDeal;
      console.log('NEW DEAL IN SERVER FIRST FIRST FIRST:', req.body);


      var findDeal = Q.nbind(Deal.findOne, Deal);
      var findUser = Q.nbind(User.findOne, User);


      findUser({username: sellerName})
      .then(function (sellerUser) {
        if(sellerUser) {
          sellerId = sellerUser._id;
          console.log('NEW DEAL IN SERVER SECOND SECOND SECOND:', buyerId);
          var wallet = btcUtil.makeWallet();
          newDeal = {
            buyer: buyerId,
            seller: sellerId,
            greeting: greeting,
            memo: memo,
            btc: btc,
            address: wallet.address,
            buyerKey: wallet.privateKey1,
            sellerKey: wallet.privateKey2
          };
          console.log('NEW DEAL IN SERVER THIRD THIRD THIRD:', newDeal);
          Deal.create(newDeal, function (err, deal) {
            if(err) {
              res.json(err);
            } else {
              sellerUser.selling.push(deal._id);
              sellerUser.save();
              User.findOne({_id: buyerId}, function (err, buyerUser) {
                if(err) {
                  res.json(err);
                } else {
                  buyerUser.buying.push(deal._id);
                  buyerUser.save();
                  res.status(200).end();
                }
              });
            }
          });
        }
      })
      .catch(function(err) {
        res.json(err);
      });
    });


  router.route('/deals/:dealId')
    .get(function(req, res) {
      Deal.find({_id: req.params.dealId}, function(err, deal) {
        if(err) {
          res.send(err);
        } else {
          res.json(deal);
        }
      });
    });

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.use('/api', router);
};