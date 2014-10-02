;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('UserController', UserController);
    /* @inject */
    function UserController ($scope, userService, $state, $stateParams, $storage) {
      $scope.data = {};
      var userId = $storage.get('token');
      console.log('INSIDE USER CONTROLLER ********:', userId);

      // $scope.transactions = userService.getData();
      
      $scope.chooseThisDeal = function (id) {
        // userService.chooseThisDeal(this.deal)
        $state.go('user.deal', {id: id});
      };

      //immediately get all deals of a specific user upon signup or login
      $scope.getAllDeals = function(userId) {
        userService.getAllDeals(userId)
        .then(function(deals) {
        console.log('USERNAME IN GET ALL DEALS CLIENT', deals.data);
          $scope.data.deals = deals.data;
        })
        .catch(function(err) {
          console.log(err);
        });
      };
      $scope.getAllDeals(userId);

    }

}).call(this);

//user controller sets the transaction
