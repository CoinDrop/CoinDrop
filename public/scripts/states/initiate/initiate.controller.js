;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('InitiateController', function($scope, initiateService) {
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
