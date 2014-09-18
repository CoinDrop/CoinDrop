

// angular.module('coindropApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'MainFactory'])

/**
 * @ngdoc overview
 * @name lenderBeeApp
 * @description
 * # lenderBeeApp
 *
 * Main module of the application.
 */
var app = angular
  .module('coindropApp', [
    'coindrop.home',
    'MainCtrl',
    'MainFactory',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    // console.log('app.config loaded!');
    $routeProvider
      .when('/', {
      })
      .when('/home', {
        templateUrl: 'PATH TO HTML TEMPLATE FOR VIEW',
        controller: 'CONTROLLER NAME'
      })
      .when('/', {
        templateUrl: '',
        controller: ''
      })
      .when('/', {
        templateUrl: '',
        controller: ''
      })
      .when('/', {
        templateUrl: '',
        controller: ''
      })
      .otherwise({
        redirectTo: '/'
      });
  });
