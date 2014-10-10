/*jshint expr:true */

var path = require('path');
var expect = require('chai').expect;
var base58check = require(path.resolve(__dirname, '..', '..', 'node_modules/bitcoinjs-lib/node_modules/bs58check/src/bs58check.js'));
var Bitcoin = require('bitcoinjs-lib');
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: false
});

var Utilities = require(path.resolve(__dirname, '..', '..', 'app/bitcoinUtilities.js'));

describe('Utilities', function(){

  it('exists', function(){
    expect(Utilities).to.be.a('object');
  });

  it('should have a makeWallet method', function(){
    expect(Utilities.makeWallet).to.be.a('function');
  });

  it('should have a withdraw method', function(){
    expect(Utilities.withdraw).to.be.a('function');
  });


  describe('makeWallet(n, m)', function(){
    var wallet;
    beforeEach(function(){
      wallet = Utilities.makeWallet(2, 3);
    });

    it('should return an object with correct properties', function(){
      expect(wallet).to.be.a('object');
      expect(wallet.address).to.be.ok;
      expect(wallet.privateKeys).to.be.ok;
      expect(wallet.publicHexes).to.be.ok;
      expect(wallet.n).to.be.ok;
    });

    describe('.address', function(){

      it('should be a valid multisig testnet address (testnet script hash)', function(){
        expect(wallet.address).to.be.a('string');
        expect(wallet.address.length).to.equal(35);
        expect(base58check.decode(wallet.address)).to.be.ok;
        expect(wallet.address[0]).to.equal('2');
      });

    });

    describe('.privatekeys', function(){

      it('should be a valid multisig testnet privateKey (for compressed pubkey)', function(){
        expect(wallet.privateKeys).to.be.an('Array');
        expect(wallet.privateKeys.length).to.equal(3);
        wallet.privateKeys.forEach(function(privateKey){
          expect(privateKey).to.be.a('string');
          expect(privateKey.length).to.equal(52);
          expect(base58check.decode(privateKey)).to.be.ok;
          expect(privateKey[0]).to.equal('c');
        });
      });

    });

    describe('.publicHexes', function(){

      it('should be an array with proper length', function(){
        expect(wallet.publicHexes).to.be.an('Array');
        expect(wallet.publicHexes.length).to.equal(3);
      });

      it('should contain hex strings that correspond to the wallet address', function(){
        wallet.publicHexes.forEach(function(hex){
          expect(hex.length).to.equal(66);
          expect(parseInt(hex, 16)).to.be.ok;
        });
        var publicKeys = wallet.publicHexes.map(function(hex){
          return new Bitcoin.ECPubKey.fromHex(hex);
        });

        var redeemScript = Bitcoin.scripts.multisigOutput(wallet.n, publicKeys);
        var scriptPublicKey = Bitcoin.scripts.scriptHashOutput(redeemScript.getHash());
        var address = Bitcoin.Address.fromOutputScript(scriptPublicKey, Bitcoin.networks.testnet).toString();

        expect(wallet.address).to.equal(address);
      });
    });

    describe('.n', function(){
      it('should be number of unique signatures needed for a valid transaction', function(){
        expect(wallet.n).to.be.a('number');
        expect(wallet.n).to.be.below(wallet.privateKeys.length);
      });
    });

  });

  describe('withdraw()', function(){
    var wallet;
    var oldBalance;
    this.enableTimeouts(false);

    beforeEach(function(done){
      // adds funds to wallet before calling withdraw function
      wallet = Utilities.makeWallet(2, 3);
      helloblock.faucet.withdraw(wallet.address, 1000000, function(){
        helloblock.addresses.get('2NCQJS4YcbBwWyTSMv3MmsxksHCaeQ32gZe', function(error, response, walletData){
          oldBalance = walletData.balance;
          Utilities.withdraw(null, wallet.n, wallet.privateKeys, wallet.publicHexes, '2NCQJS4YcbBwWyTSMv3MmsxksHCaeQ32gZe');
          done(); 
        });
      });
    });

    it('should remove all funds from a given wallet to a specified destination address', function(){
      helloblock.addresses.get(wallet.address, function(error, response, walletData){
        expect(error).to.equal(null);
        expect(walletData.balance).to.not.equal(oldBalance);
      });
    });

    it('should remove all funds from a given wallet to a specified destination address', function(){
      helloblock.addresses.get(wallet.address, function(error, response, walletData){
        expect(error).to.equal(null);
        expect(walletData.balance).to.not.equal(oldBalance);
      });
    });

  });

});
