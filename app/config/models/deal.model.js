var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');
var objectId = mongoose.Schema.Types.ObjectId;


// var DealSchema = new Schema({
//   memo: String,
//   buyer: {
//     type: String,
//     required: true
//   },
//   user: [objectId],
//   seller: {
//     type: String,
//     require: true
//   },
//   btc: {
//     type: String,
//     required: true
//   },
//   greeting: String,
//   address: String,
//   key1: String,
//   key2: String
// });

var DealSchema = new Schema({
  
  seller: {type:objectId,ref:'User'},
  buyer: {type:objectId,ref:'User'},
  buyerKey: String,
  sellerKey: String,
  
  memo: String,
  btc: {
    type: String,
    required: true
  },
  greeting: String,
  address: String
});

module.exports = mongoose.model('Deal', DealSchema);
