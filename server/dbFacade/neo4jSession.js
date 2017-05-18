/**
 * Created by Rihards on 15/05/2017.
 */

const driver = require('../connector/neo4j');
const Book = require('../models/neo4jBook');
const City = require('../models/neo4jCity');

const session = driver.getDriver();

function getBookTitleByCityName(cityName) {
    const resultPromise = session.run(
        'MATCH (book: Book)-[:MENTIONS]->(c:City {name: $cityName}) RETURN book',
        {cityName: cityName}
    );
    resultPromise.then(result => {

        const books = result.records.map(r => new Book(r.get('book')));
        return books;
        session.close();
    })
        .catch((error) => {
            console.error(error);
        });
};

function getCitiesByBookTitle(bookTitle) {
    const resultPromise = session.run(
        'MATCH (book: Book {title: $bookTitle})-[:MENTIONS]->(city:City) RETURN city',
        {bookTitle: bookTitle}
    );
    resultPromise.then(result => {
       const cities = result.records.map(r => new City(r.get('city')));
       return cities;
       session.close();
    })
        .catch((error) => {
            console.log(error);
        });
};


function dropNeo4j() {
    session.run(
        'MATCH (n) DELETE n'
    ).then(result => {
        session.close();
        console.log(result);
    })
}

module.exports = {
    dropNeo4j: dropNeo4j,
    getBookTitleByCityName: getBookTitleByCityName,
    getCitiesByBookTitle: getCitiesByBookTitle
}
