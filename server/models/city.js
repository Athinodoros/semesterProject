'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  asciiname: {
    type: String,
    required: true,
    unique: true
  },
  loc: {
    type: { type: String },
    coordinates: [Number]
  },
  countrycode: {
    type: String,
    required: true
  }
});

CitySchema.index({ loc: '2dsphere' });

var City = mongoose.model('City', CitySchema);

module.exports = City;

// to add a location loc: { type: "Point", coordinates: [ longitude, latitude ] },
