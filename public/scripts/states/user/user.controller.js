;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', UserController);
    /* @inject */
    function UserController ($scope, userService, $state, $stateParams) {
      $scope.data = {};
      var userId = $stateParams.id;

      
      $scope.chooseThisDeal = function (id) {
        // userService.chooseThisDeal(this.deal)
        $state.go('user.deal', {id: id});
      };

      //immediately get all deals of a specific user upon signup or login
      $scope.getAllDeals = function(userId) {
      console.log('INSIDE USER CONTROLLER ********:', userId);
        userService.getAllDeals(userId)
        .then(function(deals) {
          $scope.data.deals = deals.data;
        });
      };
      $scope.getAllDeals(userId);

    }

}).call(this);

//user controller sets the transaction
