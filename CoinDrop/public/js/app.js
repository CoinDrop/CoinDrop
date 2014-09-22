
;(function() {
'use strict';

angular.module('coindropApp', [
    'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ui.router',
    'coindropApp.auth',
    'coindropApp.authservice',
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    // console.log('app.config loaded!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url:'/',
        templateUrl: 'views/main.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'AuthController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthController'
      })
      .state('loggedin', {
        url: '/loggedin',
        templateUrl: 'views/loggedin.html'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'views/main.html'
      });

  }]);
}).call(this);
