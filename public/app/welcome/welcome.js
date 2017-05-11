(function () {
  'use strict';

  angular.module('awesome.welcome', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: '/app/welcome/welcome.html',
          controller: 'welcomeCtrl'
        });
      })
      .controller('welcomeCtrl', function ($scope, api, $http) {

      });
}());