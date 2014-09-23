;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/main.html'
      });
  }
}).call(this);
