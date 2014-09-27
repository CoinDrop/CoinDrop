;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService ($http){

      return {
        chooseThisTrans: chooseThisTrans,
        getAllTransactions: getAllTransactions,
        getOneTrans: getOneTrans,
        findData: findData
      };
      function chooseThisTrans (transaction) {
        return $http({
          method: 'GET',
          url: 'api/transactions'
        })
        .then(function (resp) {
          return resp;
        });
      }

      function getAllTransactions () {
        return $http({
          method: 'GET',
          url: 'api/transactions'
        })
        .then(function(resp) {
          console.log('INSIDE GET ALL TRANS');
          return resp;
        });
      }
      function getOneTrans(transactionId) {        
        return $http({
          method: 'GET',
          url: 'api/transactions/'+transactionId
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