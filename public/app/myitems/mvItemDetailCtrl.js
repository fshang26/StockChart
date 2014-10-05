angular.module('app').controller('mvItemDetailCtrl', function($scope, mvCachedItems, $routeParams) {
  mvCachedItems.query().$promise.then(function(collection) {
    collection.forEach(function(item) {
      if(item._id === $routeParams.id) {
        $scope.item = item;
      }
    })
  })
});