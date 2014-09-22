;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'scripts/states/login/login.html',
        controller: 'loginCtrl'
      })
    }
}).call(this);
