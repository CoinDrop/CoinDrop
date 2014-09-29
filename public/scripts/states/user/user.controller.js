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
      
      $scope.chooseThisDeal = function () {
        userService.chooseThisDeal(this.deal);
      };

      ($scope.getAllDeals = function() {
        userService.getAllDeals()
        .success(function(deals) {
          $scope.data.deals = deals;
        })();
      });
// =======
//       $scope.chooseThisTrans = function (id) {
//         console.log('CHOSE THIS ID IN USER CONTROLLER:', id);
//         $state.go('user.transaction', {id: id});
//         // userService.chooseThisTrans(this.transaction); dont need now
//       };
//
//       ($scope.getAllTransactions = function() {
//         userService.getAllTransactions()
//         .then(function(transactions) {
//           $scope.data.transactions = transactions.data;
//         });
//       })();
//
// >>>>>>> ed42efefb7477d86a53528c3799f33200c220660
    }

}).call(this);

//user controller sets the transaction
