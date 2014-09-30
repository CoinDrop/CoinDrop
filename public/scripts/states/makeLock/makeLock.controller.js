;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MakeLockController', MakeLockController);
    /* @inject */
    function MakeLockController($scope, MakeLockService){
      $scope.makeLock = {};
      $scope.doMakeLock = function(){
        console.log($scope.makeLock);
        MakeLockService.doMakeLock($scope.makeLock);
      };
    }
}).call(this);
