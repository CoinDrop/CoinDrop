;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('WithdrawController', WithdrawController);
    /* @inject */
    function WithdrawController($scope, withdrawService, $state){

      $scope.withdrawInfo = {
        privateKeys: [],
        publicHexes: []
      };

      $scope.withdraw = function(){
        console.log('withdrawing', $scope.withdrawInfo);
        withdrawService.withdraw($scope.withdrawInfo)
        .then(function(resp) {
        console.log('response from server - withdraw - ', resp);
          $state.go('withdraw');
        })
        .catch(function(err) {
          console.log(err);
        });
      };

      // var n = req.n;
      // var enteredKeys = req.privateKeys;
      // var publicHexes = req.publicHexes;
      // var destination = req.destination;
      // var amount = req.amount;
      // var fee = req.fee || 10000;

    }
}).call(this);
