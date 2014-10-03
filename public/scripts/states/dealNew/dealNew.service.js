;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealNewService', dealNewService);
  /* @inject */
  function dealNewService($http){
    return {
      makeDeal: makeDeal
    };
    function makeDeal(dealNew) {
      return $http({
        method: 'POST',
        url: 'api/deals/new',
        data: dealNew
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
}).call(this);
