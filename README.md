
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

- `npm test` to put the test data into the local database for testing.(make sure you have mongodb running!)
- `npm run dev` for dev local database.
- `npm start`  will run the remote (production) database, when we have some data!

#

Neo4J

Q1: match (b:Book)-[:mentions]->(c:City {name: "New York"}) return b.title, b.author;

Q2: match (b:Book {title: "Harry Potter"})-[:mentions]->(c:City) return c.name, c.geolocation;

Q3: match (b:Book {author: "John Grisham"})-[:mentions]->(c:City) return b.title, c.name, c.geolocation; (**NOTE: distinct the results**)

Q4: match (b:Book)-[:mentions]->(c:City {geolocation: [1.234, 5.678]}) return b.title;
#
Query 4 HINT: (https://neo4j.com/blog/neo4j-spatial-part1-finding-things-close-to-other-things/)

#

MongoDB

Q1: db.books.find({cities: "Athens"});

Q2: db.books.find({title: "test book three"}, {_id: 0, cities: 1}); --> db.cities.find({name: "Thessaloniki3"}, {_id: 0, "loc.coordinates": 1}); --> (aggregate function the shit out of it)

Q3: 

Q4:
