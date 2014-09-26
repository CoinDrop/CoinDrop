;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .factory('TransactionService', TransactionService);
  /* @inject */
  function TransactionService($http){
    return { getTransaction:getTransaction };
    function getTransaction(tranId) {
      // FIXME: fake data here.
      var i0_4 = Math.floor(Math.random()*4);
      var ret = {
        id:'tr-20948',
        memo:'Reno Canon SLR with telephoto kit',
        greeting: 'Bob, I locked in 0.5912 BTC for the camera. That\'s US$240. Alice',
        activity: {              create : '2014-09-14T07:07:31Z'}
      };
      if (i0_4 > 0) ret.activity.offer  = '2014-09-14T07:19:40Z';
      if (i0_4 > 1) ret.activity.escrow = '2014-09-14T11:00:12Z';
      if (i0_4 > 2) {
        if (i0_4 > 3) ret.activity.give = '2014-09-15T04:30:12Z';
        else          ret.activity.take = '2014-09-19T07:23:36Z';
      }
      if (ret.activity.give || ret.activity.take) ret.status = 'settled';
      else if (ret.activity.escrow)               ret.status = 'in escrow';
      else if (ret.activity.offer)                ret.status = 'offered';
      else                                        ret.status = 'empty';
      // $scope.transaction = ret;
      console.log(ret);
      return ret;
      // FIXME: real data here.
      $http.get('api/transaction/'+tranId)
        .success(successCallback(data))
        .error(function(){console.log("transaction GET error ");});
    }
  }
}).call(this);
