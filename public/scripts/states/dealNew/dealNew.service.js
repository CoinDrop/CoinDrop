;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealNewService', dealNewService);
  /* @inject */
  function dealNewService($http) {
    return {
      makeDeal:makeDeal
    };

    function makeDeal(dealNew) {
      console.log("BEGIN MAKEDEAL - (dealNew): ", dealNew);
      return $http({
        method: 'POST',
        url: 'api/deals/new',
        data: dealNew
      });
    }
  }
}).call(this);
