(function () {
  'use strict';

  var app = angular.module('awesome.factories', ['ngRoute']);

  app.factory('api', function ($http) {
    function getBookById(id) {
      return $http.get('/api/books/' + id);
    }

    return {
      getBookById: getBookById
    };
  });
}());