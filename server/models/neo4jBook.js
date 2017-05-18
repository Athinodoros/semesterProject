/**
 * Created by Rihards on 18/05/2017.
 */
const _ = require('lodash');

const Book = module.exports = function (bookObj) {
    const book = bookObj.properties;
this.title = book.title;
this.author = book.author;
this.release_date = book.release_date;
this.filename = book.filename;
this.cities = book.cities;

};