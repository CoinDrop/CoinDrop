;(function(){
  'use strict';
  angular
    .module('coindropApp')
    .controller('DealNewController', DealNewController);
    /* @inject */
    function DealNewController($scope, dealNewService, $state, $stateParams, $storage) {
      $scope.dealNew = {};
<<<<<<< HEAD

      $scope.createDeal = function(){
        dealNewService.createDeal($scope.dealNew)
        .then(function(resp) {
        console.log('MAKING A NEW DEAL HERE:', resp);
          $state.go('user');
        })
        .catch(function(err) {
          console.log(err);
        });
=======
// <<<<<<< HEAD
//
//       $scope.makeDeal = function(){
//         dealNewService.makeDeal($scope.dealNew)
// =======
      $scope.makeDeal = function(){
        console.log('CREATING AN EMPTY DEAL ($scope.dealNew):', $scope.dealNew);
        // dealNewService.makeDeal($scope.dealNew)
        dealNewService.makeDeal($scope.dealNew)
          .then(function(resp) {
            console.log('MAKING A NEW DEAL HERE:', resp);
            $state.go('user');
          })
          .catch(function(err) {
            console.log(err);
          });
>>>>>>> (refactor) merges my changes from Park and Tommy
      };
    }
}).call(this);
