

describe('AuthController', function() {
	var createController;
	var $scope;
	var $rootScope;

	beforeEach(module('coindropApp'));
	beforeEach(inject(function($injector) {
		$rootScope = $injector.get('$rootScope');
		$scope = $rootScope.$new();

		var $controller = $injector.get('$controller');
		createController = function() {
			return $controller('AuthController', {
				$scope: $scope
			});
		};

		createController();
	}));

	it('should have a login method', function() {
		expect($scope.signup).to.be.a('function');
	});
});