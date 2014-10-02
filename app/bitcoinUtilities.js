// Utilities for bitcoin logic stored here
var Bitcoin = require('bitcoinjs-lib');

module.exports.makeWallet = function(n, m){

  // create m private keys
  // store m private keys and pub key hexes
  // redeem script from n
  // use redeem script for building wallet

  var privateKeys = [];

  for( var i = 0; i < m; i++ ){
    privateKeys.push(Bitcoin.ECKey.makeRandom());
  }

  var publicKeys = privateKeys.map(function(key){ return key.pub });

  var redeemScript = Bitcoin.scripts.multisigOutput(n, publicKeys);
  var scriptPublicKey = Bitcoin.scripts.scriptHashOutput(redeemScript.getHash());

  var wallet = {
    address: Bitcoin.Address.fromOutputScript(scriptPublicKey, Bitcoin.networks.testnet).toString(),
    privateKeys: privateKeys.map(function(key){ return key.toWIF(Bitcoin.networks.testnet) }),
    publicHexes: publicKeys.map(function(pubKey){ return pubKey.toHex() }),
    n: n
  }

  return wallet;
};
