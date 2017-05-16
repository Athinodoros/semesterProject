'use strict';

var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var Promise = require('promise');
var connector = require('../../server/connector/connector');
chai.use(chaiAsPromised);
var mongoose = require('mongoose');
var testBooks = require('../../testMaterial/books.json');
var Book = require('../../server/models/book');

describe('Tests for book model', function () {


  beforeEach(function (done) {
    Book.remove({}, function () {
      var insertBooks = testBooks;
      Book.create(insertBooks, function (err) {
        console.log('Books saved');
        done();
      });
    });
  });


  it('Should return book number one', function (done) {
    Book.findOne({ title: 'test book one' })
        .then(function (book) {
          book.language.should.equal('Greek');
          done();
        });
  });
});
