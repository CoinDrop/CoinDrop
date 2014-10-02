;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);
    /* @inject */
    function AuthController ($scope, $window, $state, authService, $storage, $http) {
      // $storage.set('me', {hello:'Joel Cox'})
      // $http.get('http://localhost:8000/api/me', function(data) {
      //   console.log(data);
      // });
      $scope.user = {};

      $scope.login = function (username) {
        authService.login($scope.user)
        .then(function (resp) {
          $state.go('user');
        })
        .catch(function (error) {
          console.log('Error During Login :', error);
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
