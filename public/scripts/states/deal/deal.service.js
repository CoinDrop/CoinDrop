;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealService', dealService);
  /* @inject */
  function dealService($http){
    return {
      releaseKey: releaseKey
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
  }
}).call(this);
