/*jshint expr:true */

var path = require('path');
var expect = require('chai').expect;
var base58check = require(path.resolve(__dirname, '..', '..', 'node_modules/bitcoinjs-lib/node_modules/bs58check/src/bs58check.js'));

var Utilities = require(path.resolve(__dirname, '..', '..', 'app/bitcoinUtilities.js'));

describe('Utilities', function(){

  it('exists', function(){
    expect(Utilities).to.be.a('object');
  });

  it('should have a makeTran method', function(){
    expect(Utilities.makeTran).to.be.a('function');
  });


  describe('makeTran()', function(){
    beforeEach(function(){
      wallet = Utilities.makeTran();
    });

    it('should return an object with correct properties', function(){
      expect(wallet).to.be.a('object');
      expect(wallet.address).to.be.ok;
      expect(wallet.privateKey1).to.be.ok;
      expect(wallet.privateKey2).to.be.ok;
    });

    describe('.address', function(){

      it('should be a valid BTC testnet address', function(){
         expect(wallet.address).to.be.a('string');
         expect(wallet.address.length).to.equal(34);
         expect(base58check.decode(wallet.address)).to.be.ok;
         expect(wallet.address[0]).to.match(/m|n/);
      });

    });

    describe('privatekeys', function(){

      it('should be a valid BTC testnet privateKey, constructed from 2 properties', function(){
        var privateKey = wallet.privateKey1 + wallet.privateKey2;
        expect(privateKey).to.be.a('string');
        expect(privateKey.length).to.equal(52);
        expect(base58check.decode(privateKey)).to.be.ok;
        expect(privateKey[0]).to.match(/K|L/);
      });

    });

  });


});
