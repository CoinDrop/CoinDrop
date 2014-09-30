;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('newEmpty', {
        url: '/makeLock',
        templateUrl: 'scripts/states/newEmpty/newEmpty.html',
        controller: 'NewEmptyController'
      });
    }
}).call(this);
