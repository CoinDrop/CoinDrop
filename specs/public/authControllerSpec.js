/*jshint expr:true */
// 'use strict';

describe('AuthController', function() {
  var createController;
  var $scope;
  var $rootScope;
  var $httpBackend;
  var authService;
  var $window;
  var $location;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    authService = $injector.get('authService');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        authService: authService
      });
    };
    createController();
  }));

  // afterEach(function() {
  //   $httpBackend.verifyNoOutstandingExpectation;
  //   $httpBackend.verifyNoOutstandingRequest();
  //   $window.localStorage.removeItem('com.coindrop');
  // });

  it('should have an auth controller', function() {
    expect('AuthController').to.exist;
  });
  it('should have a user object on the $scope', function() {
    expect($scope.user).to.be.an('object');
  });
  it('should have a signup method on the $scope', function() {
    expect($scope.signup).to.be.a('function');
  });
  it('should have a login method on the $scope', function() {
    expect($scope.login).to.be.a('function');
  });
});


