/**
 * Created by Athinodoros on 5/16/2017.
 */

var chai = require('chai');
var should = chai.should;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var fs = require('fs');
var jsMock = require('js-mock');
var should = chai.should();
var expect = chai.expect;
var Promise = require('promise');
var bookCsvReader = require("./../../server/utils/bookCsvReader");
var locator = require("./../../server/utils/cityLocator");
var cityCsvReader = require("./../../server/utils/cityCsvReader");
var readerToCSV = require("./../../server/utils/bookExtractor");
var cityTrimmer = require("./../../server/utils/cityNameTrimer");
// var cityfinder = require("./../../server/utils/citiesFromCsvToList");
var dirLocation = "./testMaterial/books";

var cityfinder = require("./../../server/utils/citiesFromCsvToList");
var dirLocation = "./testMaterial/books";


describe('Tests for book model', function () {

    it("read a directory of books", (done) => {
        var outputFile = "./testMaterial/testExtract.csv";
        var cityReader = jsMock.mock("reader");
        cityReader.once().with().returns(["Copenhagen", "Athens", "Riga", "London", "Manchester", "Paris"])
        var cities = cityReader();
        readerToCSV.readToCsvFrom(dirLocation, ".txt", outputFile, cities);
        const isFileMade = fs.existsSync('./' + outputFile);
        ( isFileMade).should.equal(true)
        done();
    });


    it("get only possible city names from a book ", (done) => {
        var cities = cityTrimmer.extractor('I was in Manchester and the last week I moved to Copenhagen. ' +
            'But I have been couching basketball teams all around the world. One lovely ' +
            'night i was in Riga and found a very promising bum. I thought i can make him ' +
            'the best ball player in the world. We moved together in Paris .')
        cities.should.contain("Copenhagen");
        cities.should.contain("Manchester");
        cities.should.contain("Riga");
        cities.should.contain("But I");
        cities.should.contain("Paris");
        cities.should.contain("One");
        (cities.length).should.equal(6);
        done();
    })

    it("get possible countryCodes from a city mentioned ", (done) => {
        var cities = [ { name: 'London',
            asciiname: 'London',
            loc: [ '42.46372', '1.49129' ],
            countryCode: 'UK',
            population: '8022\r' },
            { name: 'Athens',
                asciiname: 'Athens',
                loc: [ '42.55623', '1.53319' ],
                countryCode: 'GR',
                population: '3066\r' },
            { name: 'Riga',
                asciiname: 'Riga',
                loc: [ '42.50729', '1.53414' ],
                countryCode: 'LT',
                population: '15853\r' },
            { name: 'Riga',
                asciiname: 'Riga',
                loc: [ '42.50729', '1.53414' ],
                countryCode: 'US',
                population: '5853\r' },
            { name: 'Copenhagen',
                asciiname: 'Copenhagen',
                loc: [ '42.54499', '1.51483' ],
                countryCode: 'DK',
                population: '7211\r' },
            { name: 'Paris',
                asciiname: 'Paris',
                loc: [ '42.53474', '1.58014' ],
                countryCode: 'FR',
                population: '11223\r' },
            { name: 'Manchester',
                asciiname: 'Manchester',
                loc: [ '42.53474', '1.58014' ],
                countryCode: 'UK',
                population: '11223' } ];
        var books = [ { filename: '10.txt',
            title: 'The King James Bible',
            author: 'Nos',
            release_date: 'March 9, 1989',
            cities: 'Athens,Copenhagen',
            language: 'English' },
            { filename: '11.txt',
                title: 'The King James Bible',
                author: 'Rihards',
                release_date: 'March 9, 1989',
                cities: 'Copenhagen',
                language: 'English' },
            { filename: '12.txt',
                title: 'Balls of Fury',
                author: 'Ben',
                release_date: 'March 9, 1989',
                cities: 'Manchester,Copenhagen,Riga,Paris',
                language: 'English' },
            { filename: '13.txt',
                title: 'The King Freddy and his doggy(style)',
                author: 'Freddy',
                release_date: 'March 9, 1989',
                cities: 'Copenhagen',
                language: 'English' } ];
        var cityReader = jsMock.mock("cityReader");
        cityReader.once().with().returns(cities)
        var bookReader = jsMock.mock("bookReader");
        bookReader.once().with().returns(books)


       var possibleCorrectCityArray = locator.findCities(books[2],cityReader());
       possibleCorrectCityArray[1].length.should.be.equal(2)
        done();

    })

    it("read a directory of books", (done) => {
        var outputFile = "./testMaterial/testExtract.csv";
        var cityReader = jsMock.mock("reader");
        cityReader.once().with().returns(["Copenhagen", "Athens", "Riga", "London", "Manchester", "Paris"])
        var cities = cityReader();
        readerToCSV.readToCsvFrom(dirLocation, ".txt", outputFile, cities);
        const isFileMade = fs.existsSync(outputFile);
        ( isFileMade).should.equal(true)
        done();
    });


    it("get only possible city names from a book ", (done) => {
        var cities = cityTrimmer.extractor('I was in Manchester and the last week I moved to Copenhagen. ' +
            'But I have been couching basketball teams all around the world. One lovely ' +
            'night i was in Riga and found a very promising bum. I thought i can make him ' +
            'the best ball player in the world. We moved together in Paris .')
        cities.should.contain("Copenhagen");
        cities.should.contain("Manchester");
        cities.should.contain("Riga");
        cities.should.contain("But I");
        cities.should.contain("Paris");
        cities.should.contain("One");
        (cities.length).should.equal(6);
        done();
    })

    it("get possible countryCodes from a city mentioned ", (done) => {
        var cities = [ { name: 'London',
            asciiname: 'London',
            loc: [ '42.46372', '1.49129' ],
            countryCode: 'UK',
            population: '8022\r' },
            { name: 'Athens',
                asciiname: 'Athens',
                loc: [ '42.55623', '1.53319' ],
                countryCode: 'GR',
                population: '3066\r' },
            { name: 'Riga',
                asciiname: 'Riga',
                loc: [ '42.50729', '1.53414' ],
                countryCode: 'LT',
                population: '15853\r' },
            { name: 'Riga',
                asciiname: 'Riga',
                loc: [ '42.50729', '1.53414' ],
                countryCode: 'US',
                population: '5853\r' },
            { name: 'Copenhagen',
                asciiname: 'Copenhagen',
                loc: [ '42.54499', '1.51483' ],
                countryCode: 'DK',
                population: '7211\r' },
            { name: 'Paris',
                asciiname: 'Paris',
                loc: [ '42.53474', '1.58014' ],
                countryCode: 'FR',
                population: '11223\r' },
            { name: 'Manchester',
                asciiname: 'Manchester',
                loc: [ '42.53474', '1.58014' ],
                countryCode: 'UK',
                population: '11223' } ];
        var books = [ { filename: '10.txt',
            title: 'The King James Bible',
            author: 'Nos',
            release_date: 'March 9, 1989',
            cities: 'Athens,Copenhagen',
            language: 'English' },
            { filename: '11.txt',
                title: 'The King James Bible',
                author: 'Rihards',
                release_date: 'March 9, 1989',
                cities: 'Copenhagen',
                language: 'English' },
            { filename: '12.txt',
                title: 'Balls of Fury',
                author: 'Ben',
                release_date: 'March 9, 1989',
                cities: 'Manchester,Copenhagen,Riga,Paris',
                language: 'English' },
            { filename: '13.txt',
                title: 'The King Freddy and his doggy(style)',
                author: 'Freddy',
                release_date: 'March 9, 1989',
                cities: 'Copenhagen',
                language: 'English' } ];
        var cityReader = jsMock.mock("cityReader");
        cityReader.once().with().returns(cities)
        var bookReader = jsMock.mock("bookReader");
        bookReader.once().with().returns(books)
        // var mockcallback = jsMock.mock("callback");
        // mockcallback.once().with(flatArray,disiArray,arrArray,book).returns(book);

       var possibleCorrectCityArray = locator.findCities(books[2],cityReader());
       possibleCorrectCityArray[1].length.should.be.equal(2)
        done();


    })


    it("get only possible city names from a book ", (done) => {
        var possibleCities = [[{"name":"Copenhagen","asciiname":"Copenhagen","loc":["42.54499","1.51483"],"countryCode":"DK","population":"7211\r"}],[{"name":"Riga","asciiname":"Riga","loc":["42.50729","1.53414"],"countryCode":"LT","population":"15853\r"},{"name":"Riga","asciiname":"Riga","loc":["42.50729","1.53414"],"countryCode":"US","population":"5853\r"}],[{"name":"Paris","asciiname":"Paris","loc":["42.53474","1.58014"],"countryCode":"FR","population":"11223\r"}]];
        var getPossibleCountryCodes = jsMock.mock("callback");
        getPossibleCountryCodes.once().with().returns(possibleCities);
        var getBook = jsMock.mock("callback");
        getBook.once().with().returns( { filename: '12.txt',title: 'Balls of Fury',author: 'Ben',release_date: 'March 9, 1989', cities: 'Manchester,Copenhagen,Riga,Paris',language: 'English' });
        possibleCities.length.should.be.equal(3);
        const fixedBook = locator.findCorrectCity(getPossibleCountryCodes(),getBook());
        // console.log(fixedBook);
        fixedBook.cities[1].countryCode.should.be.equal("LT");//because latvian riga has more population
        done();
    })
    it("get book list from csv ", (done) => {
        var bookList = bookCsvReader.readBooksToObjects("./testMaterial/testExtract.csv");

        bookList.length.should.be.equal(4);
        done();
    })
    it("get book list from csv ", (done) => {
        var cityList = cityCsvReader.readCitiesToObjects("./testMaterial/testCities.csv");

        cityList.length.should.be.equal(7);
        done();
    })

})