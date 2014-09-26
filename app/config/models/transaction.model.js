var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');

var TransactionSchema = new Schema({
  description: {
    type: String,
  },
  username: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
});

// UserSchema.methods.comparePasswords = function (userPassword) {
//   var defer = Q.defer();
//   var savedPassword = this.password;
//   bcrypt.compare(userPassword, savedPassword, function (err, isMatch) {
//     if(err) {
//       defer.reject(err);
//     } else {
//       defer.resolve(isMatch);
//     }
//   });
//   return defer.promise;
// };

// UserSchema.pre('save', function (next) {
//     var user = this;

//     if(!user.isModified('password')) {
//       return next();
//     }
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//       if(err) {
//         return next(err);
//       }

//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if(err) {
//         return next(err);
//       }
//       user.password = hash;
//       user.salt = salt;
//       next();
//     });
//   });
// });

module.exports = mongoose.model('Transaction', TransactionSchema);
