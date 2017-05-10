/**
 * Created by Athinodoros on 5/6/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var tunnel = require('tunnel-ssh');
var os = require("os");
/*if (os.type() == 'Linux') {
    var config = {
        username: 'root',
        host: '127.0.0.1',
        port: 22,
        password: 'Y@9gWYyw,N-5-KJD',
        dstHost: '127.0.0.1',
        dstPort: 27017,
        localHost: '127.0.0.1',
        localPort: 27000
    };

}
else {*/
    var config = {
        username: 'root',
        host: '173.199.70.98',
        port: 22,
        password: '{X4eLDT4Ff#V(?={',
        // dstHost: '127.0.0.1',
        dstPort: 27017,
        // localHost: '127.0.0.1',
        localPort: 27000
    };
//}
console.log(process.platform);
console.log(os.type());
var Promise = require('promise');

var db;

function getdb(databaseName) {
    return new Promise(function (fulfill, reject) {

        getNewdb(databaseName)
            .then(function (res) {
                console.log("got the new db");
                // console.log(res);
                fulfill(res);
            })

    })
}
if(process.env.NODE_ENV == 'production') {

    function getNewdb(databaseName) {
        return new Promise(function (fulfill, reject) {

            tunnel(config, function (error, server) {
                //....
                if (server) {
                    if (!databaseName) throw new Error("the db name was not spesified");

                    var connectionString = "mongodb://localhost:27000/" + databaseName;
                    console.log(connectionString)
                    MongoClient.connect(connectionString, function (err, res) {
                        if (err) {

                            console.log("error");
                            console.log(err);
                            reject(err);
                        }

                        else {
                            db = res;

                            console.log('connected to MONGO DB');
                            // callback(db);
                            // db.open();
                            console.log("about to return db");
                            // console.log(db);
                            console.log("about to return db");
                            fulfill(db);

                        }
                    })

                }
            })

        });

    }
}
if(process.env.NODE_ENV == 'test'){
    function getNewdb(databaseName){
        return new Promise(function (fulfill, reject) {
            if (!databaseName) throw new Error("the db name was not spesified");

            var connectionString = "mongodb://localhost:27017/" + databaseName;
            console.log(connectionString)
            MongoClient.connect(connectionString, function (err, res) {
                if (err) {

                    console.log("error");
                    console.log(err);
                    reject(err);
                }

                else {
                    db = res;

                    console.log('connected to TEST MONGO DB');
                    // callback(db);
                    // db.open();
                    console.log("about to return db");
                    // console.log(db);
                    console.log("about to return db");
                    fulfill(db);

                }
            })
        });
    }
}
//
// getdb(function (db) {
//     db.collection('awesome').find().toArray().then(function (res) {
//             console.log(res)
//         }
//     )
// });


module.exports = {
    getdb: getdb
}