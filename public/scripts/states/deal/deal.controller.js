;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, dealService, $stateParams, $state, $storage) {
      $scope.showform = false;
      $scope.showbutton = true;
      var dealInfo = $stateParams.dealId;
      var userId = $storage.getObject('current_user');
      $scope.deal = dealInfo;
      $scope.destination = {};

      $scope.withdrawView = function() {
        $scope.showbutton = false;
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
