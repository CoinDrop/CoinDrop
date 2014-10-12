;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, dealService, userService, $stateParams, $state, $storage) {
      $scope.showform = false;
      var dealInfo = $stateParams.dealId;
      var userId = $storage.getObject('current_user');
      var wallet = $stateParams.wallet;
      $scope.deal = dealInfo;
      $scope.destination = {};
      $scope.walletBalance = wallet.data.data.address.balance / 100000000;

      $scope.getWalletBalance = function() {
        userService.getWalletBalance();
      };

      $scope.withdrawView = function() {
        $scope.showform = true;
      };

      $scope.withdraw = function(){
          dealService.withdraw(dealInfo, $scope.destination.address)
          .then(function(res) {
          $state.go('user');
          $('#myModal').modal('hide');
          });
      };

      $scope.releaseKey = function () {
        dealService.releaseKey(dealInfo._id, userId._id);
      };
    }
}).call(this);
