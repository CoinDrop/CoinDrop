;(function(){
  'use strict';
  angular.module('coindropApp')
  .config( configuration );

  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:id',
        templateUrl: 'scripts/states/user/user.html',
        controller: 'UserController'
      });
  }
}).call(this);

// box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.01);
