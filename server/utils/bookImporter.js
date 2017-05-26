/**
 * Created by Athinodoros on 5/22/2017.
 */
var fs = require("fs")
var bookCsvReader = require("./bookCsvReader");
var cityCsvReader = require("./cityCsvReader");
var bookCityFix = require("./cityLocator");
var neoSession = require("./../dbFacade/neo4jSession");
var cities = cityCsvReader.readCitiesToObjects("./actual_data/citiesEXT.csv");
var City = require("./../models/city");
var books = bookCsvReader.readBooksToObjects("./actual_data/bookContent.csv");

function doAllBooks(books,cities) {
    var fixedBooksArray = [];
    console.log(books.length);
    console.log(cities.length);
    var beg = new Date();
    books.forEach(function (book, index, bookArray) {
        if (book)
            if (book.cities)
                if (book.cities.length == 0) {
                    // console.log("-----------")
                    // console.log(book)
                    // console.log("-----------")
                } else {

                    var tempBook = bookCityFix.findCorrectCity(bookCityFix.findCities(book, cities), book, bookCityFix.cityCallBack)
                    neoSession.addBook(tempBook);
                    fixedBooksArray.push(tempBook)
                    // fs.appendFileSync("greatBookFileappender.json", JSON.stringify(tempBook)+",");
                    City.create(tempBook,err=>{
                        console.log(err)
                    })
                    var end = new Date();
                    //
                    if (fixedBooksArray.length % 50 == 0) {
                        // console.log((end - beg)/1000)
                        // console.log(fixedBooksArray.length)
                        console.log(fixedBooksArray.length + " " + index)
                    }
                }
    })
    // fs.writeFileSync("greatBookFile.json", fixedBooksArray);
    // fs.writeFileSync
    // console.log(fixedBooksArray)
}

function addAllCities() {
    // cityCsvReader.readCitiesOneByOne("./actual_data/citiesEXT.csv", neoSession.addCities)
}



module.exports = {
    addAllCities: addAllCities,
    allBooks: doAllBooks
}