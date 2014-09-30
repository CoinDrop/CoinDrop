;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealController', DealController);
    /* @inject */
    function DealController($scope, DealService){
      $scope.deal = {};
      $scope.getDeal = function(){
        DealService.getDeal($scope.deal);
      };
      $scope.deal = DealService.getDeal();
    }
}).call(this);
