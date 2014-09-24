;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user',
        templateUrl: 'scripts/states/user/user.html',
        controller: 'AuthController'
      });
  }
}).call(this);
