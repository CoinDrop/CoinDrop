/*jshint expr:true */

describe('MakeTranController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MakeTranController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have MakeTranController', function() {
    expect('MakeTranController').to.exist;
  });
  it('should have a doMakeTran method', function() {
    expect($scope.doMakeTran).to.be.a('function');
  });

});
