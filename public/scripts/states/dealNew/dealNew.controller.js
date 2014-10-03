;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams) {
      $scope.dealNew = {};
      var username = $stateParams;

      $scope.makeDeal = function(username){
        dealNewService.makeDeal($scope.makeDeal)
        .then(function(resp) {
          $state.go('user', {username: username});
        });
      };
    }
}).call(this);
