;(function() {
  'use strict';
  angular
    .module('coindropApp')
    .factory('userService', userService);
    /* @inject */
    function userService ($http){

      return {
        chooseThisDeal: chooseThisDeal,
        getAllDeals: getAllDeals
// =======
//         chooseThisTrans: chooseThisTrans,
//         getAllTransactions: getAllTransactions,
//         getOneTrans: getOneTrans,
//         findData: findData
// >>>>>>> ed42efefb7477d86a53528c3799f33200c220660
      };
      function chooseThisDeal (deal) {
        return $http({
          method: 'GET',
          url: '/deals'
// =======
//           url: 'api/transactions'
// >>>>>>> ed42efefb7477d86a53528c3799f33200c220660
        })
        .then(function (resp) {
          return resp;
        });
      }

      function getAllDeals () {
        return $http({
          method: 'GET',
          url: '/deals'
// =======
//           url: 'api/transactions'
//         })
//         .then(function(resp) {
//           console.log('INSIDE GET ALL TRANS');
//           return resp;
//         });
//       }
//       function getOneTrans(transactionId) {
//         return $http({
//           method: 'GET',
//           url: 'api/transactions/'+transactionId
//         })
//         .then(function (resp) {
//           return resp;
// >>>>>>> ed42efefb7477d86a53528c3799f33200c220660
        });
      }

      function findData(id){
        return _.find(data, {_id: id});
      }

    }

}).call(this);