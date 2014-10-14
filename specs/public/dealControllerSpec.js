// /*jshint expr:true */

// describe('DealController', function() {
//   var createController;
//   var $scope;
//   var $rootScope;
//   var authService;
//   var $window;
//   var $storage;
//   var httpBackend;

//   beforeEach(module('coindropApp'));
//   beforeEach(inject(function($injector) {
//     $storage = $injector.get('$storage');
//     httpBackend = $injector.get('$httpBackend');
//     $rootScope = $injector.get('$rootScope');
//     $window = $injector.get('$window');
//     dealService = $injector.get('dealService');
//     $scope = $rootScope.$new();
//     var $controller = $injector.get('$controller');
//     createController = function() {
//       return $controller('DealController', {
//         $scope: $scope,
//         $window: $window,
//         dealService: dealService
//       });
//     };
//     createController();
//   }));

//   it('should have DealController', function() {
//     expect('DealController').to.exist;
//   });
//   it('should have a releaseKey method', function() {
//     expect($scope.releaseKey).to.be.a('function');
//   });
//   it('should have a deal object on the scope representing one deal info', function() {
//     var dealInfo = {_id:'023984394', address:'92oj32rj32908r', btc:'.001'};
//     $scope.deal = dealInfo;
//     expect($scope.deal).to.equal(dealInfo);
//   });
// });
