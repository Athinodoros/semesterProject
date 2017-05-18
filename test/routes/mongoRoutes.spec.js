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


describe('MongoDB Routes Q1', function () {


  beforeEach(done => {
    Book.remove({}, () => {
      const insertBooks = testBooks;
      Book.create(insertBooks, err => {
        // console.log('Books saved');
      });
    });

    City.remove({}, () => {
      const insertCities = testCities;
      City.create(insertCities, err => {
        // console.log('Cities saved');
      });
    });

    done();
  });

  describe('Query 1', () => {
    it('should return two books when Athens is entered', done => {
      const city = 'Athens';
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(200)
          .end((err, res) => {
            res.body.books.length.should.equal(2);
            done(err);
          });
    });

    it('should return 204 no data when city Bum Land is entered', done => {
      const city = 'Bum Land';
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(404)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });

    it('should return 404 when no city is entered', done => {
      const city = undefined;
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(404)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });

    it('should return 404 if a number is entered', done => {
      const city = 12345;
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(404)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });
  });

  describe('Query 2', () => {
    it('should return something when test book three is entered', function (done) {
      var book = 'test book three';
      request
          .get(`/api/mongo/title/${book}`)
          .send({})
          .expect(200)
          .end((err, res) => {
            const cityName = res.body.cities[0].name;
            cityName.should.equal('Thessaloniki');
            done(err);
          });
    });
  });
  describe('Query 3', () => {
    it('should return books and cities relating to author ben', (done) =>  {
      var author = 'Athinodoros';
      var mapped = [];
      request
          .get(`/api/mongo/author/${author}`)
          .send({})
          .end((err, res) => {
            var response = res.body;
            res.body.titles.length.should.equal(2);
            res.body.cities[0][0].name.should.equal('Copenhagen');
            done(err);
          });
    });
  });
  /*describe('Query 4', () => {
    it('should do something when given some coords', (done) => {
      var coords = [22.93086, 40.64361];
      var maxDistance = 1000000;
      request
        .get(`/api/mongo//geolocate/${coords}/${maxDistance}`)
          .send({})
          .end((err, res) => {
            var response = res.body;
            console.log(res.body);
            done(err);
          });
    });
  });*/
});
