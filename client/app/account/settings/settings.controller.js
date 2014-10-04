'use strict';

angular.module('bbfabApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $upload) {
    $scope.errors = {};
		
		var user = $scope.user = User.get();
		
		$scope.onFileSelect = function($file) {
			$scope.upload = $upload.upload({
				url: '/api/users/' + user._id + '/upload'
			})
			.progress(function(evt) {
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function(data, status){
				$scope.progress = false;
				$scope.uploadSuccess = true;
			});
		};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
			
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};
  });
