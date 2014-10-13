;(function(){
  'use strict';
  angular.module('coindropApp')
  .config( configuration );
  /* @inject */
  function configuration($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html'
      });
  }
}).call(this);
