;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', UserController);
    /* @inject */
    function UserController ($scope, userService, $state, $storage) {
      $scope.data = {};
      var userId = $storage.getObject('current_user')._id;
      console.log('USER ID IN USER CONTROLLER:', userId);

      $scope.chooseThisDeal = function (deal) {
        $('#myModal').modal('show');
        userService.setWalletBalance(deal.address)
        .then(function(res) {
          $state.go('user.deal', {dealId: deal, wallet: res});
        });
      };

      //immediately get all deals of a specific user upon signup or login
      $scope.getAllDeals = function() {
        userService.getAllDeals(userId)
        .then(function(deals) {
          $scope.data.buying = deals.data.buying;
          $scope.data.selling = deals.data.selling;
        });
      };
      $scope.getAllDeals(userId);
    }

}).call(this);

//user controller sets the transaction
