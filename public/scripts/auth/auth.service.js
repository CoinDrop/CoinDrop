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
        logout: logout
      };
      
      function signup (user, callback) {
        console.log('SIGNUP - (user, callback): ', user, callback);
        return $http({
          method: 'POST',
          url: '/api/signup',
          data: user
        })
        .then(function (resp) {
          console.log('SIGNUP RESPONSE SERVICE - resp.data:', resp.data);
          $storage.setObject('current_user', resp.data.user);
          $storage.set('token', resp.data.token);
          console.log('SIGNUP RESPONSE SERVICE - resp.data.user:', resp.data.user);
          callback(resp.data.user);
        })
        .catch(function(err) {
          return err;
        });
      }

      function login (user, callback) {
        console.log('LOGIN - (user, callback): ', user, callback);
        return $http({
          method: 'POST',
          url: '/api/login',
          data: user
        })
        .then(function (resp) {
          console.log('USER RESPONSE BACK HERE:', resp.data.user);
          $storage.setObject('current_user', resp.data.user);
          $storage.set('token', resp.data.token);
          callback(resp.data.user);
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

      function logout () {
        $storage.remove();
      }
    }
}).call(this);
