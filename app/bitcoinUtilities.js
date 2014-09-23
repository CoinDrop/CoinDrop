// Utilities for bitcoin logic stored here
var Bitcoin = require('bitcoinjs-lib');

module.exports.makeWallet = function(){
  var BTCWallet = new Bitcoin.Wallet(null, Bitcoin.networks.testnet);
  var wallet = {
    address: BTCWallet.generateAddress(),
    privateKey: BTCWallet.getPrivateKey(0).toWIF()
  };
  return wallet;
};