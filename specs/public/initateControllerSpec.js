/*jshint expr:true */

describe('MakeWalletController', function() {
  var createController;
  var $scope;
  var $rootScope;

  beforeEach(module('coindropApp'));
  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');
    createController = function() {
      return $controller('MakeWalletController', {
        $scope: $scope
      });
    };
    createController();
  }));

  it('should have makeWalletController', function() {
    expect('MakeWalletController').to.exist;
  });
  it('should have a doMakeWallet method', function() {
    expect($scope.doMakeWallet).to.be.a('function');
  });

});
