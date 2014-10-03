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

  //server routes here
  router.use(function(req, res, next){
    if(req.path === '/signup' || req.path === '/login') {
      return next();
    }
    if(req.headers.authorization){
      User.findById(jwt.decode(req.headers.authorization, secret).id, function(err, user){
        if(user) {
          console.log('USER IN HEADERS AUTH:', user);
          next();
        }
      });
    } else {
      res.status(404);
      res.send('Not allowed');
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
          //if no user, hand it off to the next route handler
          if(user.comparePasswords(password)) {
            req.user_id = user._id;
            req.session.regenerate(function (err) {
              //returns jwt token string : req.sessionID
              res.json({user: user, token: req.sessionID});
            });
          }
      })
      .catch(function (error) {
        res.json(error);
      });
    });


  router.route('/users/:id/deals')
    .get(function(req, res) {
      console.log('INSIDE SERVER FOR deal ID:', req.params.id);
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
      console.log('GET ALL SERVER SIDE');
      Deal.find(function(err, deals) {
        if(err) {
          res.send(err);
        }
        res.json(deals);
      });
    })

    .post(function(req, res) {
      var buyerId = jwt.decode(req.headers.authorization, secret).id;
      console.log('&&&&&&&&&&@*#&@#*&$#*@$@#&*$#@$#@$@#$#@$#@$:');
      var buyer = req.body.buyer;
      var seller = req.body.seller;
      var greeting = req.body.greeting;
      var btc = req.body.btc;
      var memo = req.body.memo;
      var newDeal;


      var findDeal = Q.nbind(Deal.findOne, Deal);
      var findUser = Q.nbind(User.findOne, User);

      // findUser({username: buyer})
      // .then(function(err, buyer) {
      //   var buyerId = buyer._id;
      // findUser({username: seller})
      // .then(function(err, seller) {
      //     var sellerId = seller._id;
      // }
      // })

      // User.find({ $or: [{'username': buyer}, {'username': seller}]}, function(err, users) {
      //   if(err) {
      //     throw err;
      //   } else {
      //     console.log('USERS ARE HERE FROM FIND:', users);
      //   }
      // });
        //     newDeal = {
        //       seller: seller,
        //       buyer: buyer,
        //       memo: memo,
        //       greeting: greeting,
        //       btc: btc,
        //       address: wallet.address,
        //       buyerKey: wallet.privateKey1,
        //       sellerKey: wallet.privateKey2
        //     };
        //     Deal.create(newDeal, function(err, deal) {
        //       if(err) {
        //         res.json(err);
        //       } else {
        //         res.json(deal);
        //       }
        //     })
        //   }
        // })
        // .then(function(deal) {
        //   res.json({message: 'NEW TRANSACTION IS CREATED'});
        // })
        // .catch(function(error) {
        //   res.json(error);
        // });
      });


  router.route('/deals/users/:username')
    .get(function(req, res) {
      console.log('INSIDE SERVER FOR USERNAME SEARCH :', req.params);
      Deal.find({$or : [{buyer: req.params.username}, {seller: req.params.username}]}, function(err, deals) {
        if(err) {
          res.send(err);
        } else {
          res.json(deals);
        }
      });
    });

  router.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

  app.use('/api', router);
};


// router.post(function(err, data){
//   buyerid = body.buyer // id
//   sellerid = body.seller //id
  
//   deal.create({buyer:buyerid, seller:sellerid}, function(err, data){
//     deal.findById(data._id).populate('seller').populate('buyer').exec(function(err, thisdeal){
//       thisdeal.buyer.buying.push(thisdeal._id)
//       thisdeal.seller.selling.push(thisdeal._id)
//       thisdeal.seller.save()
//       thisdeal.buyer.save()
//     })
//   })


// });







