'use strict';
angular.module('MainDirective').directive('replacementGraph', ['d3Service', replacementGraph]);



function replacementGraph (d3Service){
  return {
    restrict: 'EA',
    templateUrl: 'views/partials/replacement.html',
    controller: 'MainCtrl',
    controllerAs: 'main',
    bindToController: true,
    scope: {
      main: '@'
    },
    link: function(scope, element, attrs) {
      d3Service.d3().then(function(d3) {
        var points = scope.main.points;
        var margin = {top: 20, right: 20, bottom: 20, left: 20},
          width = 300 - margin.left - margin.right,
          height = 300 - margin.top - margin.bottom;

        var x = d3.scale.linear().range([0, width]);

        var y = d3.scale.linear().range([height, 0]);

        var line = d3.svg.line()
          .x(function(d) { return x(d.x); })
          .y(function(d) { return y(d.y); });

        var svg = d3.select(element[0]).append('svg')
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)
         .append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        points.forEach(function(d) {
          d.x = d.x;
          d.y = +d.y;
        });

        x.domain(d3.extent(points, function(d) { return d.x; }));
        y.domain(d3.extent(points, function(d) { return d.y; }));

        svg.append('path')
          .datum(points)
          .attr('class', 'line')
          .attr('d', line);
        console.log(scope.main.points);
      });
    }
  };
}
