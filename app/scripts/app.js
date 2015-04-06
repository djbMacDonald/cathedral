'use strict';

/**
 * @ngdoc overview
 * @name fractalApp
 * @description
 * # fractalApp
 *
 * Main module of the application.
 */
angular
  .module('fractalApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
