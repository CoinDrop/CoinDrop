;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams) {
      $scope.dealNew = {};

      $scope.makeDeal = function(){
        dealNewService.makeDeal($scope.dealNew)
        .then(function(resp) {
          $state.go('user');
        });
      };
    }
}).call(this);
