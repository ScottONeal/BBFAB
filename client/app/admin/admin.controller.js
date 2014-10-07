'use strict';

angular.module('bbfabApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();
    
    $scope.closeMessage = function() { $scope.message = false; };
    
    $scope.updateRaised = function(user) {
      $http.post('/api/users/'+user._id+'/raised', { id: user._id, raised: user.raised})
        .success(function() {
          $scope.message = user.name + ' raised count is now ' + user.raised;  
        });
    };

    $scope.delete = function(user) {
      if ( confirm("Are you sure you want to delete " + user.name + "?")){
        User.remove({ id: user._id });
        angular.forEach($scope.users, function(u, i) {
          if (u === user) {
            $scope.users.splice(i, 1);
          }
        });
      }
    };
  });
