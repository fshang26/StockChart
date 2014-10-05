angular.module('app').factory('mvAuth', function($http, mvIdentity, $q) {
  return {
    authenticateUser: function(emailID, password) {
      var dfd = $q.defer();
      $http.post('/login', {emailID:emailID, password:password}).then(function(response) {
        if (response.data.success) {
          mvIdentity.currentUser = response.data.user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser: function() {
      var dfd = $q.defer();
      $http.post('/logout', {logout:true}).then(function() {
        mvIdentity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }
  };
});