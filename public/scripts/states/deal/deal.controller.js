;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, userService, $stateParams) {
      var dealId = $stateParams.dealId;

      $scope.deal = function(dealId) {
        userService.getOneDeal(dealId)
        .then(function (deal) {
          $scope.deal = deal.data[0];
        });
      };
      $scope.deal(dealId);
    }
}).call(this);
