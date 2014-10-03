;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
      .state('dealNew', {
        url: '/dealNew',
        templateUrl: 'scripts/states/dealNew/dealNew.html',
        controller: 'DealNewController'
      });
    }
}).call(this);
