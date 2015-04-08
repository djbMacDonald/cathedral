'use strict';

/**
 * @ngdoc function
 * @name fractalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fractalApp
 */
angular.module('fractalApp').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['GraphFactory', 'd3Service'];

function MainCtrl(GraphFactory, d3Service) {

  var vm = this;

  vm.things = ['1', '2', '3'];

  vm.points = GraphFactory.points;
  vm.doStuff = function(){
    GraphFactory.iterate();
    vm.draw();
  };

  vm.draw = function(){
    d3Service.d3().then(function(d3) {
      var points = vm.points;
      var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      d3.select('body').selectAll('svg').remove();

      var svg = d3.select('#graph').append('svg')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom)
       .append('g').attr('class', 'something')
       .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      points.forEach(function(d) {
        d.x = d.x;
        d.y = +d.y;
      });

      var xMin = d3.min(points, function(d) { return d.x; });
      var yMin = d3.min(points, function(d) { return d.y; });
      var xMax = d3.max(points, function(d) { return d.x; });
      var yMax = d3.max(points, function(d) { return d.y; });
      x.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);
      y.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);

      svg.append('path')
        .datum(points)
        .attr('class', 'line')
        .attr('d', line);

      d3.select('svg').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));

      d3.select('svg').call(d3.behavior.drag());

      function zoom() {
        console.log('zoom');
        svg.attr("transform", "translate(" + margin.left + ',' + margin.top + ")translate("+d3.event.translate+")scale(" + d3.event.scale + ")");
      }
    });
  };

  vm.draw();
}
