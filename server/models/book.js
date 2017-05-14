'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  filename :{
    type: String,
    required: false
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: false
  },
  release_date: {
    type: String,
    required: false
  },
  cities: {
    type: [String],
    required: false
  },
  language: {
    type: String,
    required: false
  }
});

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;
