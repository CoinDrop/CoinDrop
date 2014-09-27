;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('MakeTranService', MakeTranService);
  /* @inject */
  function MakeTranService($http){
    return {
      doMakeTran:doMakeTran
    };
    function doMakeTran(makeTran) {
      return $http({
        method: 'POST',
        url: '/create',
        data: makeTran
      })
      .then(function(resp){
        return resp;
      });
    }
  }
}).call(this);
