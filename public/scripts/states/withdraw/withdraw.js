;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  /* @inject */
  function configuration($stateProvider, $stateParams) {
    $stateProvider
      .state('user.deal.withdraw', {
        url: '/withdraw',
        templateUrl: 'scripts/states/withdraw/withdraw.html',
        controller: 'WithdrawController'
      });
    }
}).call(this);
