;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);
    /* @inject */
    function AuthController ($scope, $window, $state, authService) {
      $scope.user = {};

      $scope.login = function () {
        console.log('INSIDE CLIENT LOGIN:', $scope.user);
        authService.login($scope.user)
        .then(function (resp) {
          console.log('IN HERE');
          // $window.localStorage.setItem('com.coindrop', token);
          $state.go('user');
        })
        .catch(function (error) {
          console.log('Error During Login :', error);
        });
      };
      
      $scope.signup = function() {
        console.log('INSIDE SIGNUP: ', $scope.user);
        authService.signup($scope.user)
        .then(function (token) {
          // $window.localStorage.setItem('com.coindrop', token);
          $state.go('user');
        })
        .catch(function (error) {
          console.log('Error During Signup: ', error);
        });
      };
    }

}).call(this);
