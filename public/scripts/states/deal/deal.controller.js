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
          $scope.deal = deal.data;
        })
        .catch(function(err) {
        });
      };
      $scope.deal(id);
    }
}).call(this);
