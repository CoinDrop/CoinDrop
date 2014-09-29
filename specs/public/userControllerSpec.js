/*jshint expr:true */
// 'use strict';

describe('AuthController', function() {
  var createController;
  var $scope;
  var $rootScope;
  var $httpBackend;
  var userService;
  var $window;
  var $location;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $location = $injector.get('$location');
    $window = $injector.get('$window');
    $httpBackend = $injector.get('$httpBackend');
    userService = $injector.get('userService');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('UserController', {
        $scope: $scope,
        $window: $window,
        $location: $location,
        userService: userService
      });
    };
    createController();
  }));

  // afterEach(function() {
  //   $httpBackend.verifyNoOutstandingExpectation;
  //   $httpBackend.verifyNoOutstandingRequest();
  //   $window.localStorage.removeItem('com.coindrop');
  // });

  it('should have a user controller', function() {
    expect('AuthController').to.exist;
  });
  it('should have a chooseThisDeal method', function() {
    expect($scope.chooseThisDeal).to.be.an('function');
  });
  // it('should have a signup method', function() {
  //   expect($scope.signup).to.be.a('function');
  // });
  // it('should have a login method', function() {
  //   expect($scope.login).to.be.a('function');
  // });

});


