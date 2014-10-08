'use strict';

angular.module('bbfabApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, $upload, $q) {
    $scope.errors = {};
		
		var user = $scope.user = User.get();
		$scope.isAdmin = Auth.isAdmin();
			
		if ( 	window.FileReader != null && (window.FileAPI == null || FileAPI.html5 != false) ) {
			$scope.badbrowers = true;
		}
		
		$scope.messages = [];
		
		$q.when(user.$promise).then(function(cuser){
			if ( !cuser.picture || !cuser.city || !cuser.state || !cuser.bio ) {
				$scope.messages.push({ message: 'Your profile is not yet complete. Please fill it out, thanks!', type: 'info'})
			}
		});
		
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
						$scope.messages.push({ message: 'Profile Information Saved', type: 'success'});	
					})
					.catch( function() {
						$scope.message.push({message: 'There was a problem saving your information', type: 'danger'});
					});
			}
		}
		
		$scope.closeMessage = function(index) {
			$scope.messages.splice(index, 1);
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
