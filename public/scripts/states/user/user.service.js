;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService (){
      return {
        chooseThisDeal: chooseThisDeal,
        getAllDeals: getAllDeals
      };
      function chooseThisDeal (deal) {
        return $http({
          method: 'GET',
          url: '/deals'
        })
        .then(function (resp) {
          return resp;
        });
      }

      function getAllDeals () {
        return $http({
          method: 'GET',
          url: '/deals'
        });
      }

    }

}).call(this);