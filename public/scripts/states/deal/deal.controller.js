;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, dealService, $stateParams, $state, $storage) {
      var dealInfo = JSON.parse($stateParams.dealId);
      var userId = $storage.getObject('current_user')._id;

      $scope.releaseKey = function () {
        dealService.releaseKey(dealInfo._id, userId);
      };

      $scope.deal = function(dealInfo) {
        $scope.deal = dealInfo;
      };
      $scope.deal(dealInfo);
    }
}).call(this);
