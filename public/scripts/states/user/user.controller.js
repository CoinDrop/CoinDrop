;(function(){
  'use strict';
  angular
    .module('coindropApp')

    .controller('UserController', UserController);
    function UserController ($scope, userService) {
      $scope.data = {};
      
      $scope.chooseThisDeal = function () {
        userService.chooseThisDeal(this.deal);
      };

      ($scope.getAllDeals = function() {
        userService.getAllDeals()
        .success(function(deals) {
          $scope.data.deals = deals;
        })();
      });
    }

}).call(this);
