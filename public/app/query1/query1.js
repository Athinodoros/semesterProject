(function () {
  'use strict';

  angular.module('awesome.query1', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query1', {
          templateUrl: '/app/query1/query1.html',
          controller: 'query1Ctrl'
        });
      })
      .controller('query1Ctrl', function ($scope, api, $http) {

        $scope.searchCity = () => {
          api.getBooksByCity($scope.city)
              .then(data => {
                $scope.books = data.data.books;
                console.log($scope.books);
              });
        };
      });
}());
