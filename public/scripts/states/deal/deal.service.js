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
        url: 'api/deals/new',
        data: dealId
      });
    }
  }
}).call(this);
