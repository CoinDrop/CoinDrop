;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', UserController);
    /* @inject */
    function UserController ($scope, userService, $state) {
      $scope.data = {};

      // $scope.transactions = userService.getData();
      
      $scope.chooseThisTrans = function (id) {
        console.log('CHOSE THIS ID IN USER CONTROLLER:', id);
        $state.go('user.transaction', {id: id});
        // userService.chooseThisTrans(this.transaction); dont need now
      };

      ($scope.getAllTransactions = function() {
        userService.getAllTransactions()
        .then(function(transactions) {
          $scope.data.transactions = transactions.data;
        });
      })();
      
    }

}).call(this);

//user controller sets the transaction