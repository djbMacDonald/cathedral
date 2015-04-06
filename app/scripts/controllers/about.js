'use strict';

/**
 * @ngdoc function
 * @name fractalApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the fractalApp
 */
angular.module('fractalApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
