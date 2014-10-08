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
    function releaseKey(dealId) {
      return $http({
        method: 'POST',
        url: 'api/release/:dealId',
        data: dealId
      });
    }
  }
}).call(this);
