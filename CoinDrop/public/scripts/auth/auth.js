;(function() {
  'use strict';
  angular
    .module('coindropApp.authservice', [])
    .factory('Auth', Auth);
    Auth.$inject = ['$http'];
    function Auth($http) {
      return {
        signup : function() {
          console.log('INSIDE SIGNUP AUTH FACTORY');
          // return $http({
          //   method: 'POST',
          //   url: '/api/signup',
          //   data: user
          // })
          // .then(function(resp) {
          //   console.log('OUR RESPONSE FROM SIGNUP: ', resp.data);
          //   return resp.data;
          // });
        }
      };
    }
}).call(this);