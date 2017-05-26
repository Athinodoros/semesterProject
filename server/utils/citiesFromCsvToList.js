/**
 * Created by Athinodoros on 5/26/2017.
 */


var fs = require('fs');
function readCsv(path) {
    var citiesList = [];
    var citiesFile = fs.readFileSync(path);
    citiesFile.toString().split('\n').forEach(function (line, index) {
        if (index > 0) {
            var items = line.split('\t');
            if (items[0])
                citiesList.push(items[0])
            if (items[1] && items[0] !== items[1])
                citiesList.push(items[1])
        }
    })
    return citiesList;
}

module.exports = {
    readCsv : readCsv
}