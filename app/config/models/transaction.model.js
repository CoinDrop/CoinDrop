var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');


var TransactionSchema = new Schema({
  memo: String,
  otherUsername: {
    type: String,
    required: true
  },
  me: {
    type: String,
    require: true
  },
  btc: {
    type: String,
    required: true
  },
  greeting: String,
  address: String,
  key1: String,
  key2: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
