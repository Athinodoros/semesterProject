/**
 * Created by Rihards on 15/05/2017.
 */

const driver = require('../connector/neo4j');
const Book = require('../models/neo4jBook');
const City = require('../models/neo4jCity');

const session = driver.getDriver();

function getBookByCityName(cityName) {
    const resultPromise = session.run(
        'MATCH (book: Book)-[:MENTIONS]->(c:City {name: $cityName}) RETURN book',
        {cityName: cityName}
    );
        return resultPromise.then(result => {
        session.close();
        return result.records.map(r => {
            return new Book(r.get('book'))
        });
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
    return resultPromise.then(result => {
       session.close();
       return result.records.map(r => {
          return new City(r.get('city'))
       });
    })
        .catch((error) => {
            console.log(error);
        });
};

function getBooksAndCitiesByAuthor(author) {
    const resultPromise = session.run(
        'MATCH(b:Book {author: $author})-[:MENTIONS]->(c:City) ' +
        'with b, collect({name:c.name, loc:c.loc}) as nodes ' +
        'with {title:b.title, cities: nodes} as containerNode ' +
        'return {books: collect(containerNode)}',
        {author: author}
    );
    resultPromise.then(result => {
        const booksAndCities = result.records[0]._fields[0];
        return booksAndCities;
        session.close();
    })
        .catch((error) => {
            console.log(error);
        });
}

function dropNeo4j() {
    session.run(
        'MATCH (n) DETACH DELETE n'
    ).then(result => {
        session.close();
        console.log(result);
    })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    dropNeo4j: dropNeo4j,
    getBookByCityName: getBookByCityName,
    getCitiesByBookTitle: getCitiesByBookTitle,
    getBooksAndCitiesByAuthor: getBooksAndCitiesByAuthor
}
