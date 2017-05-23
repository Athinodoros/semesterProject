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

    it('should return 400 no data when city Bum Land is entered', done => {
      const city = 'Bum Land';
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });

    it('should return 400 when no city is entered', done => {
      const city = undefined;
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });

    it('should return 400 if a number is entered', done => {
      const city = 12345;
      request
          .get(`/api/mongo/books/${city}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The city was invalid or missing.');
            done(err);
          });
    });
  });

  describe('Query 2', () => {
    it('should return Thessaloniki when test book three is entered', (done) => {
      var book = 'test book three';
      request
          .get(`/api/mongo/title/${book}`)
          .send({})
          .expect(200)
          .end((err, res) => {
            const cityName = res.body.cities[0].name;
            const countrycode = res.body.cities[0].countrycode;
            cityName.should.equal('Thessaloniki');
            countrycode.should.equal('GR');
            done(err);
          });
    });
    it('should return 400 when no title is entered', (done) => {
      var book = undefined;
      request
          .get(`/api/mongo/title/${book}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The title was invalid or missing.');
            done(err);
          });
    });
    it('should return 404 when title of non existing book is entered', (done) => {
      var book = 'non existing book';
      request
          .get(`/api/mongo/title/${book}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The title was invalid or missing.');
            done(err);
          });
    });
  });
  describe('Query 3', () => {
    it('should return books and cities relating to author Athinodoros', (done) =>  {
      var author = 'Athinodoros';
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
    it('should return 400 when no author is entered', (done) => {
      var author;
      request
        .get(`/api/mongo/author/${author}`)
        .send({})
        .expect(400)
        .end((err, res) => {
          const error = JSON.parse(res.error.text);
          error.message.should.equal('The author name was missing.');
          done(err);
        });
    });
    it('should return 404 if the author didnt write any books', (done) => {
      var author = 'GOD';
      request
          .get(`/api/mongo/author/${author}`)
          .send({})
          .expect(404)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('No books found by this author.');
            done(err);
          });
    });
  });
  describe('Query 4', () => {
    it.skip('should return two books and four cities when given 22.93086, 40.64361 as coords', (done) => {
      var coords = [55.17128, 25.0657];
      var maxDistance = 1000000;
      request
        .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(200)
          .end((err, res) => {
            console.log(res.body);
            var response = res.body;
            response.cities.length.should.equal(5);
            done(err);
          });
    });
    it('should return no books or cities when given 17.750152, 142.501763 as coords', (done) => {
      const coords = [17.750152, 142.501763];//the mariano trench!!
      const maxDistance = 10;
      request
          .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(200)
          .end((err, res) => {
            var response = res.body;
            response.books.length.should.equal(0);
            response.cities.length.should.equal(0);
            done(err);
          });
    });
    it('should return 400 when no coords are entered', (done) => {
      const coords = undefined;
      const maxDistance = 10;
      request
          .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The coords were invalid or missing.');
            done(err);
          });
    });
    it('should return 400 when only lat or long is entered', (done) => {
      const coords = [17.750152];
      const maxDistance = 10;
      request
          .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The coords were invalid or missing.');
            done(err);
          });
    });
    it('should return 400 when a string is entered', (done) => {
      const coords = ['notanumber'];
      const maxDistance = 10;
      request
          .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The coords were invalid or missing.');
            done(err);
          });
    });
    it('should return 400 if no maxDistance is entered', (done) => {
      var coords = [22.93086, 40.64361];
      var maxDistance = undefined;
      request
          .get(`/api/mongo/geolocate/${coords}/${maxDistance}`)
          .send({})
          .expect(400)
          .end((err, res) => {
            const error = JSON.parse(res.error.text);
            error.message.should.equal('The coords were invalid or missing.');
            done(err);
          });
    });
  });
});
