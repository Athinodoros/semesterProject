/**
 * Created by Athinodoros on 5/19/2017.
 */
var fs = require("fs");

function readBooksToObjects(fileLocation) {
    var listOfBookItems = [];
    var allbooks = fs.readFileSync(fileLocation);
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (index == 0) ;//skip the header line
        else {
            var bookObject = {};
            bookObject.filename = line[0];
            bookObject.title = line[1];
            bookObject.author = line[2];
            bookObject.release_date = line[3];
            bookObject.cities = line[4];
            bookObject.language = line[5];
            if(bookObject.language&&bookObject.title&&bookObject.cities)
            listOfBookItems.push(bookObject);
        }
    })
    return listOfBookItems
}


// console.log(readBooksToObjects('./../actual_data/bookContent.csv').length)

module.exports = {
    readBooksToObjects:readBooksToObjects
}