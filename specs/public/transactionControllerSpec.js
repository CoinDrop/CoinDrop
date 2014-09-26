/*jshint expr:true */

describe('transactionController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('TransactionController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have TransactionController', function() {
    expect('TransactionController').to.exist;
  });
  it('should have a getTransaction method', function() {
    expect($scope.getTransaction).to.be.a('function');
  });

});
