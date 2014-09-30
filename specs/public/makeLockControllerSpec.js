/*jshint expr:true */

describe('NewEmptyController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('NewEmptyController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have NewEmptyController', function() {
    expect('NewEmptyController').to.exist;
  });
  it('should have a doNewEmpty method', function() {
    expect($scope.doNewEmpty).to.be.a('function');
  });

});
