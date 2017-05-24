
[![Build Status](https://travis-ci.org/AwesomeTeamCph/semesterProject.svg?branch=master)](https://travis-ci.org/AwesomeTeamCph/semesterProject)
[![Codecov](https://img.shields.io/codecov/c/github/AwesomeTeamCph/semesterProject.svg?style=flat)]()
# semesterProject
CphBusiness Semester Project

Start by cloning the project using the `git clone <project>` command in your requested folder.
Move into the root folder of the project, and run in the terminal:

- `npm install`
..this will install all node dependencies for the project, incl. the bower tool for front end dependencies. Then run the:
- `bower install`
..this will create and include in the "public/bower_components" folder all the libraries for the front end.
- `gulp build` will create the files needed in the dist folder to successfully run the project.
- `gulp watch` will run a "live-reload" instance of the application where any changes can be viewed immediately. 
- `npm test` to put the test data into the local database for testing.(make sure you have mongodb running!)
- `npm run dev` for dev local database.
- `npm start`  will run the remote (production) database, when we have some data!
- `git cz ` for commiting with comittizen

#

Neo4J

Q1: 'MATCH (book: BOOK)-[:MENTIONS]->(c:CITY {name: $cityName}) RETURN book';

Q2: 'MATCH (book: BOOK {title: $bookTitle})-[:MENTIONS]->(city:CITY) RETURN city';

Q3:  'MATCH(b:BOOK {author: $author})-[:MENTIONS]->(c:CITY) ' +
        'with b, collect({name:c.name, latitude:c.latitude, longitude: c.longitude}) as nodes ' +
        'with {title:b.title, cities: nodes} as containerNode ' +
        'return {books: collect(containerNode)}';

Q4: 'MATCH (book:BOOK)-[:MENTIONS]->(city:CITY) ' +
        'WITH  book, city, distance( point({ latitude: $latitude, longitude: $longitude }), ' +
        'point({ latitude: city.latitude, longitude:city.longitude }) ) as dist ' +
        'WHERE dist <= $maxDistance ' +
        'with book, collect({name:city.name, latitude:city.latitude, longitude: city.longitude}) as nodes ' +
        'with {title:book.title, cities: nodes} as containerNode ' +
        'return {books: collect(containerNode)}';

MongoDB

Q1: db.books.find({cities: "Athens"});

Q2: db.books.find({title: "test book three"}, {_id: 0, cities: 1}); --> db.cities.find({name: "Thessaloniki3"}, {_id: 0, "loc.coordinates": 1}); --> (aggregate function the shit out of it)

Q3: 

Q4:
