/*jshint expr:true */

describe('InitiateController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('InitiateController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have initiateController', function() {
    expect('InitiateController').to.exist;
  });
  it('should have a doInitiate method', function() {
    expect($scope.doInitiate).to.be.a('function');
  });

});
