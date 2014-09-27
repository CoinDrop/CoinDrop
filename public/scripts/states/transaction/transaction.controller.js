;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('TransactionController', TransactionController);
    /* @inject */
    function TransactionController($scope, TransactionService){
      $scope.transaction = {};
      $scope.getTransaction = function(){
        TransactionService.getTransaction($scope.transaction);
      };
      $scope.transaction = TransactionService.getTransaction();
    }
}).call(this);
