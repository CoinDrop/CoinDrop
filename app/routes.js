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

// Given a user object, redact all double-underscore properties, replacing
// them with undecorated properties this user is authorized to see.
var sanitizeUser = function(user) {
  // Hide all seller keys from this user's buys unless this user has been refunded.
  var ar = user.buying;
  var i;
  for (i = 0 ; i < ar.length ; i++) {
    ar[i].buyerKey = ar[i].__kBuyer;
    if (ar[i].status === 'to buyer') ar[i].sellerKey = ar[i].__kSeller;
    delete ar[i].__kBuyer;
    delete ar[i].__kSeller;
  }
  // Hide all buyer keys from this user's sells unless this user has been paid.
  for (i = 0 ; i < ar.length ; i++) {
    ar[i].sellerKey = ar[i].__kSeller;
    if (ar[i].status === 'to seller') ar[i].buyerKey = ar[i].__kBuyer;
    delete ar[i].__kBuyer;
    delete ar[i].__kSeller;
  }
  return user;
};

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
      User.findById(jwt.decode(req.headers.authorization, secret).id, function(err, user){
        if(user) {
          next();
        // if(err)
        //   res.status(404);
        //   return res.send('Not allowed');
        }
        next();
      });
    } else {
      res.status(404);
      // res.send('Not allowed');
      // res.end('not allowed');
    }
  });

  router.route('/signup')
    .post(function(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      var newUser;
      console.log('INSIDE SERVER /SINGUP ROUTE: ', req.body);

      Q.nbind(User.findOne, User)({username:username})
        .then(function(err, user) {
          if(user) return res.json(new Error('User already exists.', err));
          newUser = {username:username, password:password, email:email};
          console.log('BEGIN CREATING NEW USER: ', newUser);
          // create = Q.nbind(User.create, User);
          User.create(newUser, function(err, user) {
            if (err) console.log('ERROR CREATING NEW USER: ', err);
            console.log('CREATED NEW USER: ', user);
            if(err) return res.json(new Error('Error creating user!', err));
            req.user_id = user._id;
            req.session.regenerate(function (err) {
              res.json({user:user, token:req.sessionID});
            });
          }
        })
        .catch(function (err) {
          console.log('ERROR IN /SIGNUP ROUTE: ', err);
          res.json(err);
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
      console.log('INSIDE /LOGIN ROUTE - (username): ', username);
      Q.nbind(User.findOne, User)( {username:username} )
        .then(function(user) {
          if (!user) throw new Error('Username not found.');
          user.pwComparePromise(password).then(function(isMatch) {
            if (isMatch) { // Password is approved.
              req.user_id = user._id;
              req.session.regenerate(function (err) {
                res.json({user:user, token:req.sessionID});
              });
            } else {
              console.log('PASSWORD MISMATCH - (user.username): ', user.username);
            }
          });
        })
        .catch(function (error) {
          console.log('ERROR IN /LOGIN ROUTE: ', err);
          res.json(error);
        });
    });


  router.route('/users/:id/deals')
    .get(function(req, res) {
      User.findById(req.params.id)
        .populate('buying selling').exec(function(err, user) {
          user = sanitizeUser(user);
          console.log('GETTING ALL BUYS AND SELLS:', err || user);
          res.json(err || user);
        });
    });


  router.route('/deals/new')
    .get(function(req, res) {
      Deal.find(function(err, deals) {
        if(err) {
          res.send(err);
        } else {
          res.json(deals);
        }
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
      var findDeal = Q.nbind(Deal.findOne, Deal);
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: sellerName})
      .then(function (sellerUser) {
        if(sellerUser) {
          sellerId = sellerUser._id;
          var wallet = btcUtil.makeWallet(2, 3);
          newDeal = {
            buyer:       buyerId,
            seller:      sellerId,
            greeting:    greeting,
            memo:        memo,
            btc:         btc,
            address:     wallet.address,
            buyerKey:    wallet.privateKeys[0],
            sellerKey:   wallet.privateKeys[1],
            thirdKey:    wallet.privateKeys[2],
            publicHexes: wallet.publicHexes,
            n:           wallet.n
          };
          console.log('NEW DEAL IN SERVER THIRD THIRD THIRD:', newDeal);
          Deal.create(newDeal, function (err, deal) {
            console.log('REQUEST HERE', newDeal);
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
//         .then(function (sellerUser) {
//           if(sellerUser) {
//             var wallet = btcUtil.makeWallet();
//             sellerId = sellerUser._id;
//             var deal = {
//               buyer: buyerId,
//               seller: sellerId,
//               greeting: greeting,
//               memo: memo,
//               btc: btc,
//               address: wallet.address,
//               buyerKey: wallet.privateKey1,
//               sellerKey: wallet.privateKey2
//             };
//             Deal.create(deal, function (err, deal) {
//               if(err) res.json(err);
//               else {
//                 sellerUser.selling.push(deal._id);
//                 sellerUser.save();
//                 User.findOne({_id: buyerId}, function (err, buyerUser) {
//                   if(err) {
//                     console.log('ERROR: ', err);
//                     res.json(err);
//                   } else {
//                     console.log('INSIDE SAVING BUYING FOR BUYER:', buyerUser);
//                     buyerUser.buying.push(deal._id);
//                     buyerUser.save();
//                   }
//                 });
//               }
//             });
//           }
//         })
//         .catch(function(err) {
//           res.json(err);
        }
      })
      .catch(function(err) {
        res.json(err);
      });
    });

  router.route('/deals/:dealId')
    .get(function(req, res) {
      Deal.find({_id: req.params.dealId}, function(err, deal) {
        if(err) res.send(err);
        else res.json(deal);


      Q.nbind(User.findOne, User)( {username: sellerName} )
        .then(function (sellerUser) {
          if(sellerUser) {
            var wallet = btcUtil.makeWallet();
            sellerId = sellerUser._id;
            var deal = {
                buyer: buyerId,
                seller: sellerId,
                greeting: greeting,
                memo: memo,
                btc: btc,
                address: wallet.address,
                buyerKey: wallet.privateKeys[0],
                sellerKey: wallet.privateKeys[1],
                thirdKey: wallet.privateKeys[2],
                publicHexes: wallet.publicHexes,
                n: wallet.n
              };
            };
            Deal.create(deal, function (err, deal) {
              if(err) res.json(err);
              else {
                sellerUser.selling.push(deal._id);
                sellerUser.save();
                User.findOne({_id: buyerId}, function (err, buyerUser) {
                  if(err) {
                    console.log('ERROR: ', err);
                    res.json(err);
                  } else {
                    console.log('INSIDE SAVING BUYING FOR BUYER:', buyerUser);
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

  router.route('/deals/:id')
    .get(function(req, res) {
      Deal.find({_id: req.params.id}, function(err, deal) {
        if (err) res.send(err);
        else res.json(deal);
//         .then(function (sellerUser) {
//           if(sellerUser) {
//             var wallet = btcUtil.makeWallet();
//             sellerId = sellerUser._id;
//             var newDeal = {
//               buyer: buyerId,
//               seller: sellerId,
//               greeting: greeting,
//               memo: memo,
//               btc: btc,
//               address: wallet.address,
//               buyerKey: wallet.privateKey1,
//               sellerKey: wallet.privateKey2
//             };
//             Deal.create(newDeal, function (err, deal) {
//               if(err) {
//                 res.json(err);
//               } else {
//                 sellerUser.selling.push(deal._id);
//                 sellerUser.save();
//                 User.findOne({_id: buyerId}, function (err, buyerUser) {
//                   if(err) {
//                     console.log('EROROROROROROROROORR', err);
//                     res.json(err);
//                   } else {
//                     console.log('INSIDE SAVING BUYING FOR BUYER:', buyerUser);
//                     buyerUser.buying.push(deal._id);
//                     buyerUser.save();
//                   }
//                 });
//               }
//             });
//           }
//         })
//         .catch(function(err) {
//           res.json(err);
//         }
//       );
//     });
//
      });
    });

  // router.get('*', function(req, res) {
  //   res.sendFile(path.join(__dirname, './public/index.html'));
  // });

  app.use('/api', router);
};
