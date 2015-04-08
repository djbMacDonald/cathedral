'use strict';

/**
 * @ngdoc function
 * @name fractalApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fractalApp
 */
angular.module('fractalApp').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['GraphFactory', 'd3Service', '$timeout'];

function MainCtrl(GraphFactory, d3Service, $timeout) {

  var vm = this;

  vm.points = GraphFactory.points;
  vm.seed = GraphFactory.seed;

  vm.doStuff = function(){
    console.log('start');
      vm.loading = true;
    $timeout(function(){
      GraphFactory.iterate();
    vm.draw();
    });
    $timeout(function(){
      vm.loading = false;
    },100);
  };
  vm.createInput = function(){
    d3Service.d3().then(function(d3) {
      $('.input').remove();
      var nodes = vm.seed;
      var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      var svg = d3.select('#graph').append('svg')
        .attr('class', 'input')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var xMin = d3.min(nodes, function(d) { return d.x; });
      var yMin = d3.min(nodes, function(d) { return d.y; });
      var xMax = d3.max(nodes, function(d) { return d.x; });
      var yMax = d3.max(nodes, function(d) { return d.y; });
      x.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);
      y.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);

      var path = svg.append('path')
        .datum(nodes)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke-width', 2);

      svg.selectAll("circle.line")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "circle")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", 6)
        .attr("fill", "black");

      d3.selectAll('.circle').call(d3.behavior.drag().on('drag', drag))

      function drag (d,i){
        // console.log(d3.select('.circle'));
        console.log(d3.select(this));
        // console.log(d.x)
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr("transform", "translate(" + d.x + ',' + d.y + ")");
      };
    });
  };


  vm.draw = function(){
    d3Service.d3().then(function(d3) {
      $('.replacementGraph').remove();
      var points = vm.points;
      var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 500 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

      var x = d3.scale.linear().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      var svg = d3.select('#graph').append('svg')
        .attr('class', 'replacementGraph')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      var xMin = d3.min(points, function(d) { return d.x; });
      var yMin = d3.min(points, function(d) { return d.y; });
      var xMax = d3.max(points, function(d) { return d.x; });
      var yMax = d3.max(points, function(d) { return d.y; });
      x.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);
      y.domain([_.min([xMin, yMin]), _.max([xMax,yMax])]);

      var path = svg.append('path')
        .datum(points)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke-width', 2);

      d3.select('.replacementGraph').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));

      d3.select('.replacementGraph').call(d3.behavior.drag());

      function zoom() {
        svg.attr("transform", "translate(" + margin.left + ',' + margin.top + ")translate("+d3.event.translate+")scale(" + d3.event.scale + ")");
        path.style('stroke-width', 2 / d3.event.scale);
      }
    });
  };

  vm.createInput();
  vm.draw();
}
