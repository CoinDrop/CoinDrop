/*jshint expr:true */

describe('dealController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('DealController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have DealController', function() {
    expect('DealController').to.exist;
  });
  it('should have a getDeal method', function() {
    expect($scope.getDeal).to.be.a('function');
  });

});
