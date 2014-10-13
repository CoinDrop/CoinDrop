;(function(){
  'use strict';
  angular.module('coindropApp')
  .config( configuration );
  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'scripts/states/signup/signup.html',
      controller: 'AuthController'
    });
  }
}).call(this);
