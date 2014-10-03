;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService ($http, $storage){

      return {
        chooseThisDeal: chooseThisDeal,
        getAllDeals: getAllDeals,
        getOneDeal: getOneDeal,
        findData: findData
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
        .then(function (resp) {
          return resp;
        });
      }

      function findData(id){
        return _.find(data, {_id: id});
      }

    }

}).call(this);