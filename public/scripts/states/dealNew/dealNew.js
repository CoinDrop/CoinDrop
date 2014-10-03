;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('dealNew', {
        url: '/deals/new',
        templateUrl: 'scripts/states/dealNew/dealNew.html',
        controller: 'DealNewController'
      });
    }
}).call(this);
