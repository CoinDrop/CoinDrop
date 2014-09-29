;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('makeLock', {
        url: '/makeLock',
        templateUrl: 'scripts/states/makeLock/makeLock.html',
        controller: 'MakeLockController'
      });
    }
}).call(this);
