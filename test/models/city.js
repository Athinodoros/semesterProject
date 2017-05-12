'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('promise');
var db = require('../../server/dbFacade/facade');
var connector = require('../../server/connector/db');
chai.use(chaiAsPromised);
var mongoose = require('mongoose');
var testCities = require('../../testMaterial/cities.json');
var City = require('../../server/models/city');

describe('Tests for City Model', function () {
  before(function (done) {
    if (!db.db)
      connector.getdb('testdb').then(function (dbin) {
        db.conf(dbin);
        done();
      });
  });

  beforeEach(function (done) {
    City.remove({}, function ()
    {
      var insertCities = [testCities[0], testCities[1]];
      City.create(insertCities, function (err) {
        console.log('Cities saved');
        done();
      });
    });
  });

  after(function (done) {
    //mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
    done();
  });

  it('Should return the city of Dubai', function (done) {
    City.findOne({ name: 'Dubai' })
        .then(function (city) {
          city.name.should.equal('Dubai');
          done();
        });
  });

  it('Should return two cities; Dubai and Assis',  function (done) {
    City.find({})
      .then(function (data) {
        data.length.should.equal(2);
        done();
      });
  });

  it('Should delete Dubai', function (done) {
    City.findOneAndRemove({ name: 'Dubai' })
        .then(function (city) {
          city.name.should.equal('Dubai');
          done();
        });
  });

  it('Should fail because of missing city name', function (done) {
    City.remove({}, function () {
      var insertCity = testCities[0];
      testCities[0].name = '';
      City.create(insertCity, function (err) {
        err.name.should.equal('ValidationError');
        err.message.should.equal('City validation failed');
        done();
      });
    });
  });

  it('Should fail because city already exists', function (done) {
    var insertCity = testCities[0];
    City.create(insertCity, function (err) {
      err.name.should.equal('ValidationError');
      err.message.should.equal('City validation failed');
      done();
    });
  });

  it('Should fail because of missing country code', function (done) {
    City.remove({}, function () {
      var insertCity = testCities[0];
      testCities[0].countrycode = '';
      City.create(insertCity, function (err) {
        err.name.should.equal('ValidationError');
        err.message.should.equal('City validation failed');
        done();
      });
    });
  });

  it('Should fail because of missing asciiname', function (done) {
    City.remove({}, function () {
      var insertCity = testCities[0];
      testCities[0].asciiname = '';
      City.create(insertCity, function (err) {
        err.name.should.equal('ValidationError');
        err.message.should.equal('City validation failed');
        done();
      });
    });
  });

});
