;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  /* @inject */
  function configuration($stateProvider, authService, $stateParams) {
    $stateProvider
      .state('user', {
        url: '/user/:id',
        templateUrl: 'scripts/states/user/user.html',
        controller: 'UserController'
      });
  }
}).call(this);


// box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01);