;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MakeWalletController', MakeWalletController);
    /* @inject */
    function MakeWalletController($scope, MakeWalletService){
      $scope.makeWallet = {};
      $scope.doMakeWallet = function(){
        MakeWalletService.doMakeWallet($scope.makeWallet);
      };
    }
}).call(this);
