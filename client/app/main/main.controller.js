'use strict';

angular.module('bbfabApp')
  .controller('MainCtrl', function ($scope, $http, $timeout) {
   
   // Delayed Shows 
    $timeout(function() {
      $scope.countdown = true;
    }, 750);
    
    $timeout(function() {
      $scope.instagram = true;
    }, 1000);
    
    $timeout(function() {
      $scope.twitter = true;
    }, 1750);

  });
