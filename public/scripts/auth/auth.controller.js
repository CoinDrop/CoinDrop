;(function() {
  'use strict';

  angular
    .module('coindropApp')
    .controller('AuthController', AuthController);

    // AuthController.$inject = ['$window', '$state', 'Auth'];
    function AuthController($scope, $state) {
      $scope.user = {};

      $scope.signup = function(form) {
        console.log(form);
        console.log('clicked');
        console.log($scope.user.username, $scope.user.email, $scope.user.password);
      };
      $scope.login = function(form) {
        console.log(form);
        console.log('clicked');
        console.log($scope.user.username, $scope.user.password);
      };
      $scope.goTransaction = function(transaction) {
        $state.go('transaction', { id: transaction.id } );
      };
    }

}).call(this);
