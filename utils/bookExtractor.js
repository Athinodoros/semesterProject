/**
 * Created by Athinodoros on 5/8/2017.
 */
var extractor = require('./cityNameTrimer');
var path = require('path'), fs = require('fs');

var outputFile = "bookContent.csv";
var headers = "filename\ttitle\tauthor\trelease_date\tcities\tlanguage\n";
fs.unlink(outputFile)
fs.appendFileSync(outputFile, headers)
var startDate = new Date();
var citiesList = [];
var oldTime = "";
var citiesFile = fs.readFileSync('./../citiesEXT.csv');
citiesFile.toString().split('\n').forEach(function (line, index) {
    if (index > 0) {
        var items = line.split('\t');
        if (items[0])
            citiesList.push(items[0])
        if (items[1] && items[0] !== items[1])
            citiesList.push(items[1])
    }
})

var booksDone = 0;

function fromDir(startPath, filter) {


    if (!fs.existsSync(startPath)) {
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            var nameparts = filename.split("\\");
            var text = fs.readFileSync(filename);
            var title = "";
            var author = "";
            var cities = new Array();
            var release_date = "";
            var language = "";
            var extracts;
            extracts = extractor.extractor(text.toString());

            extracts.forEach(function (posCity) {
                if (citiesList.indexOf(posCity) >= 0 && cities.indexOf(posCity) == -1) {
                    cities.push(posCity);
                }
            })
            text.toString().split('\n').forEach(function (item) {
                if (!title)
                    if (item.indexOf("Title:") >= 0) {
                        title = item.split(":")[1];
                    }
                if (!author)
                    if (item.indexOf("Author:") !== -1) {
                        author = item.split(":")[1];
                    }

                if (item.indexOf("Release Date:") !== -1) {
                    release_date = item.split(":")[1];
                }
                if (item.indexOf("Language:") > -1) {
                    language = item.split(":")[1];
                }
            })

            var book = {
                filename: (nameparts[nameparts.length - 1]) ? nameparts[nameparts.length - 1].trim("\n").trim("\t").trim(' ').replace(/(\r\n|\n|\r)/gm, "") : "Not specified",
                title: (title) ? title.trim("\n").trim("\t").trim(' ').replace(/(\r\n|\n|\r)/gm, "") : "Not specified",
                author: (author) ? author.trim("\n").trim("\t").trim(' ').replace(/(\r\n|\n|\r)/gm, "") : "Not specified",
                release_date: (release_date) ? release_date.trim("\n").trim("\t").trim(' ').replace(/(\r\n|\n|\r)/gm, "") : "Not specified",
                language: (language) ? language.trim("\n").trim("\t").trim(' ').replace(/(\r\n|\n|\r)/gm, "") : "Not specified"
            };
            book.cities = cities;
            var stringToAppend = book.filename + "\t" + book.title + "\t" + book.author + "\t" + book.release_date + "\t" + book.cities.toString() + "\t" + book.language + "\n";
            fs.appendFileSync(outputFile, stringToAppend);
        }
        ;
        var endDate = new Date();
        var secElapsed = (endDate - startDate) / 1000;
        // console.log("--------------");
        // console.log( secElapsed);
        var timeToReport = ((secElapsed < 60) ? "00:" + ((Math.floor(secElapsed, 3) < 10) ? (0 + "" + Math.floor(secElapsed, 3)) :Math.floor(secElapsed, 3)):// <----------secs only
                //mins ---------->
            ((Math.floor(secElapsed / 60, 0)<10)?0+""+Math.floor(secElapsed / 60, 0):Math.floor(secElapsed / 60, 0)) + ":" + ((secElapsed % 60 < 10) ? 0 + "" + Math.floor(secElapsed % 60) : Math.floor(secElapsed % 60)))+ " "+ ++booksDone;
        if (timeToReport != oldTime) {
            console.log(timeToReport);
            oldTime = timeToReport;
        }
        // console.log("--------------");
    };

};
fromDir('./books', '.txt');
