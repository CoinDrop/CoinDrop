(function(){
  'use strict';
  angular
    .module('backgroundChange', [])
    .directive('backgroundChange', backgroundChange);

  function backgroundChange($rootScope, $location){
    return {
      restrict: 'A',
      link: link
    };
    function link($scope, $element, $attributes){
      angular.element($element).addClass('bg-city');
      console.log(angular.element($element));
      // $scope.$on('changeBackground', function(){
//         console.log('hell');
//       })
      $rootScope.$on('$stateChangeStart', function(event, next){
        console.log(angular.element($element)); // to make sure that url is the correct property
        console.log(next);
        if (true || next.name==='home' || next.name==='login' || next.name==='signup'){
          angular.element($element).removeClass('bg-main');
          angular.element($element).addClass('bg-city');
        } else {
          angular.element($element).removeClass('bg-city');
          angular.element($element).addClass('bg-main');
        }
      });
    }
  }
})();
