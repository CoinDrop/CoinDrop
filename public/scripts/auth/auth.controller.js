;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);
    /* @inject */
    function AuthController ($scope, $state, authService) {
      $scope.user = {};

      $scope.login = function () {
        authService.login($scope.user, function(user) {
        console.log('INSIDE LOGIN CONTROLLER: ', user._id);//username gotten here
          $state.go('user', {id: user._id});
        });
      };

      $scope.signup = function() {
        authService.signup($scope.user, function(user) {
          console.log('INSIDE SIGNUP CONTROLLER: ', user._id);
          $state.go('user', {id: user._id});
        });
      };
    }

}).call(this);
