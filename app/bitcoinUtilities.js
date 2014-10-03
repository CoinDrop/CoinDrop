// Utilities for bitcoin logic stored here
var Bitcoin = require('bitcoinjs-lib');
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: true
});

module.exports.makeWallet = function(n, m){

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

module.exports.withdraw = function(n, userKeys, publicHexes, destination, amount, fee){

  fee = fee || 10000;
  var publicKeys = publicHexes.map(function(hex){ return new Bitcoin.ECPubKey.fromHex(hex) });
  var privateKeys = userKeys.map(function(key){ return new Bitcoin.ECKey.fromWIF(key) });

  var redeemScript = Bitcoin.scripts.multisigOutput(n, publicKeys);
  var scriptPublicKey = Bitcoin.scripts.scriptHashOutput(redeemScript.getHash());

  var address = Bitcoin.Address.fromOutputScript(scriptPublicKey, Bitcoin.networks.testnet).toString();

  helloblock.addresses.getUnspents(address, function(error, response, unspents){

    if( !error && unspents.length ){
      var txb = new Bitcoin.TransactionBuilder();
      var totalUnspentsValue = 0;

      unspents.forEach(function(unspent){
        txb.addInput(unspent.txHash, unspent.index);
        totalUnspentsValue += unspent.value;
      });

      txb.addOutput(destination, amount);
      txb.addOutput(address, totalUnspentsValue - amount - fee);

      txb.tx.ins.forEach(function(input, index){
        for( var i = 0; i < n; i ++ ){
          txb.sign(index, privateKeys[i], redeemScript);
        }
      });

      console.log('inside withdraw - helloblock get unspents -redeemScript\t', redeemScript);

      var tx = txb.build();
      var hash = tx.toHex();

      helloblock.transactions.propagate(hash, function(error, response, transaction){
        if( !error ){
          console.log('tx propagated!');
          console.log('\nreponse:\t', response);
        }
      });

    }

  });



};
