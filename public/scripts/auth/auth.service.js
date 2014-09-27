;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('authService', authService);
    /* @inject */
    function authService ($http, $state, $window) {
      return {
        signup: signup,
        login: login,
        isAuth: isAuth,
        signout: signout
      };

      function signup (user) {
        return $http({
          method: 'POST',
          url: '/api/signup',
          data: user
        })
        .then(function (resp) {
          console.log('RESP.DATA HERE: ', resp.data);
          return resp.data;
        });
      }

      function login (user) {
        return $http({
          method: 'POST',
          url: '/api/login',
          data: user
        })
        .then(function (resp) {
          // $storage.set('token', resp.data.token);
          return resp.data;
        });
      }

      function isAuth () {
        return $http({
          method: 'GET',
          url: '/api/loggedin'
        });
      }

      function signout () {
        // $window.localStorage.removeItem('com.coindrop');
        $state.go('signin');
      }
    }
}).call(this);
