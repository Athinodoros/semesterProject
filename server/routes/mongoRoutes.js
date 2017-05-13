'use strict';
var express = require('express');
var router = express.Router();
var Book = require('../models/book');
var City = require('../models/city');


router.post('/byCity', function(req, res) {
  var city = req.body.city;
  Book.find({
    cities: city
  }, function(err, data) {
    if(err)throw err;
    console.log('Data: ', data);
    res.send(data);
  });

});
module.exports = router;
