;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', function($scope, loginService) {
      // $scope.showTransaction = function(tranId) { $state.go("/transaction/"+tranId); };
      $scope.testing = "COIN DROPPP";
      $scope.goTranDetail = function(transaction) {
        console.log('/tranDetail/' + transaction.id);
        console.log(transaction);
      };
    })
    .factory('loginService', function(){
      return {};
    });
}).call(this);
