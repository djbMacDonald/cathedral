'use strict';

/**
 * @ngdoc service
 * @name fractalApp.d3Service
 * @description
 * # d3Service
 * Factory in the fractalApp.
 */
angular.module('fractalApp')
  .factory('d3Service', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
