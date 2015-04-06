'use strict';

/**
 * @ngdoc function
 * @name fractalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fractalApp
 */
angular.module('fractalApp').controller('MainCtrl', function ($scope) {

  var vm = this;

  // vm.vis = d3.select("#graph").append("svg").attr("width", 200).attr("height", 200);

  // vm.nodes = [
  //   {x: 10, y: 50},
  //   {x: 70, y: 10},
  //   {x: 140, y: 50}
  // ]

  // vm.vis.selectAll("circle.nodes")
  //  .data(vm.nodes)
  //  .enter()
  //  .append("svg:circle")
  //  .attr("cx", function(d) { return d.x; })
  //  .attr("cy", function(d) { return d.y; })
  //  .attr("r", "10px")
  //  .attr("fill", "black")


  $scope.awesomeThings = [
    'HTML5 Boilerplate',
    'AngularJS',
    'Karma'
  ];

});
