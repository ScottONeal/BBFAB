'use strict';

angular.module('bbfabApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
			saveProfile: {
				method: 'POST',
				params: {
					controller: 'profile'
				}
			},
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
