;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('withdrawService', withdrawService);
  /* @inject */
  function withdrawService($http) {
    return {
      withdraw:withdraw
    };

    function withdraw(withdrawInfo) {
      return $http({
        method: 'POST',
        url: 'api/withdraw',
        data: withdrawInfo
      })
      .catch(function(err) {
        console.log(err);
      });
    }
  }
}).call(this);
