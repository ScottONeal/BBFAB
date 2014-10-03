'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:BeardGrowersCtrl
 * @description
 * # BeardGrowersCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('BeardGrowersCtrl', function ($scope, $http) {
    $http.get('/api/growers')
      .success(function(data) {
        $scope.growers = data;       
      })
      .error(function(data, status) {
        $scope.error = data;
      });
  });
