;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealService', dealService);
  /* @inject */
  function dealService($http){
    return {
      releaseKey: releaseKey,
      withdraw: withdraw
    };

    function releaseKey(dealId, userId) {
      return $http({
        method: 'POST',
        url: 'api/release/'+ dealId,
        data: {userId: userId}
      })
      .catch(function(err) {
        return err;
      });
    }

    function withdraw(dealInfo, destination) {
      return $http({
        method: 'POST',
        url: 'api/withdraw',
        data: { dealInfo: dealInfo, destination: destination}
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
}).call(this);
