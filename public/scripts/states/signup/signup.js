;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'scripts/states/signup/signup.html'
    });
  }
}).call(this);
