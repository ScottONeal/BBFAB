'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:BeardGrowersCtrl
 * @description
 * # BeardGrowersCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('BeardGrowersCtrl', function ($scope, $http, $location, growers) {
    
    growers = growers.data;
    
    $scope.gotoGrower = function(grower) {
      $location.path('/grower/'+grower._id); 
    };
    
    angular.forEach(growers, function(grower){
      if ( grower.bio ) {
        grower.mungedBio = grower.bio.length > 150 ? grower.bio.substring(0, 150) + '...' : grower.bio;
      }
    });
      
    $scope.growers = growers;       
  });
