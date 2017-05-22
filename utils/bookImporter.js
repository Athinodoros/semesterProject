/**
 * Created by Athinodoros on 5/22/2017.
 */
var bookCsvReader = require("./bookCsvReader");
var cityCsvReader = require("./cityCsvReader");
var bookCityFix = require("./cityLocator");

var books = bookCsvReader.readBooksToObjects("./../actual_data/bookContent.csv");
var cities = cityCsvReader.readCitiesToObjects("./../actual_data/citiesEXT.csv");

function doAllBooks() {
    var fixedBooksArray = [];
    console.log(books.length)
    console.log(cities.length)
    var beg = new Date();
    books.forEach(function (book, index, bookArray) {
        if (book.cities.length==0) {
            console.log("-----------")
            console.log(book)
            console.log("-----------")
        } else {

            var tempBook = bookCityFix.findCorrectCity(bookCityFix.findCities(book, cities), book, bookCityFix.cityCallBack)
            fixedBooksArray.push(tempBook)
            var end = new Date();

            if (fixedBooksArray.length % 50 == 0) {
                console.log(end - beg)
                // console.log(fixedBooksArray.length)
                console.log(fixedBooksArray.length +" "+index)

            }
        }
    })

    console.log(fixedBooksArray)
}

doAllBooks()