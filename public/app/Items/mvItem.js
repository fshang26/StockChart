angular.module('app').factory('mvItem', function($resource) {
  var ItemResource = $resource('/api/items/:_id', {_id: "@id"}, {
    update: {
      method:'PUT',
      isArray:false
    }
  });

  return ItemResource;
});