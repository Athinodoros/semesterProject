/*'use strict';

var app = require('../../server/app');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('promise');
var connector = require('../../server/connector/connector');
chai.use(chaiAsPromised);
var mongoose = require('mongoose');
var Mockgoose = require('mockgoose').Mockgoose;
var mockgoose = new Mockgoose(mongoose);
var testCities = require('../../testMaterial/cities.json');
var testBooks = require('../../testMaterial/books.json');
var City = require('../../server/models/city');
var Book = require('../../server/models/book');*/

/*var request = require('supertest')(app);
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
this is an example of mocking the database using mockgoose. we dont use it on our travis build because
it is very slow..
    to demo, go to gulpfile.babel.js and increase timeout to 140000 for big download on first run
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

describe.skip('MongoDB Routes Q1', function () {

  before(done => {
    mockgoose.prepareStorage().then(function() {
      mongoose.connect('mongodb://example.com/TestingDB', function(err) {
        console.log('Using Mock DB');
        done(err);
      });
    });
  });

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

  describe.skip('Query 1', () => {
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
});

