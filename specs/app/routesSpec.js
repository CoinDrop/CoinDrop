var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../../server.js');

//var db = require('../app/config');
//var User = require('../app/models/user');
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

});
