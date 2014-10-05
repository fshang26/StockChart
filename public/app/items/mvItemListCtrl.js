angular.module('app').controller('mvItemListCtrl', function($scope, mvCachedItems) {
  $scope.items = mvCachedItems.query();
  
  $scope.sortOptions = [{
    value:"title",
    text: "Sort by Title"
  }, {
    value: "published",
    text: "Sort by Publish Date"
  }];
  
  $scope.sortOrder = $scope.sortOptions[0].value;
});