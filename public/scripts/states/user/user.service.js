;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService ($http, $storage){

      return {
        getAllDeals: getAllDeals,
        getOneDeal: getOneDeal
      };

      function getAllDeals (userId) {
        return $http({
          method: 'GET',
          url: 'api/users/' + userId + '/deals'
        })
        .catch(function(err) {
          return err;
        });
      }
      function getOneDeal(dealId) {
        return $http({
          method: 'GET',
          url: 'api/deals/' + dealId
        })
        .catch(function(err) {
          return err;
        });
      }
    }

}).call(this);