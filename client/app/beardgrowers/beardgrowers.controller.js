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
      .success(function(growers) {
        angular.forEach(growers, function(grower){
          if ( grower.bio ) {
            grower.mungedBio = grower.bio.length > 150 ? grower.bio.substring(0, 150) + '...' : grower.bio;
          }
        });
          
        $scope.growers = growers;       
      })
      .error(function(data, status) {
        $scope.error = data;
      });
  });
