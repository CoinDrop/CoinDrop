;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('NavbarController', NavbarController);
    /* @inject */
    function NavbarController ($scope, authService) {
      $scope.logout = function() {
        authService.logout()
    }

}).call(this);

//user controller sets the transaction
