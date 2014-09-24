;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('signupCtrl', function($scope, loginService) {
      $scope.testing = "COIN DROPPP";
      $scope.acceptInput = signupService.doSignup;
          })
    .factory('signupService', function(){
      return {
        doSignup:doSignup
      };
      function doSignup(){
        console.log(arguments);
      }
    });
}).call(this);
