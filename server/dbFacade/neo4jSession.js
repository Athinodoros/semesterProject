/**
 * Created by Rihards on 15/05/2017.
 */

const driver = require('../connector/neo4j');
const Book = require('../models/neo4jBook');
const City = require('../models/neo4jCity');

const session = driver.getDriver();

function getBookByCityName(cityName) {
    const resultPromise = session.run(
        'MATCH (book: BOOK)-[:MENTIONS]->(c:CITY {name: $cityName}) RETURN book',
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
        'MATCH (book: BOOK {title: $bookTitle})-[:MENTIONS]->(city:CITY) RETURN city',
        {bookTitle: bookTitle}
    );
    return resultPromise.then(result => {
        session.close();
        console.log(result.records);
        return result.records.map(r => {
            return new City(r.get('city'))
        });
    })
        .catch((error) => {
            console.log(error);
        });
};

// insert all cities in neo4j database
function setCities(city) {
    const resultPromise = session.run(
        ' CREATE (city : CITY {name :$name ,  asciiname : $asciiname ,' +
        ' longitude : $longitude , latitude : $latitude ,' +
        ' countryCode : $countryCode , population : $population  }) RETURN city',
        {
            name: city.name,
            asciiname: city.asciiname,
            longitude: city.longitude,
            latitude: city.latitude,
            countryCode: city.countryCode,
            population: city.population,
        }
    );
    return resultPromise.then(result => {
        session.close();
        return result.records.map(r => {
            return new City(r.get('city'))
        });
    })
        .catch((error) => {
            console.error("no cities: " + error);
        });
};

// function to insert book and relationship in neo4j database
function setBooks(book) {
    book.cities.forEach(function (city, cityIndex, mArray) {

        const resultPromise = session.run(
            ' MATCH (a:CITY {name : $cityName, countryCode:$countryCode , longitude : $longitude}) ' +
            ' MERGE (book : BOOK { ' +
            ' filename : $filename ,' +
            ' title : $title ,' +
            ' author : $author ,' +
            ' release_date : $release_date ,' +
            ' language : $language  })' +
            'MERGE (book)-[r:MENTIONS]->(a) RETURN book',

            {
                filename: book.filename,
                title: book.title,
                author: book.author,
                release_date: book.release_date,
                language: book.language,
                longitude: city.loc[1],
                cityName: city.name,
                countryCode: city.countryCode
            }
        );
        return resultPromise.then(result => {
            return result.records.map(r => {
                return new Book(r.get('book'))
            });
            session.close();
        })
            .catch((error) => {
                console.error(error);
            });
    })
};


function getBooksAndCitiesByAuthor(author) {
    const resultPromise = session.run(
        'MATCH(b:BOOK {author: $author})-[:MENTIONS]->(c:CITY) ' +
        'with b, collect({name:c.name, latitude:c.latitude, longitude: c.longitude}) as nodes ' +
        'with {title:b.title, cities: nodes} as containerNode ' +
        'return {books: collect(containerNode)}',
        {author: author}
    );
    return resultPromise.then(result => {
        const booksAndCities = result.records[0]._fields[0];
        return booksAndCities;
        session.close();
    })
        .catch((error) => {
            console.log(error);
        });
}

//deletes all nodes and relationships in neo4j database, use with care
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
    getBooksAndCitiesByAuthor: getBooksAndCitiesByAuthor,
    addCities: setCities,
    addBooks: setBooks,
}
