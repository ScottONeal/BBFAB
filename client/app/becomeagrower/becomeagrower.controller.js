'use strict';

/**
 * @ngdoc function
 * @name bbfabApp.controller:BecomeAGrowerCtrl
 * @description
 * # BecomeAGrowerCtrl
 * Controller of the bbfabApp
 */
angular.module('bbfabApp')
  .controller('BecomeAGrowerCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.isLoggedIn = Auth.isLoggedIn();

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to settings
          $location.path('/settings');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };

  });
