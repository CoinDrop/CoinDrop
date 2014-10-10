/*jshint expr:true */
// 'use strict';
var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server.js');
var db = require('../../app/config/db.js');
var helloblock = require('helloblock-js')({
  network: 'testnet',
  debug: false
});

var User = require('../../app/config/models/user.model.js');
var Deal = require('../../app/config/models/deal.model.js');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////
  
// describe('Routing', function() {
//   it('should work', function(done) {
//     request(app)
//       .get('/')
//       .expect(200)
//       .end(done);
//   });
// });

// //TESTING FOR THE DATABASE

describe('Database', function() {

//   it('should be able to sign up a User', function(done) {
//     request(app)
//       .post('#/signup')
//       .expect(200)
//       .send({
//         username: 'btc',
//         password: 'btc',
//         email: 'btc@btc.btc'
//         })
//       .expect(302)
//       .expect(function() {
//         User.find({'username': 'btc'},function (err, users) {
//           if (err) return console.error(err);
//           expect(users[0].password).to.equal('btc');
//         });
//       })
//       .end(done);
//   });

//   it('should be able to authenticate and log in a User', function(done) {
//     request(app)
//       .post('#/login')
//       .expect(200)
//       .send({
//         'username': 'btc',
//         'password': 'btc' })
//       .expect(302)
//       .expect(function() {
//       User.find({'username': 'btc'},function (err, users) {
//           if (err) return console.error(err);
//           expect(users[0].password).to.equal('btc');
//         });

//       })
//       .end(done);
//   });

//   it('should be able to create another User', function(done) {
//     request(app)
//     .post('#/signup')
//     .send({
//       'username': 'satoshi',
//       'password': 'yelpsucks' })
//     .expect(304)
//     .end(done);
//   });

//   it('should create a new deal', function(done) {
//     request(app).post('/deal/new')
//       .expect(302)
//       .send({
//         buyer: 'btc',
//         seller: 'satoshi',
//         greeting: 'what\'s the greeting for?',
//         memo: 'trading btc for something',
//         btc: 0.001
//       })
//       .expect(function() {
//         User.find(function (err, users) {
//           if (err) return console.error(err);
//         });
//       }).end(done);
//   });

//   it('should be able to retrieve a list of deals for a given user', function(done) {
//     request(app)
//       .post('#/users/:id/deals')
//       .expect(200)
//       .send({ username: 'btc' })
//       .expect(function(res) {
//           expect(res.body.transactions[0]).to.be.ok;
//       })
//       .end(done);
//   });

//   it('should be able to release the key to the other user', function(done) {
//     request(app)
//     .post('#/release')
//     .expect(302)
//     .send({
//       'username': 'btc',
//       'otherUser': 'satoshi' })
//     .expect(function() {
//       User.find({'username': 'satoshi'},function (err, users) {
//         if (err) return console.error(err);

//       });
//     }).end(done);
//   });

// 2N6VJybmehBF3AhXRAzh6vWTBxo9SLh1XU8

  this._enableTimeouts = false;
  before(function(done){
    helloblock.faucet.withdraw('2N6VJybmehBF3AhXRAzh6vWTBxo9SLh1XU8', 1000000, function(){
      done();
    });
  });

  it('should be able to withdraw btc from a wallet', function(done){
    request(app)
      .post('/api/withdraw')
      .send({
        n: 2,
        privateKeys: [
          'cMybz18UNUxNBcUhBhkqahqumgefeU13UwTNWKUuX12LQYuoxNKG',
          'cVmVbTGFqyan55mCBRuhrpZ27RbE2wkL9btiN1JTqu79H2UhXHZV'
        ],
        publicHexes: [
          '0335502830c6f1713d41b0a8378bcd7ccde5ce28df80d0219e2e86ecdb2ddeb365',
          '021b2c361d5a65fca16164c92096a8678db96ab39dc978b93c5f7c7d19d642cf81',
          '03ff5b9aff8e881c62f2cb9589d837a332f283b9b413a58ca85ca1861cebf23e15'
        ],
        destination: '2NDZbPUm7vYdMd6XZ6hy5ApnfgVEar39tWT',
        amount: 100000
      })
      .expect(200, done);
  });

});
