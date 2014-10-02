;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    /* @inject */
    function DealController($scope, userService, $stateParams){
      var id = $stateParams.id;

      $scope.deal = function(id) {
        userService.getOneDeal(id)
        .then(function (deal) {
      console.log('ID INSIDE DEAL CONTROLLER:', deal);
          $scope.deal = deal.data;
        })
        .catch(function(err) {
          console.log('error in deal controller:', err);
        });
      };
      $scope.deal(id);
    }
}).call(this);
