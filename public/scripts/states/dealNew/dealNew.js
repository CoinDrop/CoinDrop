;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('newDeal', {
        url: '/deals/new',
        templateUrl: 'scripts/states/makeLock/makeLock.html',
        controller: 'DealNewController'
      });
    }
}).call(this);
