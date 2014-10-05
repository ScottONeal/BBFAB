'use strict';

angular.module('bbfabApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $upload) {
    $scope.errors = {};
		
		var user = $scope.user = User.get();
			
		if ( 	window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false) ) {
			$scope.badbrowers = true;
		}
		
		$scope.onFileSelect = function(files) {
			
			$scope.fileTooLarge  = false;
		  $scope.wrongFileType = false;	
			
			var file = files.pop();
			if ( file.size > 500000 ) {
				$scope.fileTooLarge = true;
				return;
			}
			
			if ( file.type == 'image/png' || file.type == 'image/jpeg' ) {
				'all good';	
			}
			else{
			  $scope.wrongFileType = true;
				return;
			}
			
			$scope.uploading = true;
			
			$scope.upload = $upload.upload({
				url: '/api/users/' + user._id + '/upload',
				file: file
			})
			.progress(function(evt) {
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			})
			.success(function(data, status){
				$scope.user.picture = data.picture;
				$scope.upload = false;
				$scope.progress = false;
				$scope.uploadSuccess = true;
			});
		};
		
		$scope.saveProfile = function(form) {
			if ( form.$valid ) {
				Auth.saveProfile(	user )
					.then( function() {
						$scope.profileMessage = 'Profile Information Saved';	
					})
					.catch( function() {
						$scope.profileError = 'There was a problem saving your information';
					});
			}
		}

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
