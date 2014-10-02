;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);
    /* @inject */
    function AuthController ($scope, $window, $state, authService, $storage, $http) {
      $scope.user = {};

      $scope.login = function (username) {
        authService.login($scope.user, function(user) {
          $state.go('user', {username: user.username});
        });
      };
      
      $scope.signup = function(username) {
        console.log('INSIDE SIGNUP CONTROLLER: ', $scope.user);
        authService.signup($scope.user)
        .then(function (resp) {
          $state.go('user');
        })
        .catch(function (error) {
          console.log('Error During Signup: ', error);
        });
      };
    }

}).call(this);
