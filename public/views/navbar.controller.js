;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('NavbarController', NavbarController);
    /* @inject */
<<<<<<< HEAD
    function NavbarController ($scope, authService, $state, $storage) {

      $scope.isActive = function(route) {
        return route === $state.current.name;
      }

      $scope.logout = function() {
        console.log('STORAGE IN LOGOUT:', $storage);
        authService.logout();
      }
    }
}).call(this);

=======
    function NavbarController ($scope, authService) {
      $scope.logout = function() {
        authService.logout()
    }

}).call(this);

//user controller sets the transaction
>>>>>>> (adds) adds bookstrap material design, adds withdraw view, adds setup for release key
