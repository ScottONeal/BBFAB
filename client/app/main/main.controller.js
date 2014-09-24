'use strict';

angular.module('bbfabApp')
  .controller('MainCtrl', function ($scope, $http) {
    var base = '/assets/images/';
    $scope.slides = [
      {
        image: base+'me.jpg',
        title: 'Scott'
      },
      {
        image: base+'will.jpg',
        title: 'Will'
      },
      {
        image: base+'guy.jpg',
        title: 'Guy'
      }
    ];

  });
