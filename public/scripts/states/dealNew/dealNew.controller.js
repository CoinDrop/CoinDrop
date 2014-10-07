;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams, $storage) {
      $scope.dealNew = {};
      $scope.user = $storage.current_user;

      $scope.makeDeal = function(){
        dealNewService.makeDeal($scope.dealNew)
        .then(function(resp) {
        console.log('MAKING A NEW DEAL HERE:', resp);
          $state.go('user');
        })
        .catch(function(err) {
          console.log(err);
        });
      };
    }
}).call(this);
