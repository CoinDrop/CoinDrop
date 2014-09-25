;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('makeWalletService', MakeWalletService);
  /* @inject */
  function MakeWalletService($http){
    return {
      doMakeWallet:doMakeWallet
    };
    function doMakeWallet(makeWallet) {
      return $http({
        method: 'POST',
        url: 'api/wallet/new',
        data: makeWallet
      })
      .then(function(resp){
        return resp;
      });
    }
  });
}).call(this);
