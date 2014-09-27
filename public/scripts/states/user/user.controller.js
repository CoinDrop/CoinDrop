;(function(){
  'use strict';
  angular
    .module('coindropApp')

    .controller('UserController', UserController);
    function UserController ($scope, userService) {
      $scope.data = {};
      
      $scope.chooseThisTrans = function () {
        userService.chooseThisTrans(this.transaction);
      };

      ($scope.getAllTransactions = function() {
        userService.getAllTransactions()
        .success(function(transactions) {
          $scope.data.transactions = transactions;
        })();
      });
    }

}).call(this);
