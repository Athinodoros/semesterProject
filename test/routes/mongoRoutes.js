'use strict';

var app = require('../../server/app');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('promise');
var connector = require('../../server/connector/connector');
chai.use(chaiAsPromised);
var mongoose = require('mongoose');
var testCities = require('../../testMaterial/cities.json');
var testBooks = require('../../testMaterial/books.json');
var City = require('../../server/models/city');
var Book = require('../../server/models/book');

var request = require('supertest')(app);

describe('MongoDB Routes', function() {

  beforeEach(function (done) {
    Book.remove({}, function () {
      var insertBooks = testBooks;
      Book.create(insertBooks, function (err) {
        console.log('Books saved');
      });
    });
    City.remove({}, function () {
      var insertCities = testCities;
      City.create(insertCities, function (err) {
        console.log('Cities saved');
      });
    });
    done();
  });

  it('should return two books when Athens is entered', function(done) {
    var city = {
      city: 'Athens'
    };
    request
      .post('/mongoRoutes/byCity')
      .send(city)
      .end((err, res) => {
        console.log(res.body.length);
        res.body.length.should.equal(2);
        res.body[0].title.should.equal('test book one');
        res.body[1].title.should.equal('test book three');
        done(err);
      });
  });
});
