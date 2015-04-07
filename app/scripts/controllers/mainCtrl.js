'use strict';

/**
 * @ngdoc function
 * @name fractalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fractalApp
 */
angular.module('fractalApp').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['GraphFactory'];

function MainCtrl(GraphFactory) {

  var vm = this;

  vm.things = ['1', '2', '3'];

  // vm.points = [[0, 0], [1, 1], [2, 0]];
  vm.points = GraphFactory.points;
  vm.doStuff = function(){
    console.log('stuff');
    // vm.points.push([10,10]);
    // vm.iterate();
    GraphFactory.iterate();
  };

}
