;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService ($http){
      var walletBalance = {};

      return {
        getAllDeals: getAllDeals,
        getOneDeal: getOneDeal,
        setWalletBalance: setWalletBalance,
        getWalletBalance: getWalletBalance
      };

      function getAllDeals (userId) {
        return $http({
          method: 'GET',
          url: 'api/users/' + userId + '/deals'
        })
        .catch(function(err) {
          return err;
        });
      }
      function getOneDeal(dealId) {
        return $http({
          method: 'GET',
          url: 'api/deals/' + dealId
        })
        .catch(function(err) {
          return err;
        });
      }
      function setWalletBalance(walletAddress) {
        return $http({
          method: 'GET',
          url: 'https://testnet.helloblock.io/v1/addresses/' + walletAddress
        })

        .catch(function(err) {
          return err;
        });
      }
      function getWalletBalance() {
        // console.log('WALLET BALANCE HERE:', walletBalance[0]);
        return walletBalance[0];
      }
    }

}).call(this);