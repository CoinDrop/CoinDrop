angular.module('coindropApp')

.factory('MainFactory', ['$http', function($http) {
  var test = {};
  test.get = function() {
    return $http.get('/api/home');
  };
}]);