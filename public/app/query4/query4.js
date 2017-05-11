(function () {
  'use strict';

  angular.module('awesome.query4', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query4', {
          templateUrl: '/app/query4/query4.html',
          controller: 'query4Ctrl'
        });
      })
      .controller('query4Ctrl', function ($scope, api, $http) {

      });
}());
