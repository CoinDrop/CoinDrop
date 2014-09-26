;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService (){
      return {
        chooseThisTrans: chooseThisTrans,
        getAllTransactions: getAllTransactions
      };
      function chooseThisTrans (transaction) {
        return $http({
          method: 'GET',
          url: '/transactions'
        })
        .then(function (resp) {
          return resp;
        });
      }

      function getAllTransactions () {
        return $http({
          method: 'GET',
          url: '/transactions'
        });
      }

    }

}).call(this);