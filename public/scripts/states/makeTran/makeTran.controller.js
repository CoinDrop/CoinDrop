;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MakeTranController', MakeTranController);
    /* @inject */
    function MakeTranController($scope, MakeTranService, $state){
      $scope.makeTran = {};
      $scope.doMakeTran = function(){
        MakeTranService.doMakeTran($scope.makeTran);
        $state.go('user');
      };
      $scope.returnToDash = function() {
        $state.go('user');
      };
    }
}).call(this);
