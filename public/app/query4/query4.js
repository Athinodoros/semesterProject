(function () {
  'use strict';

  angular.module('awesome.query4', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query4', {
          templateUrl: '/app/query4/query4.html',
          controller: 'query4Ctrl'
        });
      })
      .controller('query4Ctrl', function ($scope, api) {
        $scope.distanceSlider = 50;
        $scope.searchGeolocation = () => {
          const geoLoc = [
              $scope.longitude,
              $scope.latitude
          ];
          api.getBooksCloseTo(geoLoc, $scope.distanceSlider)
              .then(data => {
                console.log(data);
              });
        }
      });
}());
