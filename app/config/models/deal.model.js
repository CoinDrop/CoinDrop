var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var Q = require('q');
var objectId = mongoose.Schema.Types.ObjectId;

var DealSchema = new Schema({
  seller:      {type:objectId, ref:'User'},
  buyer:       {type:objectId, ref:'User'},
  buyerKey:    String,
  sellerKey:   String,
  thirdKey:    String,
  address:     String
  publicHexes: [{type: String}],
  n:           Number,
  memo:        String,
  btc:         {type:String, required:true},
  greeting:    String
});

module.exports = mongoose.model('Deal', DealSchema);
