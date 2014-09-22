;(function(){
  'use strict';
  angular.module('coindropApp', [
    // 'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ui.router',
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(['$urlRouterProvider', '$stateProvider', configuration]);

  function configuration($urlRouterProvider, $stateProvider) {
    // console.log('app.config loaded!');
    $urlRouterProvider.otherwise('/login');
  }
}).call(this);
