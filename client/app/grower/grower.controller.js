'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:GrowerCtrl
 * @description
 * # GrowerCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('GrowerCtrl', function ($scope, $http, $location, grower) {
    
    $scope.absUrl = $location.absUrl();
    $scope.host = $location.host();
    
    grower = $scope.grower = grower.data;
    grower.raised |= 0;
    $scope.progress = ~~( (grower.raised / 600) * 100 );
    $scope.left = $scope.progress ? 100 - $scope.progress : false;
    
  });
