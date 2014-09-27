;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MakeTranController', MakeTranController);
    /* @inject */
    function MakeTranController($scope, MakeTranService){
      $scope.makeTran = {};
      $scope.doMakeTran = function(){
        console.log($scope.makeTran);
        MakeTranService.doMakeTran($scope.makeTran);
      };
    }
}).call(this);
