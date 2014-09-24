'use strict';

angular.module('bbfabApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/ourstory', {
        templateUrl: 'app/ourstory/ourstory.html',
        controller: 'OurStoryCtrl'
      })
      .when('/becomeagrower', {
        templateUrl: 'app/becomeagrower/becomeagrower.html',
        controller: 'BecomeAGrowerCtrl'
      })
      .when('/beardgrowers', {
        templateUrl: 'app/beardgrowers/beardgrowers.html',
        controller: 'BeardGrowersCtrl'
      })
      .when('/support', {
        templateUrl: 'app/support/support.html',
        controller: 'SupportCtrl'
      });
  });
