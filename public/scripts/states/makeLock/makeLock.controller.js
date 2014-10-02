;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MakeLockController', MakeLockController);
    /* @inject */
    function MakeLockController($scope, makeLockService, $state, $stateParams) {
      $scope.makeLock = {};
      var username = $stateParams;

      $scope.doMakeLock = function(username){
        makeLockService.doMakeLock($scope.makeLock)
        .then(function(resp) {
          $state.go('user', {username: username});
        });
      };
    }
}).call(this);
