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
var testBooks = require('../../testMaterial/books.json');
var Book = require('../../server/models/book');

describe('Tests for book model', function () {
  before(function (done) {
    if (!db.db)
      connector.getdb('testdb').then(function (dbin) {
        db.conf(dbin);
        done();
      });
  });

  beforeEach(function (done) {
    Book.remove({}, function ()
    {
      var insertBooks = testBooks[0];
      Book.create(insertBooks, function (err) {
        console.log('Books saved');
        done();
      });
    });
  });
  after(function (done) {
    //mongoose.connection.db.dropDatabase();
    mongoose.connection.close();
    done();
  });

  it('Should return book number one', function (done) {
    Book.findOne({ title: 'test book one' })
      .then(function (book) {
        book.language.should.equal('Greek');
        done();
      });
  });
});
