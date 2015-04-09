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
      vm.loading = true;
    $timeout(function(){
      GraphFactory.iterate();
      vm.draw();
    });
    $timeout(function(){
      vm.loading = false;
    },100);
  };

  vm.addNode = function(){
    GraphFactory.addNode();
    vm.createInput();
    GraphFactory.setPointsToSeed();
    vm.drawFourth();
  };

  vm.removeNode = function(){
    GraphFactory.removeNode();
    vm.createInput();
    GraphFactory.setPointsToSeed();
    vm.drawFourth();
  };

  vm.drawFourth = function(){
    GraphFactory.setPointsToSeed();
    GraphFactory.iterate();
    GraphFactory.iterate();
    GraphFactory.iterate();
    GraphFactory.iterate();
    vm.draw();
  };

  vm.createInput = function(){
    d3Service.d3().then(function(d3) {
      $('.input').remove();
      var margin = {top: 20, right: 20, bottom: 20, left: 20},
        width = 300 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

      function make_x_axis() {
        return d3.svg.axis()
          .scale(x)
          .orient("bottom")
          .ticks(20)
      }

      function make_y_axis() {
        return d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(20)
      }

      var x = d3.scale.linear().range([0, width]);

      var y = d3.scale.linear().range([height, 0]);

      var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

      var svg = d3.select('#inputArea').append('svg')
        .attr('class', 'input')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      x.domain([0, 20]);
      y.domain([0, 20]);

      var xInv = d3.scale.linear()
        .domain([0,width])
        .range([0, 20]);
      var yInv = d3.scale.linear()
        .domain([0,height])
        .range([0, 20]);

      function dragstart(d){

      };

      function drag (d,i){
        d.x += xInv(d3.event.dx);
        d.y -= yInv(d3.event.dy);
        d.x = Math.max(0, d.x);
        d.x = Math.min(d.x, 20);

        d.y = Math.max(0,d.y);
        d.y = Math.min(d.y, 20);

        d3.select(this).attr("cx", x(d.x));
        d3.select(this).attr("cy", y(d.y));
        d3.selectAll('.input path').remove();
        drawPath();
        vm.drawFourth();
      };

      function dragend(d){
        d.x = Math.round(d.x);
        d.y = Math.round(d.y);
        d3.selectAll('circle').remove();
        d3.selectAll('path').remove();
        drawPath();
        drawNodes();
        vm.drawFourth();
      };

      function drawGrid(){
        svg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + height + ")")
          .call(make_x_axis()
            .tickSize(-height, 0, 0)
            .tickFormat("")
          );

        svg.append("g")
          .attr("class", "grid")
          .call(make_y_axis()
            .tickSize(-width, 0, 0)
            .tickFormat("")
          );
      }

      function drawPath(){
        var path = svg.append('path')
          .datum(vm.seed)
          .attr('class', 'line')
          .attr('d', line)
          .style('stroke-width', 2)
          .attr('stroke', 'steelblue');
      }

      function drawNodes(){
        svg.selectAll("circle.line")
          .data(vm.seed)
          .enter().append("circle")
          .attr("class", "circle")
          .attr("cx", function(d) { return x(d.x); })
          .attr("cy", function(d) { return y(d.y); })
          .attr("r", 6)
          .attr("fill", "black");

        d3.selectAll('.circle').call(d3.behavior.drag().on('dragstart', dragstart).on('drag', drag).on('dragend',dragend));
      }

      drawGrid();
      drawPath();
      drawNodes();

    });
  };

  vm.draw = function(){
    d3Service.d3().then(function(d3) {
      $('.replacementGraph').remove();
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

      var xMin = d3.min(vm.points, function(d) { return d.x; });
      var yMin = d3.min(vm.points, function(d) { return d.y; });
      var xMax = d3.max(vm.points, function(d) { return d.x; });
      var yMax = d3.max(vm.points, function(d) { return d.y; });
      var xRange = xMax - xMin;
      var yRange = yMax - yMin;
      var range = Math.max(xRange, yRange);

      x.domain([xMin, xMin + range]);
      y.domain([yMin, yMin + range]);

      var path = svg.append('path')
        .datum(vm.points)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke-width', 2)
        .attr('stroke', 'steelblue');

      var seedPath = svg.append('path')
        .datum(vm.seed)
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke-width', 0.3)
        .attr('stroke', 'red');

      d3.select('.replacementGraph').call(d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoom));

      d3.select('.replacementGraph').call(d3.behavior.drag());

      function zoom() {
        svg.attr("transform", "translate(" + margin.left + ',' + margin.top + ")translate("+d3.event.translate+")scale(" + d3.event.scale + ")");
        path.style('stroke-width', 2 / d3.event.scale);
        seedPath.style('stroke-width', 0.3 / d3.event.scale);
      }
    });
  };
  vm.init = function(){
    if ($('svg').length === 0){
      vm.createInput();
      vm.drawFourth();
    }

  };

  vm.init();
}
