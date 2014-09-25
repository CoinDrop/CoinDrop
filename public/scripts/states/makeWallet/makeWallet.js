;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('makeWallet', {
        url: '/makeWallet',
        templateUrl: 'scripts/states/makeWallet/makeWallet.html',
        controller: 'MakeWalletController'
      });
    }
}).call(this);
