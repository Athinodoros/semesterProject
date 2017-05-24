(function () {
  'use strict';

  angular.module('awesome.query2', ['ngRoute'])
      .config(function ($routeProvider) {
        $routeProvider.when('/query2', {
          templateUrl: '/app/query2/query2.html',
          controller: 'query2Ctrl'
        });
      })
      .controller('query2Ctrl', function ($scope, api, NgMap) {
        //const API_KEY = 'AIzaSyCmNFQR9dtVroLXP1lF9fw5BYBH0xJUugc';

        $scope.searchTitle = () => {
          api.getCitiesByBook($scope.title)
              .then(data => {
                /*$scope.cities = [ // Dummy data.
                 {
                 "name": "Thessaloniki",
                 "loc": [22.93086, 40.64361],
                 "countrycode": "GR"
                 },
                 {
                 "name": "Madrid",
                 "loc": [-3.70034, 40.41669],
                 "countrycode": "ES"
                 }
                 ];*/
                $scope.cities = data.data.cities;
                //$scope.allGeolocations = $scope.cities.flatMap(city => city.loc);

                NgMap.getMap().then(map => {
                  // console.log(map.getCenter());
                  // console.log('markers', map.markers);
                  // console.log('shapes', map.shapes);
                });
              });

        };
      });
}());
