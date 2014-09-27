var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WalletSchema = new Schema({
  address: String,
  key1: String,
  key2: String
});

module.exports = mongoose.model('Wallet', WalletSchema);