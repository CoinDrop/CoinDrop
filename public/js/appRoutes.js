angular.module('appRoutes', [])

.config(['$routePrvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'views/index.html',
		controller: 'MainController'
	});

	$locationProvider.html5Mode(true);
}]);