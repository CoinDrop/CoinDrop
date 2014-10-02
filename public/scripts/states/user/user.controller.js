;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', UserController);
    /* @inject */
    function UserController ($scope, userService, $state, $stateParams) {
      $scope.data = {};
      var username = $stateParams.username;
      console.log('INSIDE USER CONTROLLER USERNAME IS:', username);

      // $scope.transactions = userService.getData();
      
      $scope.chooseThisDeal = function (id) {
        // userService.chooseThisDeal(this.deal)
        $state.go('user.deal', {id: id});
      };

      //immediately get all deals of a specific user upon signup or login
      $scope.getAllDeals = function(username) {
        userService.getAllDeals(username)
        .then(function(deals) {
        console.log('USERNAME IN GET ALL DEALS CLIENT', deals.data);
          $scope.data.deals = deals.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      };
      $scope.getAllDeals(username);

    }

}).call(this);

//user controller sets the transaction
