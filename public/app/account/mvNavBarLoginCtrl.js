angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
  $scope.identity = mvIdentity;
  
  $scope.signin = function(emailID, password) {
    mvAuth.authenticateUser(emailID, password).then(function(success) {
        if (success) {
            mvNotifier.notify('You have successfully signed in!');
        } else {
            mvNotifier.notify('Username/Password combination incorrect');
        }
    });
  };

  $scope.signout = function() {
    mvAuth.logoutUser().then(function() {
      $scope.emailID = "";
      $scope.password = "";
      mvNotifier.notify('You have successfully signed out!');
      $location.path('/');
    })
  }  
});