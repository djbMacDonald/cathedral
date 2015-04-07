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
      var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      var x = d3.scale.linear().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      d3.select('body').selectAll('svg').remove();

      var svg = d3.select('#graph').append('svg')
       .attr('width', width + margin.left + margin.right)
       .attr('height', height + margin.top + margin.bottom)
       .append('g')
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

          svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

    });
  };
}
