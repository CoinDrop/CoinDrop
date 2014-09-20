
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
      .state('form', {
        url: '/form',
        templateUrl: 'views/form.html'
      });
  }]);
