//db is the exported mongo database
var db = require('./config/db');
//User is the exported mongoose schema for users.
var User = require('./config/models/user');
var BTCUtilities = require('./bitcoinUtilities.js');

//Signup User creates and stores a user mongoose document
exports.signupUser = function(req,res){
  var username = req.body.username;
  var password = req.body.password;

  var newUser = new User({
          username: username,
          password: password
        });
  //newUser.save saves the document and then redirects to root.
  //It's extremely important to run the save function.
  //without it there will be no change recorded in the database.
 newUser.save(function(err, newUser) {
    if (err) {
      res.send(500, err);
    }
  res.redirect('/');
  });


};

//loginUser authenticates and logs in a user. Currently does not do much.
//Todo: create basic security and session tokens.
exports.loginUser = function(req,res){
 var username = req.body.username;
 var password = req.body.password;
//User.find searches the mongo database for the User model.
//It retrieves an array of 'users' that match the object query in the first parameter
//The users array is used in the callback function.
//users[0] is used because we know usernames are unique.
//There will only ever be one object in the users array with a username query at index 0.
    User.find({'username': username},function (err, users) {
            if (err) return console.error(err);
           
            if(users[0].password === password)
            {
              console.log("authenticated");
            }

          });
  res.redirect('/');


};

//createTransaction creates a transaction and stores it in the users transaction array.
//It creates a second transaction object for the otherUser and stores it in its array as well.
//Currently the keys are hardcoded in.
exports.createTransaction =  function(req,res){
  var username = req.body.username;
  var otherUser = req.body.otherUser;
  var wallet = BTCUtilities.makeWallet();
  //We find the user that is creating the transaction here
   User.find({'username': username},function (err, users) {
    if (err) return console.error(err);
    var otherUser = req.body.otherUser;

    //here we create a temporary transaction
    var tempWalletObj = {
      address: wallet.address,
      key1: wallet.privateKey1,
      key2: '',
      otherUser: otherUser
    };
    //then we save it into the database after pushing it to the users transaction array
    users[0].transactions.push(tempWalletObj);
    users[0].save(function(err, newUser) {
  var username = req.body.username;
  var otherUser = req.body.otherUser;

  //after the save is complete we find the other user in the database
   User.find({'username': otherUser},function (err, user) {
    if (err) return console.error(err);
    //then we create a second transaction object and store it to save it.
    var tempWalletforOtherUser = {
      address: wallet.address,
      key1: wallet.privateKey2,
      key2: '',
      otherUser: username
    };

    user[0].transactions.push(tempWalletforOtherUser);
    user[0].save(function(err, newUser) {
      if (err) {
        res.send(500, err);
      }
      //then we redirect to root
    res.redirect('/');
    });
  });  


    });
  });
};


//The releaseKey function releases the key to the otherUser.
exports.releaseKey = function(req,res){
              var username = req.body.username;
              //The user is found in the database
              User.find({'username': username},function (err, senderUser) {
          //The database looks for the transaction with the right otherUser variable
                for(var i = 0; i < senderUser[0].transactions.length; i++){
                  var otherUser = req.body.otherUser;

                  if(senderUser[0].transactions[i].otherUser === otherUser){
                    //We retrieve the key that needs to be sent here
                    var sentKey = senderUser[0].transactions[i].key1;
                    break;
                  }
                }
                var otherUser = req.body.otherUser;
                //Then we find the otherUser and give them the key.
              User.find({'username': otherUser},function (err, users) {
            if (err) {res.send(500, err);}
              users[0].transactions[0].key2 = sentKey;
              users[0].save(function(err, newUser) {
                if (err) {res.send(500, err);}
                res.redirect('/');
              });

          });

      });
  };

  //getTransactions just returns a list of transactions from the requested username
exports.getTransactions =  function(req,res){

              var username = req.body.username;
            User.find({'username': username},function (err, users) {
            if (err) return console.error(err);
                res.send({transactions: users[0].transactions});
            
          });

  };
