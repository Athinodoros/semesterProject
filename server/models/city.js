'use strict';

var mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
    name: {
        type: String,
        unique: false,
        required:true
    },
    asciiname: {
        type: String,
        unique: false
    },
    loc: {
        type: [Number],
        index: '2dsphere'
    },
    countrycode: {
        type: String,
        required: true,
        unique: false
    }
});

CitySchema.index({loc: '2dsphere'});

const City = mongoose.model('City', CitySchema);

module.exports = City;

// to add a location loc: { type: "Point", coordinates: [ longitude, latitude ] },
