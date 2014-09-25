var db = require('../db.js');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
username: String,
password: String,
transactions: [{
    address: String,
    key1 : String,
    key2 : String,
    otherUser : String
     }]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
