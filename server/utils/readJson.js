/**
 * Created by Athinodoros on 5/24/2017.
 */
var fs = require("fs");

var neoSession = require("./../dbFacade/neo4jSession");


function readAll(books) {
    // console.log(__dirname+path)
    var books = books;
    books = books.replace(/^\uFEFF/, '');
    books = JSON.parse(books);
    console.log(books.length)

    books.forEach(function (book,index) {
        if(index==0){
            console.log(book)
        }
        neoSession.addBook(book)

    })

}

module.exports = {
    readBookFiles : readAll
}