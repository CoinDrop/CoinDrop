;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', function($scope, loginService) {
      $scope.testing = "COIN DROPPP";
    })
    .factory('loginService', function(){
      return {};
    });
}).call(this);
