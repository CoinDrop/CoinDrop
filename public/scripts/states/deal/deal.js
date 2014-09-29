;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('deal', {
        url: '/deal/:id',
        templateUrl: 'scripts/states/deal/deal.html',
        controller: 'DealController'
      });
    }
}).call(this);
