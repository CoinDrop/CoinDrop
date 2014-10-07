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

module.exports.withdraw = function(n, userKeys, publicHexes, destination, amount, fee){

  fee = fee || 10000;
  var publicKeys = publicHexes.map(function(hex){ return new Bitcoin.ECPubKey.fromHex(hex); });
  var privateKeys = userKeys.map(function(key){ return new Bitcoin.ECKey.fromWIF(key); });

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

      // console.log('inside withdraw - helloblock get unspents -redeemScript\t', redeemScript);

      var tx = txb.build();
      var hash = tx.toHex();

      helloblock.transactions.propagate(hash, function(error, response, transaction){
        if( !error ){
          // console.log('tx propagated!');
          // console.log('\nreponse:\t', response);
        }
      });

    }

  });

};
