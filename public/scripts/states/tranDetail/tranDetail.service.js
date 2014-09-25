;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('TranDetailService', TranDetailService);
  /* @inject */
  function TranDetailService($http){
    return {
      doTranDetail:doTranDetail
    };
    function doTranDetail(tranDetail) {
      return $http({
        method: 'POST',
        url: 'api/wallet/new',
        data: tranDetail
      })
      .then(function(resp){
        return resp;
      });
    }
  }
}).call(this);
