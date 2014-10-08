/*jshint expr:true */

describe('DealNewController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('DealNewController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have DealNewController', function() {
    expect('DealNewController').to.exist;
  });
  it('should have a createDeal method', function() {
    expect($scope.createDeal).to.be.a('function');
  });

});
