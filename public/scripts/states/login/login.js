;(function(){
  'use strict';
  angular.module('coindropApp')
  .config( configuration );
  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'scripts/states/login/login.html',
        controller: 'AuthController'
      });
    }
}).call(this);
