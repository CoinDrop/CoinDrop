;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams) {
      $scope.dealNew = {};
      $scope.createDeal = function(){
        console.log('CREATING AN EMPTY DEAL:', $scope.dealNew);
        // dealNewService.makeDeal($scope.dealNew)
        dealNewService.createDeal($scope.createDeal)
        .then(function(resp) {
          $state.go('user');
        });
      };
    }
}).call(this);
