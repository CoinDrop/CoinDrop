;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams) {
      $scope.dealNew = {};

      $scope.makeDeal = function(){
        console.log('MAKING A NEW DEAL HERE:', $scope.dealNew);
        dealNewService.makeDeal($scope.dealNew)
        .then(function(resp) {
          $state.go('user');
        });
      };
    }
}).call(this);
