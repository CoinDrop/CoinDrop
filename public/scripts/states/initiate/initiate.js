;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('initiate', {
        url: '/initiate',
        templateUrl: 'scripts/states/initiate/initiate.html',
        controller: 'initiateCtrl'
      });
    }
}).call(this);
