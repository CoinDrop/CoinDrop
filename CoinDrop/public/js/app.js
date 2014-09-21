angular.module('coindropApp', [
    // 'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ui.router'
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {
    // console.log('app.config loaded!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
      url: '/login',
      templateUrl: 'views/login.html'
    })
      .state('home', {
        url: '/home',
        templateUrl: 'views/home.html'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html'
      })

  }]);
