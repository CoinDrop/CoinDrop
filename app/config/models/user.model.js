var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');
var SALT_WORK_FACTOR = 10;
var objectId = mongoose.Schema.Types.ObjectId;
var deal = require('./deal.model.js');

var UserSchema = new Schema({
  username: { type:String, required:true, unique:true },
  password: { type:String, required:true},
  email: { type:String, required:true },
  selling: [{ type:objectId, ref:'Deal' }],
  buying: [{ type:objectId, ref:'Deal' }]
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
    //generate a salt
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
