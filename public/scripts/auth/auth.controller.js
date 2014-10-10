;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);
    /* @inject */
    function AuthController ($scope, $state, authService, $storage) {
      $scope.user = {};

      $scope.login = function() {
        authService.login($scope.user, function(user) {
          $state.go('user', {id: user._id});
        });
      };

      $scope.signup = function() {
        authService.signup($scope.user, function(user) {
          $state.go('user', {id: user._id});
        });
      };
      
      $scope.logout = function() {
        console.log('STORAGE IN LOGOUT:', $storage);
        authService.logout();
      };
    }

}).call(this);
