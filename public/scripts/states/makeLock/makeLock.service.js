;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('NewEmptyService', NewEmptyService);
  /* @inject */
  function NewEmptyService($http){
    return {
      doNewEmpty:doNewEmpty
    };
    function doNewEmpty(newEmpty) {
      return $http({
        method: 'POST',
        url: 'api/deal/new',
        data: newEmpty
      })
      .then(function(resp){
        return resp;
      });
    }
  }
}).call(this);
