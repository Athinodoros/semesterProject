/**
 * Created by Athinodoros on 5/6/2017.
 */

var db;
var Promise = require('promise');
// var db;
var connector = require('./../connector/connector');


function setDB(dbName) {
    if (!db)
        db = dbName;
}


// all functions return a promise
function insertOne(collection, itemToInsert) {
    return new Promise(function (resolve, reject) {
        db.collection(collection).insertOne(itemToInsert, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    })

}


function findOne(collection, itemTofind) {
    return new Promise(function (resolve, reject) {
        console.log(collection)
        db.collection(collection).findOne(itemTofind, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

function removeOne(collection, itemTofind) {
    return new Promise(function (resolve, reject) {
        db.collection(collection).findOneAndDelete(itemTofind, function (err, data) {
            if (err) {
                console.log(err);
                reject(err);
            }
            // console.log(data);

            resolve(data);
        })
    });
}

function erase(collection) {
    console.log("-----------------");
    console.log(collection);
    console.log("-----------------");
    return new Promise(function (resolve, reject) {
        console.log("-----------------");
        console.log(db);
        console.log("-----------------");
        db.collection(collection)
            .removeMany({}, function (err, data) {
                if (err) reject(err);
                else resolve(data);
            })
    });
}
function close() {
    db.close();
}
module.exports = {
    conf: setDB,
    insertOne: insertOne,
    findOne: findOne,
    erase: erase,
    removeOne: removeOne,
    db: db,
    close: close
}