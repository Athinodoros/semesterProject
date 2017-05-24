(function () {
  'use strict';

  angular.module('awesome.query3', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query3', {
          templateUrl: '/app/query3/query3.html',
          controller: 'query3Ctrl'
        });
      })
      .controller('query3Ctrl', function ($scope, api, NgMap) {
        $scope.searchAuthor = () => {
          api.getBooksByAuthor($scope.author)
              .then(data => {
                $scope.titles = data.data.titles;
                $scope.cities = data.data.cities;
                NgMap.getMap().then(map => {});
              });
        }
      });
}());
