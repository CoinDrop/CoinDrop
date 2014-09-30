/*jshint expr:true */

describe('MakeLockController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MakeLockController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have MakeLockController', function() {
    expect('MakeLockController').to.exist;
  });
  it('should have a doMakeLock method', function() {
    expect($scope.doMakeLock).to.be.a('function');
  });

});
