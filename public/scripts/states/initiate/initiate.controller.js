;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('initiateCtrl', function($scope, initiateService) {
      $scope.testing = "COIN DROPPP";
      $scope.doInitiate = initiateService.doInitiate;
    })
    .factory('initiateService', function(){
      return {
        doInitiate:doInitiate
      };
      function doInitiate(){
        console.log(arguments);
      }
    });
}).call(this);
