/**
 * Created by Rihards on 15/05/2017.
 */

const driver = require('../connector/neo4j');
const Book = require('../models/neo4jBook');

const session = driver.getDriver();

function getBookTitleByCityName(cityName) {
    const resultPromise = session.run(
        'MATCH (book: Book)-[:MENTIONS]->(c:City {name: $cityName}) RETURN book',
        {cityName: cityName}
    );
    resultPromise.then(result => {

        const books = result.records.map(r => new Book(r.get('book')));
        console.log(books);
        return books;
        session.close();
    })
        .catch((error) => {
            console.error(error);
        });
};

// just testing
function insertBook() {
    const title = 'Seven Hells';
    const author = 'Nos';
    const cities = ['Athens', 'London']
    const resultPromise = session.run(
        'CREATE (a: Book {title: $title, author: $author, cities: $cities}) RETURN a',
        {title: title, author: author, cities: cities}
    );
    resultPromise.then(result => {
        session.close();

        const singleRecord = result.records[0];
        const node = singleRecord.get(0);

        console.log(node.properties.title);
    });
}

function dropNeo4j() {
    session.run(
        'MATCH (n) DELETE n'
    ).then(result => {
        session.close();
        console.log(result);
    })
}

module.exports = {
    insertBook: insertBook,
    dropNeo4j: dropNeo4j,
    getBookTitleByCityName: getBookTitleByCityName
}
