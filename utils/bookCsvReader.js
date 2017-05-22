/**
 * Created by Athinodoros on 5/19/2017.
 */
var fs = require("fs");

function readBooksToObjects(fileLocation) {
    var listOfBookItems = [];
    var allbooks = fs.readFileSync(fileLocation);
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {
            var bookObject = {};
            bookObject.filename = line[0];
            bookObject.title = line[1];
            bookObject.author = line[2];
            bookObject.release_date = line[3];
            bookObject.cities = line[4];
            bookObject.language = line[5];
            listOfBookItems.push(bookObject);
        }
    })
    return listOfBookItems
}


function readBooksToObjectsCB(fileLocation, callback) {
    var listOfBookItems = [];
    var allbooks = fs.readFileSync(fileLocation);
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {
            var bookObject = {};
            bookObject.filename = line[0];
            bookObject.title = line[1];
            bookObject.author = line[2];
            bookObject.release_date = line[3];
            bookObject.cities = line[4];
            bookObject.language = line[5];
            listOfBookItems.push(bookObject);
        }
    })
    callback(listOfBookItems)
}

function readBooksOneByOne(fileLocation, callback) {
    var allbooks = fs.readFileSync(fileLocation);
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {
            var bookObject = {};
            bookObject.filename = line[0];
            bookObject.title = line[1];
            bookObject.author = line[2];
            bookObject.release_date = line[3];
            bookObject.cities = line[4];
            bookObject.language = line[5];
            callback(bookObject)
        }
    })
}

// console.log(readBooksToObjects('./../actual_data/bookContent.csv').length)

module.exports = {
    readBooksToObjects:readBooksToObjects,
    readBooksToObjectsCB:readBooksToObjectsCB,
    readBooksOneByOne:readBooksOneByOne
}