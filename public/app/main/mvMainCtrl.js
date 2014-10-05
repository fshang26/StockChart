angular.module('app').controller('mvMainCtrl', function($scope, mvCachedItems) {
  $scope.items = mvCachedItems.query();
});