;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, userService, $stateParams, $state) {
      var dealId = $stateParams.dealId;

      $scope.releaseKey = function () {
        console.log(dealId);
      };

      $scope.deal = function() {
        userService.getOneDeal(dealId)
        .then(function (deal) {
          $scope.deal = deal.data[0];
        });
      };
      $scope.deal(dealId);
    }
}).call(this);
