;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    
    /* @inject */
    function DealController($scope, userService, $stateParams, $state) {
      var dealInfo = JSON.parse($stateParams.dealId);
      console.log('DEAL INFO INSIDE DEAL CONTROLLER:', dealInfo);

      $scope.releaseKey = function () {
        console.log(dealId);
      };

      $scope.deal = function(dealInfo) {
        $scope.deal = dealInfo;
      };
      $scope.deal(dealInfo);
    }
}).call(this);
