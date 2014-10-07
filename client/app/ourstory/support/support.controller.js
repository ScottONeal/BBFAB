'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:SupportCtrl
 * @description
 * # SupportCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('SupportCtrl', function ($scope, $location) {
    $scope.goto = function(path) {
      $location.path(path);
    };
  });
