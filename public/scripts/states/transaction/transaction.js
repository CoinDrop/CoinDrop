;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('transaction', {
        url: '/transaction/:id',
        templateUrl: 'scripts/states/transaction/transaction.html',
        controller: 'TransactionController'
      });
    }
}).call(this);
