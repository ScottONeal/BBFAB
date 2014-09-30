'use strict';

angular.module('bbfabApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [
    {
      'title': 'Our Story',
      'link': '/ourstory'
    },
    {
      'title': 'Beard Growers',
      'link': '/beardgrowers'
    },
    {
      'title': 'Become a Grower',
      'link': '/becomeagrower'
    },
    {
      'title': 'Support',
      'link': '/support'
    }
    ];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.isUser = Auth.isUser;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.goto = function(path) {
      $location.path(path);
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
