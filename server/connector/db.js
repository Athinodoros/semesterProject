'use strict';

var mongoose = require('mongoose');
var Promise = require('promise');
var tunnel = require('tunnel-ssh');
var os = require('os');
mongoose.Promise = global.Promise;

console.log(process.platform);
console.log(os.type());
var config = {
  username: 'root',
  host: '173.199.70.98',
  port: 22,
  password: '{X4eLDT4Ff#V(?={',
  // dstHost: '127.0.0.1',
  dstPort: 27017,
  // localHost: '127.0.0.1',
  localPort: 27000,
};

function getdb(databaseName) {
  return new Promise(function (fulfill, reject) {

    getNewdb(databaseName)
        .then(function (res) {
          console.log('got the new db');
          // console.log(res);
          fulfill(res);
        });

  });
}

function getNewdb(databaseName) {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV == 'production') {
    return new Promise(function (fullfill, reject) {


      var server = tunnel(config, function (error, server) {
        if (error) {
          console.log('SSH connection error : ' + error);
          reject(err);
        }

        mongoose.connect('mongodb://localhost:27000/' + databaseName);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'DB connection error:'));
        db.once('open', function () {
          // we're connected!
          console.log('DB connection successful');
          fullfill(db);
        });
      });
    });
  } else {
    return new Promise(function (fullfill, reject) {


      mongoose.connect('mongodb://localhost:27017/' + databaseName);
      var db = mongoose.connection;
      mongoose.connection.on('connected', function () {
        console.log('Mongoose connected to ' + databaseName);
        fullfill(db);
      });

      mongoose.connection.on('error', function (err) {
        console.log('Mongoose connection error: ' + err);
        reject(err);
      });
    });
  }
}

module.exports = {
  getdb: getdb
};
