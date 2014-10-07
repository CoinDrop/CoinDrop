;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealNewService', dealNewService);
  /* @inject */
  function dealNewService($http) {
    return {
      createDeal:createDeal
    };

    function createDeal(dealNew) {
      return $http({
        method: 'POST',
        url: 'api/deals/new',
        data: dealNew
      });
    }
  }
}).call(this);
