'use strict';

import express from 'express';
import * as neo4jController from '../dbFacade/neo4jSession';
const router = express.Router();

/**
 * @api {get} /books/:city Finds all books (titles and authors) based on a city name
 * @apiName getBooksByCity
 * @apiGroup Neo4J
 *
 * @apiDescription Used whenever a user want to get all books that mentions a given city name
 * @apiParam {String} The city's name
 *
 * @apiSuccess {Array} An array of books containing title and author
 * @apiSuccess (Success 200) OK
 */
router.get('/books/:city', (req, res) => {
    const city = req.params.city;
    neo4jController.getBookByCityName(city).then(data => {
        if (!data) {
            res.status(204).end();
        } else if (data.length == 0) {
            res.status(404).ngJSON({message: 'The city was invalid or missing.'});
        } else {
            res.status(200).ngJSON({books: data});
        }
    }).catch(reason => {
        console.error(reason);
    });
});

export default router;
