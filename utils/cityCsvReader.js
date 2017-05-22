/**
 * Created by Athinodoros on 5/19/2017.
 */
/**
 * Created by Athinodoros on 5/19/2017.
 */
var fs = require("fs");

function readCitiesToObjects(fileLocation) {
    var listOfCityItems = [];
    var allCities = fs.readFileSync(fileLocation);
    allCities.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {
            var cityObject = {};
            cityObject.name = line[0];
            cityObject.asciiname = line[1];
            cityObject.loc = [line[3], line[2]];
            cityObject.countryCode = line[4];
            cityObject.population = line[5];
            listOfCityItems.push(cityObject);
        }
    })
    return listOfCityItems;
}


function readCitiesToObjectsCB(fileLocation, callback) {
    var listOfCityItems = [];
    var allCities = fs.readFileSync(fileLocation);
    allCities.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {
            var cityObject = {};
            cityObject.name = line[0];
            cityObject.asciiname = line[1];
            cityObject.loc = [line[3], line[2]];
            cityObject.countryCode = line[4];
            cityObject.population = line[5];
            listOfCityItems.push(cityObject);
        }
    })
    callback(listOfBookItems)
}

function readCitiesOneByOne(fileLocation, callback) {
    var allbooks = fs.readFileSync(fileLocation);
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        if (line[0] == "filename") ;//skip the header line
        else {
            var cityObject = {};
            cityObject.name = line[0];
            cityObject.asciiname = line[1];
            cityObject.longitude = line[2];
            cityObject.latitude = line[3];
            cityObject.countryCode = line[4];
            cityObject.population = line[5];
            callback(cityObject)
        }
    })
}


module.exports = {
    readCitiesToObjects: readCitiesToObjects,
    readCitiesToObjectsCB: readCitiesToObjectsCB,
    readCitiesOneByOne: readCitiesOneByOne
}