// ;(function(){
//   'use strict';
//   angular
//     .module('coindropApp')
//     .factory('DealService', DealService);
//   /* @inject */
//   function DealService($http){
//     return { getDeal:getDeal };
//     function getDeal(deal) {
//       var memos = [
//         'Canon SLR with telephoto kit in Los Angeles' ,
//         'Bronze statuette of Greek warrior in Oakland',
//         'Handmade clay teapot with four cups in Reno' ,
//         'Silver dollar coin in South San Francisco'   ,
//         'Black motorcycle helmet in Sacramento'       ,
//         'White iPhone 5 16GB in Portland'             ];
//       var ret = {
//         id:'tr-20948',
//         memo: memos[Math.floor(Math.random()*memos.length)],
//         greeting: 'Bob, I put 0.5912 BTC for you here. That\'s US$240. Alice',
//         activity: { create : '2014-09-14T07:07:31Z' ,
//                     offer  : '2014-09-14T07:19:40Z' }
//       };
//       var i0_6 = Math.floor(Math.random()*7);
//       if (i0_6>0) ret.activity[i0_6<2?'decline':'escrow'] = '2014-09-15T04:30:12Z';
//       if (i0_6>2) ret.activity[i0_6<4?'take'   : 'give' ] = '2014-09-19T07:23:36Z';
//       if (ret.activity.give || ret.activity.take) ret.status = 'settled';
//       else if (ret.activity.escrow)               ret.status = 'in escrow';
//       else if (ret.activity.decline)              ret.status = 'declined';
//       else if (ret.activity.offer)                ret.status = 'on offer';
//       else                                        ret.status = 'empty';
//       // $scope.deal = ret;
//       // console.log(ret);
//       return ret;
//       // FIXME: real data here.
//       // $http.get('api/deal/'+tranId)
//       //   .success(successCallback(data))
//       //   .error(function(){console.log("deal GET error ");});
//     }
//   }
// }).call(this);
