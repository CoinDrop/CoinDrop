var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');

var TransactionSchema = new Schema({
  memo: {
    type: String,
  },
  otherUsername: {
    type: String,
    required: true
  },
  btc: {
    type: String,
    required: true
  },
  greeting: {
    type: String
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
