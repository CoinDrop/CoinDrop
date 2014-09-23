;(function(){
  'use strict';
  angular.module('coindropApp')
  .config(['$stateProvider', configuration]);

  function configuration($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html'
      });
    }
}).call(this);
