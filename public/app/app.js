angular.module('app', ['ngResource', 'ngRoute', 'monospaced.mousewheel']);

angular.module('app').config(function($routeProvider, $locationProvider) {
  var routeRoleChecks = {
    admin: { auth: function(mvAuth) {
      return mvAuth.authorizeCurrentUserForRoute('admin');
    }},
    user: { auth: function(mvAuth) {
      return mvAuth.authorizeAuthenticatedUserForRoute();
    }}
  };

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', { templateUrl: '/partials/main/main',
    controller: 'mvMainCtrl'
  })
  .when('/admin/users', { templateUrl: '/partials/admin/user-list',
    controller: 'mvUserListCtrl', 
    resolve: routeRoleChecks.admin
  })
  .when('/signup', { templateUrl: '/partials/account/signup',
    controller: 'mvSignupCtrl'
  })
  .when('/profile', { templateUrl: '/partials/account/profile',
      controller: 'mvProfileCtrl',
      resolve: routeRoleChecks.user
  })
  .when('/items', { templateUrl: '/partials/items/item-list',
      controller: 'mvItemListCtrl'
  })
  .when('/items/:id', { templateUrl: '/partials/items/item-details',
      controller: 'mvItemDetailCtrl'
  })
  .when('/charts', { templateUrl: '/partials/charts/chart-list',
      controller: 'mvChartListCtrl'
  })
  .when('/charts/:id', { templateUrl: '/partials/charts/chart-details',
      controller: 'mvChartDetailCtrl',
  });

});

angular.module('app').run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  })
})
