;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('MainController', MainController);


  MainController.$inject = ['$scope'];
  function MainController($scope) {
    $scope.testing = "COIN DROPPP";
  }
}).call(this);
