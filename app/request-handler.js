var db = require('./config/db');
var User = require('./config/models/user');

exports.signupUser = function(req,res){
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

}

exports.loginUser = function(req,res){
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

}

exports.createTransaction =  function(req,res){
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
};


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
exports.releaseKey = function(req,res){
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
  };

exports.getTransactions =  function(req,res){

              var username = req.body.username;
            User.find({'username': username},function (err, users) {
            if (err) return console.error(err);
                res.send({transactions: users[0].transactions});
            
          });
  }