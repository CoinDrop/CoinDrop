;(function() {
  'use strict';

  angular
    .module('coindropApp.auth', [])
    .controller('AuthController', AuthController);

    // AuthController.$inject = ['$window', '$state', 'Auth'];
    function AuthController($scope) {
      $scope.user = {};

      $scope.signup = function(form) {
        console.log(form);
        console.log('clicked');
        console.log($scope.user.username, $scope.user.email, $scope.user.password);
      };
    }



}).call(this);