(function () {
  'use strict';

  angular.module('awesome.directives', ['ngRoute'])
      .directive('header', function () {
        return {
          restrict: 'A',
          replace: 'true',
          template: '<div ng-include="\'/app/directives/header.html\'"></div>'
        }
      })
}());