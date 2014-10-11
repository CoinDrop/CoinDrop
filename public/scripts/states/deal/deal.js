;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  /* @inject */
  function configuration($stateProvider, $stateParams) {
    $stateProvider
      .state('user.deal', {
        url: '/deals/:dealId/:wallet',
        templateUrl: 'scripts/states/deal/deal.html',
        controller: 'DealController'
      });
    }
}).call(this);
