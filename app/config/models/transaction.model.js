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

module.exports = mongoose.model('Transaction', TransactionSchema);
