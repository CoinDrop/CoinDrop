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

    it('should post a username into coinDB', function(done) {
      request(app)
        .post('/test')
        .expect(200)
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {

          User.find(function (err, users) {
            if (err) return console.error(err);
            console.log(users);
            expect(users[0].password).to.equal('Svnh');
          });

        })
        .end(done);
    });

    });

}); 
