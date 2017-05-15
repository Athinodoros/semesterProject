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
router.get('/:city', (req, res) => {
  const city = req.params.city;
  Book.find({
    cities: city
  }, {_id: 0, title: 1, author: 1}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).ngJSON({ message: 'Internal server error' });
    } else if (!data) {
      res.status(204).end();
    } else {
      res.status(200).ngJSON({ books: data });
    }

  });
});

export default router;
