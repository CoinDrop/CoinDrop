var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server.js');
var db = require('../../app/config/db.js');

var User = require('../../app/config/models/user.js');
//var Link = require('../app/models/link');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////
describe('', function() {
      User.remove({username : 'Svnh'}).exec();
      User.remove({password : 'Svnh'}).exec();
 beforeEach(function(done) {
    // Log out currently signed in user
    request(app).get('/')
      .end(function(err, res) {

        // Delete objects from db so they can be created later for the test
  
        done();
      });
  });



  describe('Routing', function() {
    it('should work', function(done) {
      request(app)
        .get('/')
        .expect(200)
        .end(done);
    });

    });

//TESTING FOR THE DATABASE

  describe('Database', function() {

    it('should be able to sign up a User', function(done) {
      request(app)
        .post('/signup')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
         
          User.find({'username': 'Svnh'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].password).to.equal('Svnh');
          });

        })
        .end(done);
    });

    it('should be able to authenticate and sign in a User', function(done) {
      request(app)
        .post('/login')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
         
        User.find({'username': 'Svnh'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].password).to.equal('Svnh');
          });

        })
        .end(done);
    });

    it('should create a bitcoin wallet and store the address', function(done) {
      request(app)
        .post('/create')
        .expect(200)
        .send({
          'otherUser': 'Brandon'})
        .expect(302)
        .expect(function() {

          User.find({'username': 'Svnh'},function (err, users) {
            if (err) return console.error(err);
            expect(users[0].transactions[0]['address']).to.equal("1234");
            expect(users[0].transactions[0]['key1']).to.equal("key");
            expect(users[0].transactions[0]['key2']).to.equal('');
            expect(users[0].transactions[0]['otherUser']).to.equal("Brandon");
          });
        })
        .end(done);
    });

 xit('should be able to store a user-specific list of updating transactions', function(done) {
      request(app)
        .post('/test')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
        })
        .end(done);
    });

        xit('should be able to release the key to the other user', function(done) {
        request(app)
        .post('/test')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
        })
        .end(done);
    });

    });

}); 
