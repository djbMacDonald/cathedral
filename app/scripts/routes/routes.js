'use strict';
angular.module('fractalApp').config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
      })
      .otherwise({
        redirectTo: '/'
      });
  });

