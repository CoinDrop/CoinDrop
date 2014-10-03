var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');
var SALT_WORK_FACTOR = 10;
var objectId = mongoose.Schema.Types.ObjectId;
var deal = require('./deal.model.js');

// var UserSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   }
// });

var UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  selling: [{type:objectId, ref: 'Deal'}],
  buying: [{type:objectId, ref: 'Deal'}]
});


UserSchema.methods.comparePasswords = function (userPassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(userPassword, savedPassword, function (err, isMatch) {
    if(err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

UserSchema.pre('save', function (next) {
    var user = this;

    if(!user.isModified('password')) {
      return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if(err) {
        return next(err);
      }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if(err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = User = mongoose.model('User', UserSchema);
// User.find().remove(function(err, data){
//   console.log('user 11 removed')
// })
// deal.findById('542c5c72fc7804da30c93756').populate('buyer').populate('seller').exec(function(err, data){
//   console.log('user', data)
//   // data.selling.push('542c591a73cbbf7f2d8bda6d')
//   // data.save(function(err, data){
//   //   console.log('Saved', data)
//   // })

// })
// User.findById('542c5d2f2443dbb631ca0dc9').populate('selling'), function(err, data){
//   console.log('user', data)
//   // data.selling.push('542c5dea4e671c6132b13ede');
//   // data.save(function(err, data){
//   // })
// })
// User.findById('542c5d2f2443dbb631ca0dc9').populate('selling').populate('buying').exec(function(err, data){
//   console.log('saved 11', data)
  // data.buying.push('542c5f578c3f68c9330e72d8');
  // data.save(function(err, data){
  // })
// })
// deal.find().remove(function(err, data){
//   console.log('deal 6 removed')
// })
// 542c5793884e83e42b544124 11
// 542c57bcbd91c60b2cc52001 15

// User.create({username: 'testuser11', password: 'testpass'}, function(err, data) {
//   console.log('user 11', data)
// })
// User.create({username: 'testuser15', password: 'testpass'}, function(err, data) {
//   console.log('user 11', data)

// })

// deal.create({seller: '542c5d2f2443dbb631ca0dc8', buyer: '542c5d2f2443dbb631ca0dc9', sellerKey: '12345', buyerKey: '1234', btc: '123456'}, function(err, data) {
//   console.log("deal", data);
// })



