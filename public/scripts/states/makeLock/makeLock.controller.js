;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('NewEmptyController', NewEmptyController);
    /* @inject */
    function NewEmptyController($scope, NewEmptyService){
      $scope.newEmpty = {};
      $scope.doNewEmpty = function(){
        console.log($scope.newEmpty);
        NewEmptyService.doNewEmpty($scope.newEmpty);
      };
    }
}).call(this);
