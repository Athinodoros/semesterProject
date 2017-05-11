(function () {
  'use strict';

  angular.module('awesome.query2', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query2', {
          templateUrl: '/app/query2/query2.html',
          controller: 'query2Ctrl'
        });
      })
      .controller('query2Ctrl', function ($scope, api, $http) {

      });
}());
