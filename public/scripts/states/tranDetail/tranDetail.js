;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('tranDetail', {
        url: '/tranDetail',
        templateUrl: 'scripts/states/tranDetail/tranDetail.html',
        controller: 'TranDetailController'
      });
    }
}).call(this);
