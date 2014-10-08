;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('WithdrawController', WithdrawController);
    /* @inject */
    function WithdrawController($scope, userService, $stateParams){
      var id = $stateParams.id;

      $scope.withdrawInfo = {};

      // var n = req.n;
      // var enteredKeys = req.privateKeys;
      // var publicHexes = req.publicHexes;
      // var destination = req.destination;
      // var amount = req.amount;
      // var fee = req.fee || 10000;

    }
}).call(this);
