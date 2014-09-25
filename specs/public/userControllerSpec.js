// /*jshint expr:true */
//
// describe('UserController', function() {
//   var createController;
//   var $scope;
//   var $rootScope;
//
//   beforeEach(module('templates'));
//   beforeEach(module('coindropApp'));
//   beforeEach(inject(function($injector) {
//     $rootScope = $injector.get('$rootScope');
//     $scope = $rootScope.$new();
//
//     var $controller = $injector.get('$controller');
//     createController = function() {
//       return $controller('MakeWalletController', {
//         $scope: $scope
//       });
//     };
//     createController();
//   }));
//
//   it('should have makeWalletController', function() {
//     expect('MakeWalletController').to.exist;
//   });
//   it('should have a doMakeWallet method', function() {
//     expect($scope.doMakeWallet).to.be.a('function');
//   });
//
// });
//
//
//
// describe('Controller: TestCtrl', function () {
//   beforeEach(module('templates'));
//   beforeEach(module('app'));
//
//   var TestCtrl, $rootScope, $compile, createController, view, $scope;
//   beforeEach(inject(function($controller, $templateCache, _$rootScope_, _$compile_, _$httpBackend_) {
//     $rootScope = _$rootScope_;
//     $scope = $rootScope.$new();
//     $compile = _$compile_;
//
//     createController = function() {
//       var html = $templateCache.get('views/test.html');
//       TestCtrl = $controller('TestCtrl', { $scope: $scope, $rootScope: $rootScope });
//       view = $compile(angular.element(html))($scope);
//       $scope.$digest();
//     };
//   }));
//
//   it('should test the view', function() {
//     createController();
//     expect(view.find("li").length).toEqual(1)
//     console.log($scope.jobs)
//   });
// });