(function () {
  'use strict';

  // Declare app level module which depends on views, and components
  angular.module('awesome', [
    'ngRoute',
    'ui.bootstrap',
    'awesome.directives',
    'awesome.factories',
    'awesome.filters',
    'awesome.welcome',
    'awesome.query1',
    'awesome.query2',
    'awesome.query3',
    'awesome.query4'
  ])
      .config(function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $routeProvider.otherwise({ redirectTo: '/' });
        $compileProvider.debugInfoEnabled(false);
        $httpProvider.interceptors.push(function ($q, $location, $rootScope) {
          return {
            response: function (response) {
              return response;
            },
            responseError: function (response) {
              $rootScope.$broadcast({
                500: 'Internal server error'
              }[response.status], response);

              return $q.reject(response);
            }
          }
        })
      })
      .controller('AppCtrl', function ($rootScope, $scope) {
      });
}());
