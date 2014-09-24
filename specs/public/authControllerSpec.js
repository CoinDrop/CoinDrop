/*jshint expr:true */

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
  it('should have an auth controller', function() {
    expect('AuthController').to.exist;
  });
  it('should have a signup method', function() {
    expect($scope.signup).to.be.a('function');
  });
  it('should have a login method', function() {
    expect($scope.login).to.be.a('function');
  });
});
