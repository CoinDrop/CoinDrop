// Utilities for bitcoin logic stored here
var Bitcoin = require('bitcoinjs-lib');

module.exports.makeWallet = function(){
  var BTCWallet = new Bitcoin.Wallet(null, Bitcoin.networks.testnet);
  var privateKey = BTCWallet.getPrivateKey(0).toWIF();
  var wallet = {
    address: BTCWallet.generateAddress(),
    privateKey1: privateKey.slice(0, 26),
    privateKey2: privateKey.slice(26, 52)
  };
  return wallet;
};
