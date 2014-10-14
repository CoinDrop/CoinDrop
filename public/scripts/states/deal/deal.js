;(function(){
  'use strict';
  angular.module('coindropApp')
  .config( configuration );

  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
      .state('user.deal', {
        url: '/deals/:dealId/:wallet',
        templateUrl: 'scripts/states/deal/deal.html',
        controller: 'DealController'
      });
    }
}).call(this);
