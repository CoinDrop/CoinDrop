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

      $scope.chooseThisDeal = function (dealId) {
        $state.go('user.deal', {dealId: dealId});
      };

      //immediately get all deals of a specific user upon signup or login
      $scope.getAllDeals = function(userId) {
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
