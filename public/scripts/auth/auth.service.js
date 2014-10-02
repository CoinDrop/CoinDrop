;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('authService', authService);
    /* @inject */
    function authService ($http, $state, $window, $storage) {
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
          $storage.set('current_user', resp.data.user);
          $storage.set('token', resp.data.token);
          console.log('RESP.DATA HERE: ', resp);
        })
        .catch(function(err) {
          return err;
        });
      }

      function login (user) {
        return $http({
          method: 'POST',
          url: '/api/login',
          data: user
        })
        .then(function (resp) {
          console.log('TOKEN RESPONSE LOGIN SERVICE:', resp);
          // $storage.set('current_user', resp.data.user);
          $storage.set('token', resp.data.token);
        })
        .catch(function(err) {
          return err;
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
