;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('TranDetailController', TranDetailController);
    /* @inject */
    function TranDetailController($scope, TranDetailService){
      $scope.tranDetail = {};
      $scope.doTranDetail = function(){
        TranDetailService.doTranDetail($scope.tranDetail);
      };
    }
}).call(this);
