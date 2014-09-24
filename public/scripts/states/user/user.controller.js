;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('userCtrl', function($scope, loginService) {
      $scope.testing = "COIN DROPPP";
      $scope.acceptInput = loginService.acceptInput;
          })

    .factory('loginService', function(){
      return {
        acceptInput:acceptInput
      };
      function acceptInput(){
        console.log(arguments);
      }
    });
}).call(this);
