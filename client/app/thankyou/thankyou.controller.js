'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:ThankyouCtrl
 * @description
 * # ThankyouCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('ThankyouCtrl', function ($scope, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    };
  });
