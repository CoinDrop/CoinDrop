;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('dealNew', dealNew);
  /* @inject */
  function dealNew($http){
    return {
      doMakeLock:doMakeLock
    };
    function doMakeLock(makeLock) {
      return $http({
        method: 'POST',
        url: 'api/deal/new',
        data: makeLock
      })
      .then(function(resp){
        return resp;
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
}).call(this);
