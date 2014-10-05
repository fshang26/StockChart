angular.module('app').factory('mvCachedItems', function(mvItem) {
  var itemList;

  return {
    query: function() {
      if(!itemList) {
        itemList = mvItem.query();
      }
      return itemList;
    }
  }
})