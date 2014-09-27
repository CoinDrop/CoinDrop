;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('TransactionController', TransactionController);
    /* @inject */
    function TransactionController($scope, userService, $stateParams){
      var id = $stateParams.id;
      console.log('ID IN TRANS CNTRL:', $stateParams.id);

      $scope.transaction = function(id) {
        console.log('ID IN TRANSCONTROLLER:', id);
        userService.getOneTrans(id)
        .then(function (transaction){
          console.log('DATA HERE: ', transaction);
          $scope.transaction = transaction.data;
          // return data;
        });
      };
      $scope.transaction(id);


      // $scope.transaction = {};
      $scope.getTransaction = function(){
        // TransactionService.getTransaction($scope.transaction);
      };
      // $scope.transaction = TransactionService.getTransaction();
    }
}).call(this);
