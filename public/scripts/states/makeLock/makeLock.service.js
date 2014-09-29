;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('MakeLockService', MakeLockService);
  /* @inject */
  function MakeLockService($http){
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
      });
    }
  }
}).call(this);
