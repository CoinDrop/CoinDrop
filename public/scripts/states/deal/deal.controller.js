;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, dealService, $stateParams, $state, $storage) {
      var dealInfo = $stateParams.dealId;
      var userId = $storage.getObject('current_user');
      $scope.deal = dealInfo;

      $scope.releaseKey = function () {
        dealService.releaseKey(dealInfo._id, userId._id);
      };
    }
}).call(this);
