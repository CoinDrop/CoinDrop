;(function(){
/*jshint expr:true */
  'use strict';
  angular
    .module('coindropApp')
    .controller('NavbarController', NavbarController);
    /* @inject */
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

