'use strict';

import express from 'express';
const Book = require('../models/book');
const City = require('../models/city');
const router = express.Router();

/**
 * @api {get} /books/:city Finds all books (titles and authors) based on a city name
 * @apiName getBooksByCity
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user want to get all books that mentions a given city name
 * @apiParam {String} The city's name
 *
 * @apiSuccess {Array} An array of books containing title and author
 * @apiSuccess (Success 200) OK
 */
router.get('/books/:city', (req, res) => {
  const city = req.params.city;
  Book.find({
    cities: city,
  }, { _id: 0, title: 1, author: 1 }, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).ngJSON({ message: 'Internal server error' });
    }else if (!data) {
      res.status(204).end();
    }else if (data.length == 0) {
      res.status(404).ngJSON({ message: 'The city was invalid or missing.' });
    } else {
      res.status(200).ngJSON({ books: data });
    }

  });
});

/**
 * @api {get} /books/:book Finds all books (titles and authors) based on a city name
 * @apiName getBooksByTitle
 * @apiGroup MongoDB
 *
 * @apiDescription Used whenever a user wants to find all the cities mentioned by a book
 * @apiParam {String} The books title
 *
 * @apiSuccess {Array} An array of cities containing the latitude and longitude
 * @apiSuccess (Success 200) OK
 */
router.get('/title/:book', (req, res) => {
  const book = req.params.book;
  console.log('title', book);
  Book.find({
    title: book,
  }, { _id: 0, cities: 1 }, (err, result) => {
    console.log('Result :', result[0].cities);
    var returnedCities = result[0].cities;
    City.find({ name:  { $in: returnedCities } }, { _id: 0, name: 1, loc: 1, countrycode: 1 }, (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).ngJSON({ message: 'Internal server error' });
      } else if (!data) {
        res.status(204).end();
      } else if (data.length == 0) {
        res.status(404).ngJSON({ message: 'The title was invalid or missing.' });
      }else {
        res.status(200).ngJSON({ cities: data });
      }
    });
  });
});

router.get('/author/test/:author', (req, res) => {
  const author = req.params.author;
  var cities = [];
  var titles = [];
  var citiesWithLoc = [];
  Book.find({
    author: author,
  }, { _id: 0, title: 1, cities: 1 }, (err, data) => {
    var returned = data;
    data.forEach(book => {
      cities = cities.concat(book.cities);
      titles = titles.concat(book.title);
    });
    City.find({
      name:  { $in: cities }
    }, { _id: 0, name: 1, loc: 1, countrycode: 1 }, (err, data) => {

      if (err) {
        console.log(err);
      } else {
        citiesWithLoc.push(data);
        res.ngJSON({ titles: titles, cities: citiesWithLoc });
      }

    });
  });
});

export default router;
