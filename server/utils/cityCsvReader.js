/**
 * Created by Athinodoros on 5/19/2017.
 */
/**
 * Created by Athinodoros on 5/19/2017.
 */
var fs = require("fs");


var City = require( "./../models/city")



function readCitiesToObjects(fileLocation) {
    var listOfCityItems = [];
    var allCities = fs.readFileSync(fileLocation);
    allCities.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (index == 0) ;//skip the header line
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



function hasAllPropertes(cityObject) {
    var hasAll = false;
    if (cityObject && cityObject.name != "undefined" && cityObject.loc != "undefined" && cityObject.countrycode != "undefined" && cityObject.name != "") {
        hasAll = true;
    }
    if (!hasAll) {
        console.log(hasAll);
    }
    return hasAll;
}
function readCitiesOneByOne(fileLocation, callback) {
    var allbooks = fs.readFileSync(fileLocation);
    var allArray = [];
    allbooks.toString().split('\n').forEach(function (item, index, array) {
        var line = item.split('\t');
        if (line[0] == "filename") ;//skip the header line
        else {

            var cityObject = {};
            cityObject.name = line[0];
            cityObject.asciiname = line[1];
            cityObject.loc = [line[2], line[3]];
            cityObject.countrycode = line[4];
            // cityObject.key = line[0] + line[4] + line[2];
            // cityObject.point = {longitude: line[2], latitude: line[3]};
            // cityObject.population = line[5];
            // callback(cityObject)
            // console.log(hasAllPropertes(cityObject));
            if (hasAllPropertes(cityObject)) {//mongoose items
                allArray.push(cityObject)
            }

            var cityObject2 = {};//item for neo4j import
            cityObject2.name = line[0];
            cityObject2.asciiname = line[1];
            // cityObject2.point = {longitude: line[2],latitude : line[3]};
            cityObject2.longitude = line[2];
            cityObject2.latitude = line[3];
            cityObject2.countryCode = line[4];
            cityObject2.population = line[5];
            // callback(cityObject2)  // <--- uncomment to also add cities to new4j

        }
    })

    console.log(allArray.length)

}


module.exports = {
    readCitiesToObjects: readCitiesToObjects,
    readCitiesOneByOne: readCitiesOneByOne
}